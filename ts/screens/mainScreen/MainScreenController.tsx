import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import appI18n from "../../i18n/controller";
import { useAppSelector } from "../../redux/store";
import ScreenPropsList from "../../types/ScreenPropsList";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import PostEditorScreen from "./PostEditorScreen";
import TopicEditorScreen from "./TopicEditorScreen";
import ViewTopicScreen from "./ViewTopicScreen";

const ScreenController = () => {
  const screenName = useAppSelector((state) => state.screen.screenName);
  const Stack = createNativeStackNavigator<ScreenPropsList>();
  return (
    <Stack.Navigator
      initialRouteName={screenName === "Home" ? "Home" : undefined}
    >
      {(() => {
        if (screenName === "Login") {
          return (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: appI18n.t("loginAndAuthorization") }}
            />
          );
        }
        return (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Loading...",
              }}
            />
            <Stack.Screen
              name="Topic"
              component={ViewTopicScreen}
              options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
              name="PostEditor"
              component={PostEditorScreen}
              options={({ route }) => ({
                title: route.params.title,
                headerBackVisible: false,
              })}
            />
            <Stack.Screen
              name="TopicEditor"
              component={TopicEditorScreen}
              options={{
                title: appI18n.t("newTopic"),
                headerBackVisible: false,
              }}
            />
          </>
        );
      })()}
    </Stack.Navigator>
  );
};

export default ScreenController;
