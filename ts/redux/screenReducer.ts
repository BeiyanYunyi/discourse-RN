/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScreenState {
  screenName: "Login" | "Home";
}
const initialState: ScreenState = { screenName: "Home" };

const screenSlice = createSlice({
  name: "screenName",
  initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<"Login" | "Home">) => {
      state.screenName = action.payload; // It's safe.
    },
  },
});

export const { changeScreen } = screenSlice.actions;

export default screenSlice.reducer;
