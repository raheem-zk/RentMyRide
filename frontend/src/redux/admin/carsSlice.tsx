import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CarDetailsModel } from "../../models/models";

interface carsData {
  cars: CarDetailsModel[] | null;
  filterData: CarDetailsModel[] | null;
}

const INITIAL_STATE: carsData = {
  cars: null,
  filterData: null,
};

const carsListSlice = createSlice({
  name: 'carsList',
  initialState: INITIAL_STATE,
  reducers: {
    addAllCars: (state, action: PayloadAction<CarDetailsModel[]>) => {
      state.cars = action.payload;
      state.filterData = action.payload; 
    },
  },
});

export const { addAllCars } = carsListSlice.actions;
export default carsListSlice.reducer;
