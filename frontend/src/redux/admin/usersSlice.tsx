import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../models/models";

interface UsersData {
  users: UserData[] | null;
  filterData: UserData[] | null;
}

const INITIAL_STATE: UsersData = {
  users: null,
  filterData: null,
};

const userListSlice = createSlice({
  name: 'userList',
  initialState: INITIAL_STATE,
  reducers: {
    addUsers: (state, action: PayloadAction<UserData[]>) => {
      state.users = action.payload;
      state.filterData = action.payload;
    },
  },
});

export const { addUsers } = userListSlice.actions;
export default userListSlice.reducer;
