// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import bikeShopReducer from './bikeShopSlice'; // Create this slice

export const store = configureStore({
  reducer: {
    bikes: bikeShopReducer, // Use your bikeShopReducer here
  },
});