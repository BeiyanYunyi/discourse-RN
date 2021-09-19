import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { Element } from "domhandler";
import { appendChild, removeElement } from "domutils";
import React, { MutableRefObject } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import {
  Button,
  Caption,
  Card,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import RenderHTML from "react-native-render-html";
import ImageRenderer from "../customRenderer/ImageRenderer";
import LinkRenderer from "../customRenderer/LinkRenderer";
import TextRenderer from "../customRenderer/TextRenderer";
import appI18n from "../i18n/controller";
import {
  getNewerPosts,
  getOlderPosts,
  initPosts,
  postActionToAPost,
  withdrawPostAction,
} from "../redux/postsReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import PostType from "../types/PostType";
import { ViewTopicScreenNavigationProp } from "../types/ScreenNavigationProps";
import ScreenPropsList from "../types/ScreenPropsList";
import formatTime from "../utils/formatTime";
import discourseWrapper from "../wrapper/discourseWrapper";
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
    img: ImageRenderer,
  };
  const { width } = useWindowDimensions();
  const navigation = useNavigation<ViewTopicScreenNavigationProp>();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const thumbUpToPost = !post.yours
    ? () => {
        if (post.actions_summary.find((obj) => obj && obj.id === 2)?.can_act) {
          dispatch(postActionToAPost({ postId: post.id, postActionTypeId: 2 }));
        } else {
          dispatch(
            withdrawPostAction({ postId: post.id, postActionTypeId: 2 })
          );
        }
      }
    : undefined;

  return (
    <Card style={{ margin: 5, marginBottom: 0 }}>
      <Card.Title
        title={post.username}
        subtitle={`# ${post.post_number}`}
        left={(props) => (
          // Prepared for user info query.
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          <TouchableRipple onPress={() => {}}>
            <UserAvatar {...props} avatarAddr={post.avatar_template} />
          </TouchableRipple>
        )}
        right={(props) =>
          replyIndex ? (
            <Button
              icon="reply"
              {...props}
              mode="text"
              onPress={
                replyIndex !== -1
                  ? () => {
                      flatListRef.current.scrollToIndex({
                        index: replyIndex,
                      });
                    }
                  : undefined
              }
            >
              #{" "}
              {replyIndex !== -1
                ? post.reply_to_post_number
                : appI18n.t("notLoaded")}
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
            color: colors.text,
          }}
          ignoredDomTags={["svg"]}
          renderers={renderers}
          defaultTextProps={{ selectable: true }}
          domVisitors={{
            onElement(ele) {
              if (ele.name === "a" && ele.attribs.class === "lightbox") {
                const src = ele.attribs.href;
                const img = ele.firstChild as unknown as Element;
                img.attribs.src = src;
                appendChild(ele.parent as unknown as Element, img!);
                removeElement(ele);
              }
            },
          }}
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
              title: `${appI18n.t("reply")} #${post.post_number}`,
            });
          }}
        >
          {post.reply_count}
        </Button>
        <Button icon="thumb-up" onPress={thumbUpToPost}>
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [time, setTime] = React.useState(Date.now());
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
            await discourseWrapper.markPostAsRead(
              posts[posts.length - 1].post_number,
              posts[posts.length - 1].topic_id,
              Date.now() - time
            );
            setLoading(false);
          }
        }}
        onRefresh={() => {
          const targetPostNumber = posts[0].post_number - 15;
          dispatch(
            getOlderPosts({
              topicID: route.params.topicID,
              progress: targetPostNumber > 1 ? targetPostNumber : undefined,
            })
          );
        }}
        refreshing={loading}
      />
    </>
  );
};

export default Posts;
