/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import TopicsListType from "../types/Topics/TopicsListType";
import TopicType from "../types/Topics/TopicType";
import discourseWrapper from "../wrapper/discourseWrapper";

const initialState: TopicsListType = { users: [], topics: [], nextPage: 0 };

export const initTopics = createAsyncThunk("topics/initTopics", () => {
  return discourseWrapper.getTopics();
});

export const getOlderTopics = createAsyncThunk(
  "topics/getOlderTopics",
  (page: number) => {
    return discourseWrapper.getTopics(page);
  }
);

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    addTopicToTop: (state, action: PayloadAction<TopicType>) => {
      const userIds = state.users.map((user) => user.id);
      if (
        action.payload.last_poster &&
        !userIds.includes(action.payload.last_poster?.id)
      ) {
        state.users.push(action.payload.last_poster);
      }
      state.topics.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initTopics.fulfilled, (state, action) => {
      state.users = [];
      state.topics = [];
      state.nextPage = 0;
      state.users.push(...action.payload.users);
      state.topics.push(...action.payload.topics);
      state.nextPage = action.payload.nextPage;
    });
    builder.addCase(getOlderTopics.fulfilled, (state, action) => {
      const userIds = state.users.map((user) => user.id);
      const topicIds = state.topics.map((topic) => topic.id);
      action.payload.users.forEach((user) => {
        if (!userIds.includes(user.id)) {
          state.users.push(user);
        }
      });
      action.payload.topics.forEach((topic) => {
        if (!topicIds.includes(topic.id)) {
          state.topics.push(topic);
        }
      });
      state.nextPage = action.payload.nextPage;
    });
  },
});

export const { addTopicToTop } = topicsSlice.actions;

export default topicsSlice.reducer;
