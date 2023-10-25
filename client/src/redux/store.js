import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import userReducer from "../redux/features/userSlice";

export const store = configureStore({ 
  reducer: {
    auth: authReducer,
    users: userReducer
  },
});
