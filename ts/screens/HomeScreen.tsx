import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Topics from "../components/Topics";
import TopicType from "../types/Topics/TopicType";
import UserType from "../types/Topics/UserType";
import discourseWrapper from "../wrapper/discourseWrapper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
  },
});

const HomeScreen = () => {
  const [text, setText] = React.useState<{
    users: UserType[];
    topics: TopicType[];
    nextPage: number;
  }>();
  React.useEffect(() => {
    (async () => {
      const res = await discourseWrapper.getTopics();
      setText(res);
    })();
  }, []);
  return (
    <>
      <ScrollView style={styles.container}>
        {text && <Topics topicList={text} />}
      </ScrollView>
    </>
  );
};

export default HomeScreen;
