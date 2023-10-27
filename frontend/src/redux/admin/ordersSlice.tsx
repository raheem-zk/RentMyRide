import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  orders: [] | null;
  success: boolean;
}

const INITIAL_STATE: InitialState = {
  orders: null,
  success: false,
};

const ordersList = createSlice({
  name: 'orders',
  initialState: INITIAL_STATE,
  reducers: {
    addOrders: (state, action) => {
      state.orders = action.payload;
      state.success = true;
    },
    clearOrders: (state) => {
      state.orders = null;
      state.success = false;
    },
  },
});

export const { addOrders, clearOrders } = ordersList.actions;
export default ordersList.reducer; 
