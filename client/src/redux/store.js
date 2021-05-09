import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/rootSlice';

// redux based store configuration
export const store = configureStore({
    reducer: {
      root: rootReducer
    }
});
