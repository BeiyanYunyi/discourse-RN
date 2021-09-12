import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import React, { MutableRefObject } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { Button, Caption, Card, useTheme } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import LinkRenderer from "../customRenderer/LinkRenderer";
import TextRenderer from "../customRenderer/TextRenderer";
import { getNewerPosts, initPosts } from "../redux/postsReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import PostType from "../types/PostType";
import { ViewTopicScreenNavigationProp } from "../types/ScreenNavigationProps";
import ScreenPropsList from "../types/ScreenPropsList";
import formatTime from "../utils/formatTime";
import UserAvatar from "./UserAvatar";

const Post = ({
  post,
  flatListRef,
  replyIndex,
}: {
  post: PostType;
  flatListRef: MutableRefObject<FlatList<PostType>>;
  replyIndex: number | undefined;
}) => {
  const renderers = {
    a: LinkRenderer,
    p: TextRenderer,
  };
  const { width } = useWindowDimensions();
  const navigation = useNavigation<ViewTopicScreenNavigationProp>();
  const { colors } = useTheme();

  return (
    <Card style={{ margin: 5 }}>
      <Card.Title
        title={post.username}
        subtitle={`# ${post.post_number}`}
        left={(props) => (
          <UserAvatar {...props} avatarAddr={post.avatar_template} />
        )}
        right={(props) =>
          replyIndex ? (
            <Button
              icon="reply"
              {...props}
              mode="text"
              onPress={() => {
                flatListRef.current.scrollToIndex({
                  index: replyIndex,
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
          defaultTextProps={{ selectable: true, style: { color: colors.text } }}
        />
      </Card.Content>
      <Card.Actions>
        <Caption>{formatTime(post.created_at)}</Caption>
        <Button
          icon="reply"
          onPress={() => {
            navigation.navigate("PostEditor", {
              replyToPostNumber: post.post_number,
              topicId: post.topic_id,
              title: `回复 #${post.post_number}`,
            });
          }}
        >
          {post.reply_count}
        </Button>
        <Button icon="thumb-up">
          {post.actions_summary.find((obj) => obj && obj.id === 2)?.count || 0}
        </Button>
      </Card.Actions>
    </Card>
  );
};

type ViewTopicScreenRouteProp = RouteProp<ScreenPropsList, "Topic">;

const Posts = () => {
  const route = useRoute<ViewTopicScreenRouteProp>();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    dispatch(
      initPosts({
        topicID: route.params.topicID,
        progress: route.params.progress,
      })
    );
  }, [dispatch, route.params.progress, route.params.topicID]);
  const flatListRef = React.useRef() as MutableRefObject<FlatList<PostType>>;
  const renderPost = ({ item }: { item: PostType }) => {
    const replyIndex = item.reply_to_post_number
      ? posts.findIndex(
          (value) => value.post_number === item.reply_to_post_number
        )
      : undefined;
    return (
      <Post post={item} flatListRef={flatListRef} replyIndex={replyIndex} />
    );
  };
  return (
    <>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(post) => post.post_number.toString()}
        ref={flatListRef}
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          if (!loading) {
            setLoading(true);
            dispatch(
              getNewerPosts({
                topicID: route.params.topicID,
                progress: posts[posts.length - 1].post_number,
              })
            );
            setLoading(false);
          }
        }}
        onRefresh={() => {
          dispatch(
            initPosts({
              topicID: route.params.topicID,
              progress: route.params.progress,
            })
          );
        }}
        refreshing={loading}
      />
    </>
  );
};

export default Posts;
