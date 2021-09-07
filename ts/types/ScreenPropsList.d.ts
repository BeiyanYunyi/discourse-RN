import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ScreenPropsList = {
  Home: undefined;
  Login: undefined;
  Splash: undefined;
  Topic: { topicID: number; title: string };
};

export default ScreenPropsList;
