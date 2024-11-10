import { configureStore } from '@reduxjs/toolkit';
import bikesReducer from './bikesSlice';

export const store = configureStore({
    reducer: {
        bikes: bikesReducer,
    },
});