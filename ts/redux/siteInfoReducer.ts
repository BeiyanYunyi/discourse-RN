/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SiteInfo from "../types/SiteInfo";
import discourseWrapper from "../wrapper/discourseWrapper";

const initialState: Pick<SiteInfo, "categories"> & {
  notificationTypes: Record<string, number>;
} = {
  categories: [],
  notificationTypes: {},
};

export const initSiteInfo = createAsyncThunk("siteInfo/initSiteInfo", () => {
  return discourseWrapper.getSiteInfo();
});

const siteInfoSlice = createSlice({
  name: "siteInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initSiteInfo.fulfilled, (state, action) => {
      state.notificationTypes = action.payload.notification_types;
      state.categories.push(...action.payload.categories);
    });
  },
});

export default siteInfoSlice.reducer;
