import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  searchQuery: '',
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      // Filter products based on search query
      if (action.payload.trim() === '') {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(product =>
          product.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.description.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.category.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
  },
});

// Selectors
export const selectProducts = (state) => state.products.filteredProducts;
export const selectAllProducts = (state) => state.products.products;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export const { setProducts, setLoading, setError, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;