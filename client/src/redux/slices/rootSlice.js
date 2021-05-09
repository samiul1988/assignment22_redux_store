import { createSlice } from '@reduxjs/toolkit';

// initial values of the state
const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
};

// create reducer with actions
export const rootSlice = createSlice({
    name: 'root',
    initialState,
    // define reducers and associated actions
    reducers: {
        // action: to update product list in redux global state
        updateProducts: (state, action) => {
            state.products = [...action.payload];
        },
        // action: to add a product to the cart list in redux global state
        addToCart: (state, action) => {
            state.cartOpen = true;
            state.cart = [...state.cart, action.payload];
        },
        // action: to add multiple products to the cart list in redux global state
        addMultipleToCart: (state, action) => {
            state.cart = [...state.cart, ...action.payload];
        },
        // action: to update quantity of a product in the cart list in redux global state
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
        // action: to remove a product from the cart list in redux global state
        removeFromCart: (state, action) => {
            let newState = state.cart.filter(product => {
                return product._id !== action.payload;
            });

            state.cartOpen = newState.length > 0;
            state.cart = newState;
        },
        // action: to remove all products from the cart list in redux global state
        clearCart: (state) => {
            state.cartOpen = false;
            state.cart = [];
        },
        // action: to toggle state of cartOpen in redux global state
        toggleCart: (state) => {
            state.cartOpen = !state.cartOpen;
        },
        // action: to update category list in redux global state
        updateCategories: (state, action) => {
            state.categories = [...action.payload];
        },
        // action: to update currentCategory in redux global state
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
