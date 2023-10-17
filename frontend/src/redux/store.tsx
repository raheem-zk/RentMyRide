import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user/authSlice";
import adminSlice from "./admin/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import carOwnerSlice from "./carOwner/authSlice";
import ownerSignupSlice from "./carOwner/signupSlice";
import addCarSlice from "./carOwner/addCarSlice";
import carsSlice from "./user/carsSlice";
import carsListSlice from "./admin/carsSlice";
import userListSlice from "./admin/usersSlice";
import ownerListSlice from "./admin/carownersSlice";
import OwnerCars from "./carOwner/carsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  userAuth: authSlice,
  adminAuth: adminSlice,
  carOwnerAuth: carOwnerSlice,
  carOwnerSignup: ownerSignupSlice,
  addCar: addCarSlice,
  carsDatas: carsSlice, // user side
  carsList: carsListSlice, // admin side
  usersList: userListSlice, // admin side
  carownersList: ownerListSlice, // admin side
  ownerCars : OwnerCars , //owner side
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
