// redux/bikeShopSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching bikes (replace with your actual API call)
export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
    const mockData = [
        { id: '1', name: 'Pinarello', price: 1800, image: require('../assets/images/bike-1.png'), category: 'Mountain' },
        { id: '2', name: 'Pina Mountai', price: 1700, image: require('../assets/images/bike-2.png'), category: 'Mountain' },
        { id: '3', name: 'Pina Bike', price: 1500, image: require('../assets/images/bike-3.png'), category: 'Roadbike' },
        { id: '4', name: 'Pinarello', price: 1900, image: require('../assets/images/bike-4.png'), category: 'Roadbike' },
        { id: '5', name: 'Pinarello', price: 2700, image: require('../assets/images/bike-3.png'), category: 'Mountain' },
        { id: '6', name: 'Pinarello', price: 1350, image: require('../assets/images/bike-2.png'), category: 'Mountain' },
    ];
    return mockData; // Return your data from the API
});


const bikeShopSlice = createSlice({
    name: 'bikes',
    initialState: {
        bikes: [],
        loading: false,
        error: null,
        selectedCategory: 'All', // Add selectedCategory to the state
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBikes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBikes.fulfilled, (state, action) => {
                state.loading = false;
                state.bikes = action.payload;
            })
            .addCase(fetchBikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { setSelectedCategory } = bikeShopSlice.actions;
export default bikeShopSlice.reducer;