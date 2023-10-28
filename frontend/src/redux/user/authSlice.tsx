import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userInittalModel, userModel } from "../../models/models";

const INITTAL_STATE: userInittalModel = {
  user: null,
  success: false,
};

const authSlice = createSlice({
  name: "user",
  initialState: INITTAL_STATE,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<userModel>) => {
      state.user = action.payload;
      state.success = true;
    },
    updateData: (state, action: PayloadAction<userModel>) => {
      const copyOfUserData = { ...state.user, ...action.payload };
      state.user = copyOfUserData;
    },
    setProfile: (state, action: any) => {
      const data = { ...state.user, ...action.payload };
      state.user = data;
    },
    logout: (state) => {
      state.user = null;
      state.success = false;
    },
  },
});

export const { userLoggedIn, updateData, logout, setProfile } =
  authSlice.actions;
export default authSlice.reducer;
