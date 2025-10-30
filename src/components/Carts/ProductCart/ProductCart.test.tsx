import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCard from './ProductCart';
import type { Product } from '../../../types/Product';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event'
import Header from '../../Header/Header';
import { setupStore } from '../../../store/store'
import { Provider } from 'react-redux'

beforeEach(() => {
	vi.clearAllMocks();
});

describe('ProductCard', () => {
	const product: Product = {
		id: '1',
		name: 'potato',
		price: 100,
		image: 'test.jpg',
		category: 'Category',
	};

	it('Проверка рендерится ли компонент', () => {
		render(
			<MantineProvider>
				<Provider store={setupStore()}>
					<ProductCard {...product} />
				</Provider>
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
				<Provider store={setupStore()}>
					<ProductCard {...product} />
				</Provider>
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
			return (
				<MantineProvider>
					<Provider store={setupStore()}>
						{children}
					</Provider>
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
		await userEvent.click(button)
		expect(within(header).getByText('3'))
	})
});
