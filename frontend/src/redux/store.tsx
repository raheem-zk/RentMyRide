import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user/authSlice";
import adminSlice from './admin/authSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import carOwnerSlice from './carOwner/authSlice';
import ownerSignupSlice from './carOwner/signupSlice';
import addCarSlice from './carOwner/addCarSlice';
import carsSlice from "./user/carsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  userAuth: authSlice,
  adminAuth : adminSlice,
  carOwnerAuth: carOwnerSlice,
  carOwnerSignup : ownerSignupSlice,
  addCar : addCarSlice,
  carsDatas: carsSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
