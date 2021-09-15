import { useNavigation } from "@react-navigation/core";
import React from "react";
import Topics from "../components/Topics";
import { initSiteInfo } from "../redux/siteInfoReducer";
import { useAppDispatch } from "../redux/store";
import { HomeScreenNavigationProp } from "../types/ScreenNavigationProps";
import discourseWrapper from "../wrapper/discourseWrapper";

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    (async () => {
      const siteInfo = await discourseWrapper.getSiteBasicInfo();
      navigation.setOptions({ title: siteInfo.title });
      dispatch(initSiteInfo());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Topics />;
};

export default HomeScreen;
