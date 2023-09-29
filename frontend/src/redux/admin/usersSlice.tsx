import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UsersProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  place: string | null;
  age: number;
  address: string | null;
  license: string | null;
  profilePicture: string | null;
  gender: string | null;
  status: boolean;
  createdAt: Date;
}

interface UsersData {
  users: UsersProps[] | null;
  filterData: UsersProps[] | null;
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
