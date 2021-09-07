import TopicsListType from "../types/Topics/TopicsListType";
import React from "react";
import {
  Card,
  Title,
  Paragraph,
  Caption,
  Avatar,
  Button,
} from "react-native-paper";
import TopicType from "../types/Topics/TopicType";
import { View, Image, Pressable } from "react-native";
import UserType from "../types/Topics/UserType";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";
import discourseWrapper from "../wrapper/discourseWrapper";
import { useNavigation } from "@react-navigation/core";
import { HomeScreenNavigationProp } from "../screens/HomeScreen";
import config from "../config/config";

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
  const lastReplyTime = new Date(topic.last_posted_at);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Topic", {
          topicID: topic.id,
          title: topic.fancy_title,
        });
      }}
    >
      <Card style={{ margin: 5 }}>
        <Card.Content>
          <Title>{topic.fancy_title}</Title>
          <Caption>
            <Avatar.Image
              size={24}
              source={{
                uri: discourseWrapper.getAvatarAddr(user.avatar_template),
                headers: { "User-Agent": config.userAgent },
              }}
            />
            最后回复于
            {formatDistance(new Date(), lastReplyTime, { locale: zhCN })}前
          </Caption>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default Topics;
