import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice.reducer,
  },
});

export default store;
