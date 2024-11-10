import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://67302aa666e42ceaf15f8e1a.mockapi.io/api/bikes';

// Async thunk for fetching bikes
export const fetchBikes = createAsyncThunk(
    'bikes/fetchBikes',
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

// Async thunk for adding a new bike
export const addBike = createAsyncThunk(
    'bikes/addBike',
    async (bikeData) => {
        const response = await axios.post(API_URL, bikeData);
        return response.data;
    }
);

const bikesSlice = createSlice({
    name: 'bikes',
    initialState: {
        items: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
        selectedCategory: 'All'
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBikes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBikes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchBikes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addBike.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    }
});

export const { setSelectedCategory } = bikesSlice.actions;
export default bikesSlice.reducer;