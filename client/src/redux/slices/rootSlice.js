import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  // define reducers and associated actions
  reducers: {
    updateProducts: (state, action) => {
      state.products = [...action.payload];
    },
    addToCart: (state, action) => {
        state.cartOpen = true;
        state.cart = [...state.cart, action.payload];
    },
    addMultipleToCart: (state, action) => {
        state.cart = [...state.cart, ...action.payload];
    },
    updateCartQuantity: (state, action) => {
        const { _id, purchaseQuantity } = action.payload;
        state.cartOpen = true;
        let newState = state.cart.map(product => {
            if (_id === product._id) {
              product.purchaseQuantity = purchaseQuantity;
            }
            return product;
        });
        state.cart = newState;
    },
    removeFromCart: (state, action) => {
        let newState = state.cart.filter(product => {
            return product._id !== action.payload;
        });
        
        state.cartOpen = newState.length > 0;
        state.cart = newState;
    },
    clearCart: (state) => {
        state.cartOpen = false;
        state.cart = [];
    },
    toggleCart: (state) => {
        state.cartOpen = !state.cartOpen;
    },
    updateCategories: (state, action) => {
        state.categories = [...action.payload];
    },
    updateCurrentCategory: (state, action) => {
        state.currentCategory = action.payload;
    }
  }
});

// export actions
export const { 
    updateProducts, 
    addToCart, 
    addMultipleToCart, 
    updateCartQuantity, 
    removeFromCart,
    clearCart, 
    toggleCart, 
    updateCategories, 
    updateCurrentCategory 
} = rootSlice.actions;

// export selectors
export const selectProducts = (state) => state.root.products;
export const selectCart = (state) => state.root.cart;
export const selectCartOpen = (state) => state.root.cartOpen;
export const selectCategories = (state) => state.root.categories;
export const selectCurrentCategory = (state) => state.root.currentCategory;

// export reducer
export default rootSlice.reducer;
