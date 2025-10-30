import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { ContextBasket } from '../../App';
import type { Product } from '../../../types/Product';
import { MantineProvider } from '@mantine/core';
import PopupCard from './PopupCart';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

beforeEach(() => {
	vi.clearAllMocks();
});

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
	const renderPopupCard = (visible = true, cart = mockCard) => {
		return render(
			<MantineProvider>
				{/* <ContextBasket.Provider value={{ cart, setCart: () => { } }}>  */}
				<PopupCard visible={visible} />
				{/* </ContextBasket.Provider> */}
			</MantineProvider>
		)
	}

	it('Проверка что рендерится popup с товарами', async () => {
		renderPopupCard()
		const popupProduct = screen.getByTestId('popup-drop-product')
		expect(within(popupProduct).getByText('potato'))
		expect(within(popupProduct).getByText('cucumber'))
	})

	it('Изменение количества товара через Stepper', async () => {
		const Wrapper = () => {
			const [cart, setCart] = useState(mockCard)
			return (
				<MantineProvider>
					{/* <ContextBasket.Provider value={{ cart, setCart }}> */}
						<PopupCard visible={true} />
					{/* </ContextBasket.Provider> */}
				</MantineProvider>
			)
		}
		render(<Wrapper />)
		const potatoCard = screen.getByText('potato').closest('[class="card"]') as HTMLElement | null
		if (!potatoCard) {
			throw new Error('Potato card not found')
		}
		const valueElement = within(potatoCard).getByTestId('stepper-value')
		expect(valueElement).toHaveTextContent('3')
		const valuePlus = within(potatoCard).getByTestId('stepper-image-plus')
		await userEvent.click(valuePlus)
		const valueElementNew = within(potatoCard).getByTestId('stepper-value')
		expect(valueElementNew).toHaveTextContent('4')
		// screen.debug(valueElementNew, Infinity)
	})

	it('Удаление продукта при value < 0', async () => {
		const Wrapper = () => {
			const [cart, setCart] = useState(mockCard)
			return (
				<MantineProvider>
					{/* <ContextBasket.Provider value={{ cart, setCart }}> */}
						<PopupCard visible={true} />
					{/* </ContextBasket.Provider> */}
				</MantineProvider>
			)
		}
		render(<Wrapper />)
		const popupProduct = screen.getByTestId('popup-drop-product')
		expect(within(popupProduct).getByText('potato'))
		expect(within(popupProduct).getByText('cucumber'))
		const cucumberCard = screen.getByText('cucumber').closest('[class="card"]') as HTMLElement | null
		if (!cucumberCard) {
			throw new Error('Potato card not found')
		}
		const valueElement = within(cucumberCard).getByTestId('stepper-value')
		expect(valueElement).toHaveTextContent('1')
		const valueMinus = within(cucumberCard).getByTestId('stepper-image-minus')
		await userEvent.click(valueMinus)
		const popupProductNew = screen.getByTestId('popup-drop-product')
		expect(within(popupProductNew).getByText('potato'))
		expect(within(popupProduct).queryByText('cucumber')).toBeNull()
		// screen.debug(popupProduct, Infinity)
	})
})