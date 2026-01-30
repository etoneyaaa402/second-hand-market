import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const wishlistSlice=createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
    },
    reducers: {
        toggleWishlist:(state,action)=>{
            const productId=action.payload;
            if (state.items.includes(productId)) {
                state.items = state.items.filter(id=>id!==productId);
            } else {
                state.items.push(productId);
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(id => id !== action.payload);
        },
    },
});

export const {toggleWishlist, removeFromWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;