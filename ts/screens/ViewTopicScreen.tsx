import { RouteProp, useRoute } from "@react-navigation/core";
import React from "react";
import { ScrollView } from "react-native";
import Posts from "../components/Posts";
import PostType from "../types/PostType";
import ScreenPropsList from "../types/ScreenPropsList";
import discourseWrapper from "../wrapper/discourseWrapper";

type ViewTopicScreenNavigationProp = RouteProp<ScreenPropsList, "Topic">;

const ViewTopicScreen = () => {
  const route = useRoute<ViewTopicScreenNavigationProp>();
  const [posts, setPosts] = React.useState<PostType[]>([]);
  React.useEffect(() => {
    discourseWrapper
      .getTopic(route.params.topicID)
      .then(({ posts }) => setPosts(posts));
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <Posts posts={posts} />
    </ScrollView>
  );
};

export default ViewTopicScreen;
