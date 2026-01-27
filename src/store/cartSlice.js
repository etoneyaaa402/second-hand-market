import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state,action)=>{
            const productId = action.payload;
            if (!state.items.includes(productId)) {
                state.items.push(productId);
            }
        },
        removeFromCart: (state,action)=>{
            state.items = state.items.filter(id => id !== action.payload);
        }
    },
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;