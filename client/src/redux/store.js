import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/rootSlice';

export const store = configureStore({
    reducer: {
      root: rootReducer
    }
});
