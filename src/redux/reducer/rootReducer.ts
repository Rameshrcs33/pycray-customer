// store.js
import { combineReducers } from '@reduxjs/toolkit';
import bookingReducer from '../slice/bookingReducer';
import userReducer from '../slice/userReducer';

export const rootReducer = combineReducers({
  booking: bookingReducer,
  user: userReducer,
});
