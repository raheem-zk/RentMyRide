import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CarOwnerState {
    carOwner: UserData | null;
    success: boolean;
  }
  
  interface UserData {
    firstName: string;
    lastName: string;
    age: number | undefined;
    phoneNumber: number | undefined;
    email: string;
  }
const INITTAL_STATE :CarOwnerState  = {
    carOwner: null ,
    success: false,
}
const authSlice = createSlice({
    name:'carOwner',
    initialState:INITTAL_STATE,
    reducers:{
        SetCarOwner:(state, action : PayloadAction <UserData>)=>{
            state.carOwner = action.payload;
            state.success = true;
        },
        logout:(state)=>{
            state.carOwner = null
            state.success = false;
        }
    }
})

export const { SetCarOwner , logout} = authSlice.actions;
export default authSlice.reducer;