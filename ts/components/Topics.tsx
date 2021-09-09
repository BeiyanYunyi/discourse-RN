import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable, View } from "react-native";
import { Card } from "react-native-paper";
import { HomeScreenNavigationProp } from "../screens/HomeScreen";
import TopicsListType from "../types/Topics/TopicsListType";
import TopicType from "../types/Topics/TopicType";
import UserType from "../types/Topics/UserType";
import formatTime from "../utils/formatTime";
import UserAvatar from "./UserAvatar";

const Topics = ({ topicList }: { topicList: TopicsListType }) => {
  return (
    <View>
      {topicList.topics.map((topic) => {
        const user = topicList.users.find(
          (user) => user.username === topic.last_poster_username
        )!;
        return <Topic topic={topic} user={user} key={topic.id} />;
      })}
    </View>
  );
};

const Topic = ({ topic, user }: { topic: TopicType; user: UserType }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Topic", {
          topicID: topic.id,
          title: topic.title,
        });
      }}
    >
      <Card style={{ margin: 5 }}>
        <Card.Title
          title={topic.title}
          subtitle={formatTime(topic.last_posted_at, "最后回复于  ")}
          left={(props) => (
            <UserAvatar {...props} avatarAddr={user.avatar_template} />
          )}
        />
        <Card.Content>{topic.excerpt}</Card.Content>
      </Card>
    </Pressable>
  );
};

export default Topics;
