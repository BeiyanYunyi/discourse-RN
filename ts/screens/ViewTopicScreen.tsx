import React from "react";
import { SafeAreaView } from "react-native";
import Posts from "../components/Posts";

const ViewTopicScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#000" }}>
      <Posts />
    </SafeAreaView>
  );
};

export default ViewTopicScreen;
