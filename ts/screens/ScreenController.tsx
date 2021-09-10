import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import appInfo from "../../app.json";
import { useAppSelector } from "../redux/store";
import ScreenPropsList from "../types/ScreenPropsList";
import EditorScreen from "./EditorScreen";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";
import ViewTopicScreen from "./ViewTopicScreen";

const ScreenController = () => {
  const screenName = useAppSelector((state) => state.screen.screenName);
  const Stack = createNativeStackNavigator<ScreenPropsList>();
  return (
    <Stack.Navigator
      initialRouteName={screenName === "Home" ? "Home" : undefined}
    >
      {(() => {
        switch (screenName) {
          case "Home":
            return (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    title: appInfo.expo.name,
                  }}
                />
                <Stack.Screen
                  name="Topic"
                  component={ViewTopicScreen}
                  options={({ route }) => ({ title: route.params.title })}
                />
                <Stack.Screen
                  name="Editor"
                  component={EditorScreen}
                  options={({ route }) => ({ title: route.params.title })}
                />
              </>
            );
          case "Login":
            return (
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "登录并授权" }}
              />
            );
          default:
            return (
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ title: "加载中" }}
              />
            );
        }
      })()}
    </Stack.Navigator>
  );
};

export default ScreenController;
