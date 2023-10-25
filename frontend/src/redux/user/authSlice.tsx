import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { profileEditModal } from "../../models/models";

interface UserState {
  user: UserData | null;
  success: boolean;
}

interface UserData {
  firstName: string;
  lastName: string;
  age: number | undefined;
  phoneNumber: number | undefined;
  email: string;
}
const INITTAL_STATE: UserState = {
  user: null,
  success: false,
};
const authSlice = createSlice({
  name: "user",
  initialState: INITTAL_STATE,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.success = true;
    },
    updateData: (state, action: PayloadAction<profileEditModal>) => {
      const copyOfUserData = { ...state.user, ...action.payload };
      state.user = copyOfUserData;
    },
    logout: (state) => {
      state.user = null;
      state.success = false;
    },
  },
});

export const { userLoggedIn, updateData, logout } = authSlice.actions;
export default authSlice.reducer;