import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingData } from '../../models/models';

interface BookingState {
  bookingData: BookingData | null;
  success: boolean;
}

const INITIAL_STATE: BookingState = {
  bookingData: null,
  success: false,
};

const bookingSlice = createSlice({
  name: 'bookingData',
  initialState: INITIAL_STATE,
  reducers: {
    setBookingData: (state, action: PayloadAction<BookingData>) => {
      state.bookingData = action.payload;
      state.success = true;
    },
    clearBooking: (state) => {
      state.bookingData = null;
      state.success = false;
    },
  },
});

export const { setBookingData, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
