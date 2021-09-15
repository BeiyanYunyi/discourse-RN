/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import PostType from "../types/PostType";
import discourseWrapper from "../wrapper/discourseWrapper";

const initialState: { posts: PostType[]; stream: number[] } = {
  posts: [],
  stream: [],
};

export const initPosts = createAsyncThunk(
  "posts/initPosts",
  (
    { topicID, progress }: { topicID: number; progress?: number },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    thunkAPI
  ) => {
    return discourseWrapper.getTopic(topicID, progress);
  }
);

export const getNewerPosts = createAsyncThunk(
  "posts/getNewerPosts",
  (
    { topicID, progress }: { topicID: number; progress: number },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    thunkAPI
  ) => {
    return discourseWrapper.getTopic(topicID, progress);
  }
);

export const getOlderPosts = createAsyncThunk(
  "posts/getOlderPosts",
  (
    { topicID, progress }: { topicID: number; progress?: number },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    thunkAPI
  ) => {
    return discourseWrapper.getTopic(topicID, progress);
  }
);

export const postActionToAPost = createAsyncThunk(
  "posts/postActionToAPost",
  (
    {
      postId,
      postActionTypeId,
      flagTopic,
    }: {
      postId: number;
      postActionTypeId: number;
      flagTopic?: boolean;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    thunkAPI
  ) => {
    return discourseWrapper.postActionsToAPost(
      postId,
      postActionTypeId,
      flagTopic
    );
  }
);

export const withdrawPostAction = createAsyncThunk(
  "posts/withdrawPostAction",
  (
    {
      postId,
      postActionTypeId,
    }: {
      postId: number;
      postActionTypeId: number;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    thunkAPI
  ) => {
    return discourseWrapper.withdrawPostAction(postId, postActionTypeId);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPostToBottom: (state, action: PayloadAction<PostType>) => {
      state.posts.push(action.payload);
    },
    clearPosts: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.stream = action.payload.stream;
    });
    builder.addCase(getNewerPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      const postsNumbers = state.posts.map((post) => post.post_number);
      action.payload.posts.forEach((post) => {
        if (!postsNumbers.includes(post.post_number)) state.posts.push(post);
      });
    });
    builder.addCase(getOlderPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      const postsNumbers = state.posts.map((post) => post.post_number);
      action.payload.posts.reverse().forEach((post) => {
        if (!postsNumbers.includes(post.post_number)) state.posts.unshift(post);
      });
    });
    builder.addCase(postActionToAPost.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index] = action.payload;
    });
    builder.addCase(withdrawPostAction.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index] = action.payload;
    });
  },
});

export const { addPostToBottom, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
