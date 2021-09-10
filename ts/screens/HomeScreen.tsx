import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Topics from "../components/Topics";
import { HomeScreenNavigationProp } from "../types/ScreenNavigationProps";
import discourseWrapper from "../wrapper/discourseWrapper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
  },
});

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  React.useEffect(() => {
    (async () => {
      const siteInfo = await discourseWrapper.getSiteInfo();
      navigation.setOptions({ title: siteInfo.title });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Topics />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
