import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Product } from '../types/Product'
export type CartItem = Product & { quantity: number }

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
			if (!response.ok) {
				throw new Error('Server Error!')
			}
			const products = response.json()
			return products
		}
		catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

type ProductStateType = {
	catalog: Product[];
	loading: boolean;
	error: string;
	cart: CartItem[]
}

const initialState: ProductStateType = {
	catalog: [],
	loading: false,
	error: '',
	cart: []
}

export const ProductSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		addToCart() { },
		removeFromCart() { },
	},
	extraReducers: (builders) => {
		builders
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true
				state.error = ''
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false
				state.catalog = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string;
			})
	},
})

export const { addToCart, removeFromCart } = ProductSlice.actions;
export default ProductSlice.reducer;