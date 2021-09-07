import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ScreenPropsList from "../types/ScreenPropsList";

export interface ScreenState {
  screenName: keyof ScreenPropsList;
}
const initialState: ScreenState = { screenName: "Splash" };

const screenSlice = createSlice({
  name: "screenName",
  initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<keyof ScreenPropsList>) => {
      state.screenName = action.payload;
    },
  },
});

export const { changeScreen } = screenSlice.actions;

export default screenSlice.reducer;
