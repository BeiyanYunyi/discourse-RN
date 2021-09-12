import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import React, { MutableRefObject } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { Button, Caption, Card, useTheme } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import LinkRenderer from "../customRenderer/LinkRenderer";
import TextRenderer from "../customRenderer/TextRenderer";
import PostType from "../types/PostType";
import { ViewTopicScreenNavigationProp } from "../types/ScreenNavigationProps";
import ScreenPropsList from "../types/ScreenPropsList";
import formatTime from "../utils/formatTime";
import discourseWrapper from "../wrapper/discourseWrapper";
import UserAvatar from "./UserAvatar";

const Post = ({
  post,
  flatListRef,
  firstPostNumber,
}: {
  post: PostType;
  flatListRef: MutableRefObject<FlatList<PostType>>;
  firstPostNumber: number;
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
          post.reply_to_post_number ? (
            <Button
              icon="reply"
              {...props}
              mode="text"
              onPress={() => {
                flatListRef.current.scrollToIndex({
                  index: post.reply_to_post_number! - firstPostNumber,
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
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const firstPostNumber = posts[0]?.post_number;
  const refresh = () => {
    discourseWrapper
      .getTopic(route.params.topicID, route.params.progress)
      .then(({ posts }) => setPosts(posts));
  };
  React.useEffect(() => {
    discourseWrapper
      .getTopic(route.params.topicID, route.params.progress)
      .then(({ posts }) => setPosts(posts));
  }, [route.params.progress, route.params.topicID]);
  const flatListRef = React.useRef() as MutableRefObject<FlatList<PostType>>;
  const renderPost = ({ item }: { item: PostType }) => (
    <Post
      post={item}
      flatListRef={flatListRef}
      firstPostNumber={firstPostNumber}
    />
  );
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
            const res = await discourseWrapper.getPosts(
              route.params.topicID,
              posts[posts.length - 1].post_number
            );
            setPosts((posts) => {
              const postsNumbers = posts.map((post) => post.post_number);
              const postsToProcess = posts;
              res.forEach((post) => {
                if (!postsNumbers.includes(post.post_number))
                  postsToProcess.push(post);
              });
              return postsToProcess;
            });
            setLoading(false);
          }
        }}
        onRefresh={() => {
          refresh();
        }}
        refreshing={loading}
      />
    </>
  );
};

export default Posts;
