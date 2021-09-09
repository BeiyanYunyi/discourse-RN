import { RouteProp, useRoute } from "@react-navigation/core";

import React from "react";
import { SafeAreaView } from "react-native";
import Posts from "../components/Posts";
import PostType from "../types/PostType";
import ScreenPropsList from "../types/ScreenPropsList";
import discourseWrapper from "../wrapper/discourseWrapper";

type ViewTopicScreenRouteProp = RouteProp<ScreenPropsList, "Topic">;

const ViewTopicScreen = () => {
  const route = useRoute<ViewTopicScreenRouteProp>();
  const [posts, setPosts] = React.useState<PostType[]>([]);
  React.useEffect(() => {
    discourseWrapper
      .getTopic(route.params.topicID)
      .then(({ posts }) => setPosts(posts));
  }, [route.params.topicID]);
  return (
    <SafeAreaView style={{ backgroundColor: "#000" }}>
      <Posts posts={posts} />
    </SafeAreaView>
  );
};

export default ViewTopicScreen;
