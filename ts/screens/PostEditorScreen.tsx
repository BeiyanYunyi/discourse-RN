import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import Editor from "../components/Editor";
import { addPostToBottom } from "../redux/postsReducer";
import { useAppDispatch } from "../redux/store";
import { PostEditorScreenNavigationProp } from "../types/ScreenNavigationProps";
import ScreenPropsList from "../types/ScreenPropsList";
import discourseWrapper from "../wrapper/discourseWrapper";

export type PostEditorScreenRouteProp = RouteProp<
  ScreenPropsList,
  "PostEditor"
>;

const PostEditorScreen = () => {
  const route = useRoute<PostEditorScreenRouteProp>();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<PostEditorScreenNavigationProp>();
  return (
    <>
      <Editor
        onMessage={async (msg) => {
          const data = await discourseWrapper.replyToPost(
            msg.nativeEvent.data,
            route.params.replyToPostNumber,
            route.params.topicId
          );
          dispatch(addPostToBottom(data));
          navigation.goBack();
        }}
      />
    </>
  );
};

export default PostEditorScreen;
