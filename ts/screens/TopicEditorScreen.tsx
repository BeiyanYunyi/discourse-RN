import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TextInput } from "react-native-paper";
import Editor from "../components/Editor";
import { useAppDispatch } from "../redux/store";
import { addTopicToTop } from "../redux/topicsReducer";
import { TopicEditorScreenNavigationProp } from "../types/ScreenNavigationProps";
import CustomedToast from "../utils/CustomedToast";
import discourseWrapper from "../wrapper/discourseWrapper";

const TopicTitle = React.forwardRef((_props, ref) => {
  const [title, setTitle] = React.useState("");
  React.useImperativeHandle(ref, () => {
    return { title };
  });
  return (
    <TextInput
      dense
      mode="outlined"
      label="title"
      onChangeText={(text) => setTitle(text)}
      value={title}
      style={{ marginBottom: 16 }}
    />
  );
});

const TopicEditorScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<TopicEditorScreenNavigationProp>();
  const titleRef = React.useRef<{ title: string }>();

  return (
    <>
      <TopicTitle ref={titleRef} />
      <Editor
        onMessage={async (msg) => {
          if (titleRef.current?.title) {
            const data = await discourseWrapper.createTopic(
              msg.nativeEvent.data,
              titleRef.current?.title
            );
            dispatch(addTopicToTop(data));
            navigation.goBack();
          } else {
            CustomedToast({ message: "请输入标题" });
          }
        }}
      />
    </>
  );
};

export default TopicEditorScreen;
