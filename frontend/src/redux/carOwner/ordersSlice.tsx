import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  orders: [] | null;
  success: boolean;
}

const INITIAL_STATE: InitialState = {
  orders: null,
  success: false,
};

const ownerOrders = createSlice({
  name: 'ownerOrders',
  initialState: INITIAL_STATE,
  reducers: {
    addOwnerOrders: (state, action) => {
      state.orders = action.payload;
      state.success = true;
    },
    clearOwnerOrders: (state) => {
      state.orders = null;
      state.success = false;
    },
  },
});

export const { addOwnerOrders, clearOwnerOrders } = ownerOrders.actions;
export default ownerOrders.reducer; 
