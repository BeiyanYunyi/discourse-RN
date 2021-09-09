import { useNavigation } from "@react-navigation/core";
import React, { MutableRefObject } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { Button, Caption, Card } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import LinkRenderer from "../customRenderer/LinkRenderer";
import { ViewTopicScreenNavigationProp } from "../screens/ViewTopicScreen";
import PostType from "../types/PostType";
import formatTime from "../utils/formatTime";
import UserAvatar from "./UserAvatar";

const Posts = ({ posts }: { posts: PostType[] }) => {
  const flatListRef = React.useRef() as MutableRefObject<FlatList<PostType>>;
  const renderPost = ({ item }: { item: PostType }) => (
    <Post post={item} flatListRef={flatListRef} />
  );
  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(post) => post.post_number.toString()}
      ref={flatListRef}
    />
  );
};

const renderers = { a: LinkRenderer };

const Post = ({
  post,
  flatListRef,
}: {
  post: PostType;
  flatListRef: MutableRefObject<FlatList<PostType>>;
}) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<ViewTopicScreenNavigationProp>();

  return (
    <Card style={{ margin: 5 }}>
      <Card.Title
        title={post.username}
        subtitle={`# ${post.post_number}`}
        left={(props) => (
          <UserAvatar {...props} avatarAddr={post.avatar_template} />
        )}
        right={(props) =>
          post.reply_to_post_number ? (
            <Button
              icon="reply"
              {...props}
              mode="text"
              onPress={() => {
                flatListRef.current.scrollToIndex({
                  index: post.reply_to_post_number! - 1,
                });
              }}
            >
              # {post.reply_to_post_number}
            </Button>
          ) : undefined
        }
      />
      <Card.Content>
        <RenderHTML
          contentWidth={width}
          source={{ html: post.cooked }}
          baseStyle={{
            textAlign: "left",
            alignContent: "flex-start",
          }}
          ignoredDomTags={["svg"]}
          renderers={renderers}
          defaultTextProps={{ selectable: true }}
        />
      </Card.Content>
      <Card.Actions>
        <Caption>{formatTime(post.created_at)}</Caption>
        <Button
          icon="reply"
          onPress={() => {
            navigation.navigate("Editor", {
              replyToPostNumber: post.post_number,
              topicId: post.topic_id,
              title: `回复 #${post.post_number}`,
            });
          }}
        >
          {post.reply_count}
        </Button>
      </Card.Actions>
    </Card>
  );
};
export default Posts;
