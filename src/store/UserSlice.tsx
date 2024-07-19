import { createSlice } from "@reduxjs/toolkit";

const initialState: any = { user: null };

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});
export default UserSlice;
export const UserActions = UserSlice.actions;
