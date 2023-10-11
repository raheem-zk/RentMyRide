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
    addUsers: (state, action: PayloadAction<UsersData>) => {
      state.users = action.payload.users;
      state.filterData = action.payload.filterData;
    },
  },
});

export const { addUsers } = userListSlice.actions;
export default userListSlice.reducer;
