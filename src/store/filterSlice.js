import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        selectedCategory: null,
    },
    reducers: {
        setCategory: (state,action)=>{
            state.selectedCategory = action.payload;
        },
        clearFilters: (state)=> {
            state.selectedCategory = null;
        },
    },
});

export const { setCategory, clearFilters} = filterSlice.actions;
export default filterSlice.reducer;