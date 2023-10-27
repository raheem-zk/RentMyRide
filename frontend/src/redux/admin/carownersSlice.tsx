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
    addOwners: (state, action: PayloadAction<carOwner[]>) => {
      state.owner = action.payload;
      state.filterData = action.payload; 
    },
  },
});

export const { addOwners } = ownerListSlice.actions;
export default ownerListSlice.reducer;
