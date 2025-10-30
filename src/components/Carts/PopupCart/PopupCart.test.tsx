import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Product } from '../../../types/Product';
import { MantineProvider } from '@mantine/core';
import PopupCard from './PopupCart';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from '../../../store/ProductSlice';

const mockCart: Product[] = [
	{ id: '1', name: 'cucumber', price: 80, image: 'test.jpg', category: 'Category' },
	{ id: '21', name: 'potato', price: 10, image: 'test2.jpg', category: 'Category' },
];

const createStore = (cartItems = mockCart.map(p => ({ ...p, quantity: 1 }))) =>
	configureStore({
		reducer: { catalog: ProductSlice },
		preloadedState: {
			catalog: {
				catalog: [],
				loading: false,
				error: '',
				cart: cartItems,
			},
		},
	});

const renderPopupCard = (cartItems?: Array<Product & { quantity: number }>, visible = true) => {
	const store = cartItems ? createStore(cartItems) : createStore();
	return render(
		<MantineProvider>
			<Provider store={store}>
				<PopupCard visible={visible} />
			</Provider>
		</MantineProvider>
	);
};

beforeEach(() => {
	vi.clearAllMocks();
});

describe('PopupCard', () => {
	it('отображает товары в popup', () => {
		renderPopupCard();
		const popup = screen.getByTestId('popup-drop-product');
		expect(within(popup).getByText('potato')).toBeInTheDocument();
		expect(within(popup).getByText('cucumber')).toBeInTheDocument();
	});

	it('увеличивает количество товара через Stepper', async () => {
		renderPopupCard(mockCart.map(p => ({ ...p, quantity: 3 })));
		const potatoCard = screen.getByText('potato').closest('[class*="card"]') as HTMLElement | null;
		if (!potatoCard) throw new Error('Карточка "potato" не найдена');
		const valueElement = within(potatoCard).getByTestId('stepper-value');
		expect(valueElement).toHaveTextContent('3');
		const plusButton = within(potatoCard).getByTestId('stepper-image-plus');
		await userEvent.click(plusButton);
		expect(within(potatoCard).getByTestId('stepper-value')).toHaveTextContent('4');
	});

	it('удаляет товар при уменьшении количества < 1', async () => {
		renderPopupCard();
		const popup = screen.getByTestId('popup-drop-product');
		expect(within(popup).getByText('potato')).toBeInTheDocument();
		expect(within(popup).getByText('cucumber')).toBeInTheDocument();
		const cucumberCard = screen.getByText('cucumber').closest('[class*="card"]') as HTMLElement | null;
		if (!cucumberCard) throw new Error('Карточка "cucumber" не найдена');
		const minusButton = within(cucumberCard).getByTestId('stepper-image-minus');
		await userEvent.click(minusButton);
		expect(screen.getByTestId('popup-drop-product')).toBeInTheDocument();
		expect(within(screen.getByTestId('popup-drop-product')).getByText('potato')).toBeInTheDocument();
		expect(within(screen.getByTestId('popup-drop-product')).queryByText('cucumber')).toBeNull();
	});
});