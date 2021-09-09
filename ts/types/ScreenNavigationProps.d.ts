import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ScreenPropsList from "./ScreenPropsList";

export type ViewTopicScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Home"
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Home"
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Login"
>;
