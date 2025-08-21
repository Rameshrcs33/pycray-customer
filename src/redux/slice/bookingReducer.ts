// features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../helper/Apiservices';

export const bookRide = createAsyncThunk(
  'booking/bookRide',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(URL.bookRide(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Ride booking failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getRide = createAsyncThunk(
  'booking/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(URL.getbooking());
      if (!response.ok) {
        throw new Error('Ride not found');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: any = {
  bookingList: [],
  loading: false,
  error: null,
};

const bookingReducer = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(bookRide.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookRide.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingList = [];
      })
      .addCase(bookRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRide.pending, state => {
        state.error = null;
      })
      .addCase(getRide.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingList = action.payload;
      })
      .addCase(getRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingReducer.reducer;
