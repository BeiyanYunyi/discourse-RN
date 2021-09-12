import { useNavigation } from "@react-navigation/core";
import React from "react";
import Topics from "../components/Topics";
import { HomeScreenNavigationProp } from "../types/ScreenNavigationProps";
import discourseWrapper from "../wrapper/discourseWrapper";

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  React.useEffect(() => {
    (async () => {
      const siteInfo = await discourseWrapper.getSiteInfo();
      navigation.setOptions({ title: siteInfo.title });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Topics />;
};

export default HomeScreen;
