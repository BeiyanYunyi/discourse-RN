import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import Editor from "../components/Editor";
import { addPostToBottom } from "../redux/postsReducer";
import { useAppDispatch } from "../redux/store";
import ScreenPropsList from "../types/ScreenPropsList";
import discourseWrapper from "../wrapper/discourseWrapper";

export type PostEditorScreenRouteProp = RouteProp<
  ScreenPropsList,
  "PostEditor"
>;

type PostEditorScreenNavigationProp = NativeStackNavigationProp<
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
