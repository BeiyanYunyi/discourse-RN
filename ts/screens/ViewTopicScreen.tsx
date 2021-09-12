import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView } from "react-native";
import Posts from "../components/Posts";
import { clearPosts } from "../redux/postsReducer";
import { useAppDispatch } from "../redux/store";
import { ViewTopicScreenNavigationProp } from "../types/ScreenNavigationProps";

const ViewTopicScreen = () => {
  const navigation = useNavigation<ViewTopicScreenNavigationProp>();
  const dispatch = useAppDispatch();
  navigation.addListener("beforeRemove", (e) => {
    e.preventDefault();
    dispatch(clearPosts());
    navigation.dispatch(e.data.action);
  });
  return (
    <SafeAreaView style={{ backgroundColor: "#000" }}>
      <Posts />
    </SafeAreaView>
  );
};

export default ViewTopicScreen;
