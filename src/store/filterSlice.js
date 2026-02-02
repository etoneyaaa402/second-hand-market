import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null,
  searchQuery: '',
  sortOrder: 'asc',
  options: {
    Rating: ['1', '2', '3', '4', '5'],
    Weight: ['2', '4', '7', '9', '12', '15', '18'],
    Brand: ['Apple', 'Samsung', 'Essence', 'Fashion Fun', 'Kawasaki'],
    Condition: ['New', 'Used', 'Refurbished']
  },
  activeFilters: []
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.activeFilters = [];
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    addFilter: (state, action) => {
      const { type, label } = action.payload;
      const exists = state.activeFilters.find(f => f.label === label);
      if (!exists) {
        state.activeFilters.push({
          id: Date.now(),
          type,
          label
        });
      }
    },
    removeFilter: (state, action) => {
      state.activeFilters = state.activeFilters.filter(f => f.id !== action.payload);
    },
    setSearchQuery: (state,action)=>{
        state.searchQuery = action.payload;
        if (action.payload) {
            state.selectedCategory = null;
        }
    },
  },
});

export const { setCategory, setSortOrder, addFilter, removeFilter, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;