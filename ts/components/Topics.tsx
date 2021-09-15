import { useNavigation } from "@react-navigation/core";
import React, { MutableRefObject } from "react";
import { FlatList, Pressable } from "react-native";
import { Caption, Card, FAB, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getOlderTopics, initTopics } from "../redux/topicsReducer";
import { HomeScreenNavigationProp } from "../types/ScreenNavigationProps";
import TopicType from "../types/Topics/TopicType";
import UserType from "../types/Topics/UserType";
import formatTime from "../utils/formatTime";
import UserAvatar from "./UserAvatar";

const Topic = ({ topic, user }: { topic: TopicType; user: UserType }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const categories = useAppSelector((state) => state.siteInfo.categories);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Topic", {
          topicID: topic.id,
          title: topic.title,
          progress: topic.last_read_post_number,
        });
      }}
    >
      <Card style={{ margin: 5, marginBottom: 0 }}>
        <Card.Title
          title={topic.title}
          subtitle={
            categories.find((item) => item.id === topic.category_id)?.name
          }
          left={(props) => (
            <UserAvatar {...props} avatarAddr={user.avatar_template} />
          )}
        />
        {topic.image_url ? (
          <Card.Cover
            source={{ uri: topic.image_url }}
            style={{ marginBottom: 16 }}
          />
        ) : undefined}
        {topic.excerpt ? (
          <Card.Content>
            <Text>{topic.excerpt}</Text>
          </Card.Content>
        ) : undefined}
        <Card.Actions>
          <Caption>{formatTime(topic.last_posted_at, "最后回复于  ")}</Caption>
        </Card.Actions>
      </Card>
    </Pressable>
  );
};

const Topics = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const topicList = useAppSelector((state) => state.topics);
  const dispatch = useAppDispatch();
  const refresh = () => {
    dispatch(initTopics());
  };
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    dispatch(initTopics());
  }, [dispatch]);
  const flatListRef = React.useRef() as MutableRefObject<FlatList<TopicType>>;
  const renderTopic = ({ item }: { item: TopicType }) => {
    const user =
      topicList.users.find(
        (user) => user.username === item.last_poster_username
      ) || item.details!.last_poster;
    return <Topic topic={item} user={user} key={item.id} />;
  };
  return (
    <>
      <FlatList
        data={topicList.topics}
        renderItem={renderTopic}
        keyExtractor={(topic) => topic.id.toString()}
        ref={flatListRef}
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          if (!loading) {
            setLoading(true);
            dispatch(getOlderTopics(topicList.nextPage));
            setLoading(false);
          }
        }}
        refreshing={loading}
        onRefresh={() => {
          refresh();
        }}
      />
      <FAB
        icon="plus"
        onPress={() => {
          navigation.navigate("TopicEditor");
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

export default Topics;
