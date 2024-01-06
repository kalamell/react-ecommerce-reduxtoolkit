import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { logger } from 'redux-logger';
import productsSlice from './store/productsSlice';
import cartSlice from './store/cartSlice';

const rootReducer = combineReducers({
    cart: cartSlice,
    products: productsSlice,
});

const middleware = (getDefaultMiddleware) => getDefaultMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: 'development'
});

export const useAppdispatch = () => useDispatch();

export default store;