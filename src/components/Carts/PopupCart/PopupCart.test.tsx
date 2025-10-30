import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { Product } from '../../../types/Product';
import { MantineProvider } from '@mantine/core';
import PopupCard from './PopupCart';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from '../../../store/ProductSlice';

describe('PopupCard', () => {
	const mockCard: Product[] = [{
		id: '1',
		name: 'cucumber',
		price: 80,
		image: 'test.jpg',
		category: 'Category',
	},
	{
		id: '21',
		name: 'potato',
		price: 10,
		image: 'test2.jpg',
		category: 'Category',
	}]

	const createStoreWithState = () => configureStore({
		reducer: { catalog: ProductSlice },
		preloadedState: {
			catalog: {
				catalog: [],
				loading: false,
				error: '',
				cart: mockCard.map(product => ({ ...product, quantity: 1 }))
			}
		}
	});

	const renderPopupCard = (visible = true) => {
		const store = createStoreWithState();
		return render(
			<MantineProvider>
				<Provider store={store}>
					<PopupCard visible={visible} />
				</Provider>
			</MantineProvider >
		)
	}

	it('Проверка что рендерится popup с товарами', async () => {
		renderPopupCard()
		const popupProduct = screen.getByTestId('popup-drop-product')
		expect(within(popupProduct).getByText('potato'))
		expect(within(popupProduct).getByText('cucumber'))
	})

	it('Изменение количества товара через Stepper', async () => {
		const store = configureStore({
			reducer: { catalog: ProductSlice },
			preloadedState: {
				catalog: {
					catalog: [],
					loading: false,
					error: '',
					cart: mockCard.map(product => ({ ...product, quantity: 3 }))
				},
			},
		});

		render(
			<MantineProvider>
				<Provider store={store}>
					<PopupCard visible={true} />
				</Provider>
			</MantineProvider>
		);
		const potatoCard = screen.getByText('potato').closest('[class*="card"]') as HTMLElement | null;
		if (!potatoCard) throw new Error('Potato card not found');
		const valueElement = within(potatoCard).getByTestId('stepper-value');
		expect(valueElement).toHaveTextContent('3');
		const valuePlus = within(potatoCard).getByTestId('stepper-image-plus');
		await userEvent.click(valuePlus);
		const valueElementNew = within(potatoCard).getByTestId('stepper-value');
		expect(valueElementNew).toHaveTextContent('4');
	})

	it('Удаление продукта при value < 0', async () => {
		const store = configureStore({
      reducer: { catalog: ProductSlice },
      preloadedState: {
         catalog: {
            catalog: [],
            loading: false,
            error: '',
            cart: mockCard.map(product => ({ ...product, quantity: 1 })),
         },
      },
   });

   render(
      <MantineProvider>
         <Provider store={store}>
            <PopupCard visible={true} />
         </Provider>
      </MantineProvider>
   );

   const popupProduct = screen.getByTestId('popup-drop-product');
   expect(within(popupProduct).getByText('potato')).toBeInTheDocument();
   expect(within(popupProduct).getByText('cucumber')).toBeInTheDocument();
   const cucumberCard = screen.getByText('cucumber').closest('[class*="card"]') as HTMLElement | null;
   if (!cucumberCard) throw new Error('Cucumber card not found');
   const valueElement = within(cucumberCard).getByTestId('stepper-value');
   expect(valueElement).toHaveTextContent('1');
   const valueMinus = within(cucumberCard).getByTestId('stepper-image-minus');
   await userEvent.click(valueMinus);
   expect(screen.getByTestId('popup-drop-product')).toBeInTheDocument();
   expect(within(screen.getByTestId('popup-drop-product')).getByText('potato')).toBeInTheDocument();
   expect(within(screen.getByTestId('popup-drop-product')).queryByText('cucumber')).toBeNull();
})
})