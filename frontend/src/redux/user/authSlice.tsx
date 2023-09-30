import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
const INITTAL_STATE :UserState  = {
    user: null ,
    success: false,
}
const authSlice = createSlice({
    name:'user',
    initialState:INITTAL_STATE,
    reducers:{
        userLoggedIn:(state, action : PayloadAction <UserData>)=>{
            state.user = action.payload;
            state.success = true;
        },
        logout:(state)=>{
            state.user = null
            state.success = false;
        }
    }
})

export const { userLoggedIn , logout} = authSlice.actions;
export default authSlice.reducer;