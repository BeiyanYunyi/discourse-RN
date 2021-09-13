import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ScreenPropsList from "./ScreenPropsList";

export type ViewTopicScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Topic"
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Home"
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Login"
>;

export type PostEditorScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "PostEditor"
>;

export type TopicEditorScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "TopicEditor"
>;
