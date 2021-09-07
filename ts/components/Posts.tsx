import React from "react";
import { Text, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import PostType from "../types/PostType";

const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
};

const Post = ({ post }: { post: PostType }) => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Text style={{ color: "#fff" }}>{post.username}：</Text>
      <RenderHTML
        contentWidth={width}
        source={{ html: post.cooked }}
        baseStyle={{
          color: "#fff",
          textAlign: "left",
          alignContent: "flex-start",
        }}
        ignoredDomTags={["svg"]}
      />
    </>
  );
};
export default Posts;
