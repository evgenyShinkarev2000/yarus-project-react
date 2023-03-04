import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {authReducer} from "./AuthSlice";

export const store = configureStore({
  reducer:{
    authReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
