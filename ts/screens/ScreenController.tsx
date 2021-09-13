import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAppSelector } from "../redux/store";
import ScreenPropsList from "../types/ScreenPropsList";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import PostEditorScreen from "./PostEditorScreen";
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
              options={{ title: "登录并授权" }}
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
              options={({ route }) => ({ title: route.params.title })}
            />
          </>
        );
      })()}
    </Stack.Navigator>
  );
};

export default ScreenController;
