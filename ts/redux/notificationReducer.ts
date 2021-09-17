/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NotificationResType from "../types/NotificationType";
import discourseWrapper from "../wrapper/discourseWrapper";

const initialState: NotificationResType = {
  notifications: [],
  total_rows_notifications: 0,
  seen_notification_id: 0,
  load_more_notifications: "",
};

export const initNotifications = createAsyncThunk(
  "notifications/initNotifications",
  () => {
    return discourseWrapper.getNotifications();
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initNotifications.fulfilled, (state, action) => {
      state.total_rows_notifications = action.payload.total_rows_notifications;
      state.load_more_notifications = action.payload.load_more_notifications;
      state.seen_notification_id = action.payload.seen_notification_id;
      state.notifications = [];
      state.notifications.push(...action.payload.notifications);
    });
  },
});

export default notificationsSlice.reducer;
