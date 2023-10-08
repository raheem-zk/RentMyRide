import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface carsData {
  cars: any;
  success: boolean;
}

const INITIAL_STATE: carsData = {
  cars: null,
  success: false,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: INITIAL_STATE,
  reducers: {
    addCarsData: (state, action: PayloadAction<any>) => {
      state.cars = action.payload;
      state.success = true;
    },
    clearCarsData: (state) => {
      state.cars = null;
      state.success = false;
    },
  },
});

export const { addCarsData, clearCarsData } = carsSlice.actions;
export default carsSlice.reducer;