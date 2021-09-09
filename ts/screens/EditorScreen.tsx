import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import Editor from "../components/Editor";
import ScreenPropsList from "../types/ScreenPropsList";
import discourseWrapper from "../wrapper/discourseWrapper";

export type EditorScreenRouteProp = RouteProp<ScreenPropsList, "Editor">;

type EditorScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Editor"
>;

const EditorScreen = () => {
  const route = useRoute<EditorScreenRouteProp>();
  const navigation = useNavigation<EditorScreenNavigationProp>();
  return (
    <>
      <Editor
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

export default EditorScreen;
