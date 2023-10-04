import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarDetailsModel } from '../../models/models';

interface Initiol{
    carData: null| CarDetailsModel,
    success: boolean
}
const INITIAL_STATE : Initiol= {
  carData : null,
  success: false,
};

const ownerCar = createSlice({
  name: 'addCar',
  initialState: INITIAL_STATE,
  reducers: {
    addCar: (state, action: PayloadAction<CarDetailsModel>) => {
      state.carData = action.payload;
      state.success = true;
    },
    clearCarData: (state) => {
        state.carData = null;
        state.success = false;
    },
  },
});

export const { addCar } = ownerCar.actions;
export default ownerCar.reducer;
