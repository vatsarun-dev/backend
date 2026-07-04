import { createSlice } from "@reduxjs/toolkit";

export let userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export let { addUser, removeUser } = userSlice.actions;
