import { RouteProp, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native";
import Posts from "../components/Posts";
import PostType from "../types/PostType";
import ScreenPropsList from "../types/ScreenPropsList";
import discourseWrapper from "../wrapper/discourseWrapper";

type ViewTopicScreenRouteProp = RouteProp<ScreenPropsList, "Topic">;

export type ViewTopicScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Home"
>;

const ViewTopicScreen = () => {
  const route = useRoute<ViewTopicScreenRouteProp>();
  const [posts, setPosts] = React.useState<PostType[]>([]);
  React.useEffect(() => {
    discourseWrapper
      .getTopic(route.params.topicID)
      .then(({ posts }) => setPosts(posts));
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "#000" }}>
      <Posts posts={posts} />
    </SafeAreaView>
  );
};

export default ViewTopicScreen;
