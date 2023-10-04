import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarOwnerSignupForm } from '../../models/models';

interface Initiol{
    ownerData: null| CarOwnerSignupForm,
    success: boolean
}
const INITIAL_STATE : Initiol= {
  ownerData : null,
  success: false,
};

const ownerSignup = createSlice({
  name: 'ownerSignup',
  initialState: INITIAL_STATE,
  reducers: {
    signupAdd: (state, action: PayloadAction<CarOwnerSignupForm>) => {
      state.ownerData = action.payload;
      state.success = true;
    },
    clearSignup: (state) => {
        state.ownerData = null;
        state.success = false;
    },
  },
});

export const { signupAdd, clearSignup } = ownerSignup.actions;
export default ownerSignup.reducer;
