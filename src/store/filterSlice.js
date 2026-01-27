import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null,
  sortOrder: 'asc',
  options: {
    Color: ['White', 'Dark', 'Red', 'Blue'],
    Size: ['XS', 'S', 'M', 'L', 'XL', '36', '36,5'],
    Brand: ['Apple', 'Samsung', 'Esprit', 'Wrangler', 'Columbia'],
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
    }
  },
});

export const { setCategory, setSortOrder, addFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;