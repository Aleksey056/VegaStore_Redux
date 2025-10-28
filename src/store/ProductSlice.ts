import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Product } from '../types/Product'
export type CartItem = Product & { quantity: number }

type ProductStateType = {
	productList: Product[];
	isLoading: boolean;
	error: string;
	cart: CartItem[]
}

const initialState: ProductStateType = {
	productList: [],
	isLoading: false,
	error: '',
	cart: []
}

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async function () {
		const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
		const products = response.json()
		return products
	}
)

export const ProductSlice = createSlice({
	name: 'productsList',
	initialState,
	reducers: {
	},
	// extraReducers: {
	// 	[fetchProducts.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.error = null;
	// 	},
	// 	[fetchProducts.fulfilled]: (state, action) => {
	// 		state.status = 'resolved';
	// 		state.products = action.payload;
	// 	},
	// 	[fetchProducts.rejected]: (state, action) => { },
	// }
})

export const { addToCart, removeFromCart } = ProductSlice.actions;
export default ProductSlice.reducer;