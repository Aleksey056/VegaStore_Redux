import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { ContextBasket } from '../../App';
import ProductCard from './ProductCart';
import type { Product } from '../../types/Product';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event'
import Header from '../Header/Header';
import React, { useState } from 'react';

beforeEach(() => {
	vi.clearAllMocks();
});

const setCart = vi.fn();

describe('ProductCard', () => {
	const product: Product = {
		id: '1',
		name: 'potato',
		price: 100,
		image: 'test.jpg',
		category: 'Category',
		value: 1,
	};

	it('Проверка рендерится ли компонент', () => {
		render(
			<MantineProvider>
				{/* <ContextBasket.Provider value={{ cart: [], setCart: () => { } }}> */}
					<ProductCard {...product} />
				{/* </ContextBasket.Provider> */}
			</MantineProvider>
		);
		expect(screen.getByText('potato')).toBeDefined();
		expect(screen.getByText('$ 100')).toBeDefined();
		const stepper = screen.getByTestId('stepper')
		expect(within(stepper).getByText('1'))
	});

	it('изменение количества при использовании степпера и стоимости', async () => {
		render(
			<MantineProvider>
				{/* <ContextBasket.Provider value={{ cart: [], setCart }}> */}
					<ProductCard {...product} />
				{/* </ContextBasket.Provider> */}
			</MantineProvider>
		);
		const stepper = screen.getByTestId('stepper')
		expect(within(stepper).getByText('1'))
		expect(screen.getByText('$ 100')).toBeDefined();
		const img = screen.getByTestId('stepper-image-plus');
		await userEvent.click(img)
		expect(within(stepper).getByText('2'))
		expect(screen.getByText('$ 200')).toBeDefined();
	});

	it('Добавление в корзину при нажатии на кнопку "add to cart"', async () => {
		const Wrapper = ({ children }: { children: React.ReactNode }) => {
			const [cart, setCart] = useState<Product[]>([]);
			return (
				<MantineProvider>
					{/* <ContextBasket.Provider value={{ cart, setCart }}> */}
						{children}
					{/* </ContextBasket.Provider> */}
				</MantineProvider>
			);
		};
		render(
			<Wrapper>
				<ProductCard {...product} />
				<Header></Header>
			</Wrapper>
		)
		const header = screen.getByTestId('header')
		const button = screen.getByRole('button', { name: /add to cart/i });
		await userEvent.click(button)
		expect(within(header).getByText('1'))
		await userEvent.click(button)
		expect(within(header).getByText('2'))
	})
});
