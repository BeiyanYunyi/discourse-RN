import { useNavigation } from "@react-navigation/core";
import React, { MutableRefObject } from "react";
import { FlatList, Pressable, View } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { HomeScreenNavigationProp } from "../types/ScreenNavigationProps";
import TopicsListType from "../types/Topics/TopicsListType";
import TopicType from "../types/Topics/TopicType";
import UserType from "../types/Topics/UserType";
import formatTime from "../utils/formatTime";
import discourseWrapper from "../wrapper/discourseWrapper";
import UserAvatar from "./UserAvatar";

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

const Topics = () => {
  const [topicList, setTopicList] = React.useState<TopicsListType>({
    users: [],
    topics: [],
    nextPage: 0,
  });
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const res = await discourseWrapper.getTopics();
      setTopicList(res);
    })();
  }, []);
  const flatListRef = React.useRef() as MutableRefObject<FlatList<TopicType>>;
  const renderTopic = ({ item }: { item: TopicType }) => {
    const user = topicList.users.find(
      (user) => user.username === item.last_poster_username
    )!;
    return <Topic topic={item} user={user} key={item.id} />;
  };
  return (
    <View>
      <FlatList
        data={topicList.topics}
        renderItem={renderTopic}
        keyExtractor={(topic) => topic.id.toString()}
        ref={flatListRef}
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          if (!loading) {
            setLoading(true);
            const res = await discourseWrapper.getTopics(topicList.nextPage);
            setTopicList((topicList) => ({
              users: Array.from(new Set(topicList.users.concat(res.users))),
              topics: Array.from(new Set(topicList.topics.concat(res.topics))),
              nextPage: res.nextPage,
            }));
            setLoading(false);
          }
        }}
      />
      {loading && (
        <ActivityIndicator
          animating
          size={32}
          style={{
            position: "absolute",
            margin: 16,
            right: 0,
            top: 0,
          }}
        />
      )}
    </View>
  );
};

export default Topics;
