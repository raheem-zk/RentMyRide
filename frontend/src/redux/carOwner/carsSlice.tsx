import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarDetailsModel } from '../../models/models';

interface InitialState {
  carsData: CarDetailsModel[] | CarDetailsModel | null;
  success: boolean;
}

const INITIAL_STATE: InitialState = {
  carsData: null,
  success: false,
};

const ownerCars = createSlice({
  name: 'ownerCars',
  initialState: INITIAL_STATE,
  reducers: {
    addOwnerCars: (state, action: PayloadAction<CarDetailsModel[]>) => {
      state.carsData = action.payload;
      state.success = true;
    },
    clearCarsData: (state) => {
      state.carsData = null;
      state.success = false;
    },
  },
});

export const { addOwnerCars, clearCarsData } = ownerCars.actions;
export default ownerCars.reducer; 
