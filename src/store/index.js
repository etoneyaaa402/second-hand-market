import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import filterReducer from './filterSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        filters: filterReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
});