import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import Header from './components/Header/Header'
import Main from './components/Main/Main';
import { createContext, useState } from 'react';
import type { Product } from './types/Product';

export type ContextBasketType = {
	cart: Product[],
	setCart: React.Dispatch<React.SetStateAction<Product[]>>,
}

export const ContextBasket = createContext<ContextBasketType>({
	cart: [],
	setCart: () => { },
})

function App() {
	const [cart, setCart] = useState<Product[]>([]);

	return (
		<>
			<ContextBasket.Provider value={{ cart, setCart }}>
				<MantineProvider>
					<Header />
					<Main />
				</MantineProvider >
			</ContextBasket.Provider>
		</>
	)
}

export default App
