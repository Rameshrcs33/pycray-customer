import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../helper/Apiservices';

export const getUser = createAsyncThunk(
  'api/users/getuserlist',
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await fetch(URL.getuser(payload));
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateFcmToken = createAsyncThunk(
  'api/users/fcmtoken',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await fetch(URL.updateuser(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('User updation failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: any = {
  userList: [],
  error: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateFcmToken.pending, state => {
        state.error = null;
      })
      .addCase(updateFcmToken.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(updateFcmToken.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userReducer.reducer;
