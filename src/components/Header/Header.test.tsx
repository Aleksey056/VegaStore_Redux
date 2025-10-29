import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
// import { ContextBasket } from '../../App';
import Header from './Header';
import userEvent from '@testing-library/user-event'

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => { },
			removeListener: () => { },
			addEventListener: () => { },
			removeEventListener: () => { },
			dispatchEvent: () => false,
		}),
	});
});

beforeEach(() => {
	vi.clearAllMocks();
});

describe('Header', () => {
	it('Проверка рендерится ли header и кнопка card', () => {
		render(
			<>
				<MantineProvider>
					<ContextBasket.Provider value={{ cart: [], setCart: vi.fn() }}>
						<Header />
					</ContextBasket.Provider>
				</MantineProvider >
			</>
		)
		expect(screen.getByText('SHOP')).toBeDefined();
		expect(screen.getByText('Cart')).toBeDefined();
	})

	it('Проверка открытия popup при клике по кнопке "Cart" и его закрытие так же по кнопке' , async () => {
		render(
			<>
				<MantineProvider>
					<ContextBasket.Provider value={{ cart: [], setCart: vi.fn() }}>
						<Header />
					</ContextBasket.Provider>
				</MantineProvider >
			</>
		)
		const buttonCart = screen.getByTestId('buttonCart')
		expect(buttonCart).toBeInTheDocument()
		await userEvent.click(buttonCart)
		
		// await screen.findByTestId('popover-drop'); потому что его трубу шатал этого поповера 3 дня потратил на него блять, так и не смог его отрендерить...........

		expect(screen.getByText(/You cart is empty/i)).toBeInTheDocument()
		expect(screen.getByTestId('popup-drop-is-empty')).toBeInTheDocument();

		await userEvent.click(buttonCart)

		expect(screen.queryByText(/You cart is empty/i)).not.toBeInTheDocument()
	})
})