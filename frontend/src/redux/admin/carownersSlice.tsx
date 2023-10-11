import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { carOwner } from "../../models/models";

interface OwnerData {
  owner: carOwner[] | null;
  filterData: carOwner[] | null;
}

const INITIAL_STATE: OwnerData = {
  owner: null,
  filterData: null,
};

const ownerListSlice = createSlice({
  name: "ownerList",
  initialState: INITIAL_STATE,
  reducers: {
    addowners: (state, action: PayloadAction<OwnerData>) => {
      state.owner = action.payload.owner;
      state.filterData = action.payload.filterData;
    },
  },
});

export const { addowners } = ownerListSlice.actions;
export default ownerListSlice.reducer;
