import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView } from "react-native";
import { FAB } from "react-native-paper";
import Posts from "../../components/Posts";
import appI18n from "../../i18n/controller";
import { clearPosts } from "../../redux/postsReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ViewTopicScreenNavigationProp } from "../../types/ScreenNavigationProps";

const ViewTopicScreen = () => {
  const navigation = useNavigation<ViewTopicScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  React.useEffect(() => {
    dispatch(clearPosts());
  }, [dispatch]);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#000" }}>
        <Posts />
      </SafeAreaView>
      <FAB
        icon="reply"
        onPress={() => {
          navigation.navigate("PostEditor", {
            replyToPostNumber: 1,
            topicId: posts[0].topic_id,
            title: appI18n.t("reply"),
          });
        }}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
      />
    </>
  );
};

export default ViewTopicScreen;
