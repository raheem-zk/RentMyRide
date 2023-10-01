import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OwnerState {
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  email: string;
  password: string;
  pincode: string;
  license: string;
  place: string;
  address: string;
}

interface Initiol{
    ownerData: null| OwnerState,
    success: boolean
}
const INITIAL_STATE : Initiol= {
  ownerData : null,
  success: false,
};

const authSlice = createSlice({
  name: 'ownerSignup',
  initialState: INITIAL_STATE,
  reducers: {
    signupAdd: (state, action: PayloadAction<OwnerState>) => {
      state.ownerData = action.payload;
      state.success = true;
    },
    clearSignup: (state) => {
        state.ownerData = null;
    },
  },
});

export const { signupAdd, clearSignup } = authSlice.actions;
export default authSlice.reducer;
