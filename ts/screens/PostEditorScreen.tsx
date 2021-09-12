import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import PostEditor from "../components/PostEditor";
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
  const navigation = useNavigation<PostEditorScreenNavigationProp>();
  return (
    <>
      <PostEditor
        onMessage={async (msg) => {
          const data = await discourseWrapper.replyToPost(
            msg.nativeEvent.data,
            route.params.replyToPostNumber,
            route.params.topicId
          );
          console.log(data);
          navigation.goBack();
        }}
      />
    </>
  );
};

export default PostEditorScreen;
