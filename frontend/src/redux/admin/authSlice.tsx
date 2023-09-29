import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AdminState {
  admin: AdminData | null;
  success: boolean;
}

interface AdminData {
  email: string;
}

const INITIAL_STATE: AdminState = {
  admin: null,
  success: false,
};

const authSlice = createSlice({
  name: 'admin',
  initialState: INITIAL_STATE,
  reducers: {
    adminLoggedIn: (state, action: PayloadAction<AdminData>) => {
      state.admin = action.payload;
      state.success = true;
    },
    logout: (state) => {
      state.admin = null;
      state.success = false;
    },
  },
});

export const { adminLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
