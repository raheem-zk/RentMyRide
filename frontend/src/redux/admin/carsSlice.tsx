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
    addcars: (state, action: PayloadAction<carsData>) => {
      state.cars = action.payload.cars;
      state.filterData = action.payload.filterData;
    },
  },
});

export const { addcars } = carsListSlice.actions;
export default carsListSlice.reducer;
