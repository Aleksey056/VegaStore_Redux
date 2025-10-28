import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice';

const rootReducer = combineReducers({
	ProductSlice,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,

	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
