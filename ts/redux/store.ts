import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import notificationReducer from "./notificationReducer";
import postsReducer from "./postsReducer";
import screenReducer from "./screenReducer";
import siteInfoReducer from "./siteInfoReducer";
import topicsReducer from "./topicsReducer";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    posts: postsReducer,
    topics: topicsReducer,
    siteInfo: siteInfoReducer,
    notifications: notificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
