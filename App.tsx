import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as Localization from "expo-localization";
import React from "react";
import { StatusBar } from "react-native";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import appI18n from "./ts/i18n/controller";
import { changeScreen } from "./ts/redux/screenReducer";
import { store } from "./ts/redux/store";
import MainScreenController from "./ts/screens/mainScreen/MainScreenController";
import NotificationScreen from "./ts/screens/NotificationScreen";
import apiKeyWrapper from "./ts/wrapper/apiKeyWrapper";
import rsaKeyWrapper from "./ts/wrapper/rsaKeyWrapper";

const App = () => {
  const init = async () => {
    appI18n.locale = Localization.locale;
    let loggedIn = true;
    await rsaKeyWrapper.init();
    const res = await apiKeyWrapper.init();
    if (!res) {
      store.dispatch(changeScreen("Login"));
      loggedIn = false;
    }
    if (loggedIn === true) store.dispatch(changeScreen("Home"));
  };
  const [loading, setLoading] = React.useState(true);
  const { screenName } = store.getState().screen;
  const Tab = createMaterialBottomTabNavigator();
  if (loading) {
    return (
      <AppLoading
        startAsync={init}
        onFinish={() => {
          setLoading(false);
        }}
        onError={alert}
      />
    );
  }
  return (
    <RootSiblingParent>
      <PaperProvider theme={DarkTheme}>
        <Provider store={store}>
          <NavigationContainer theme={NavigationDarkTheme}>
            <Tab.Navigator initialRouteName="main">
              <Tab.Screen
                name="main"
                component={MainScreenController}
                options={{ title: appI18n.t("mainPage"), tabBarIcon: "home" }}
              />
              {screenName === "Home" && (
                <>
                  <Tab.Screen
                    name="notifications"
                    component={NotificationScreen}
                    options={{
                      title: appI18n.t("notificationScreen"),
                      tabBarIcon: "bell",
                    }}
                  />
                  <Tab.Screen
                    name="account"
                    component={NotificationScreen}
                    options={{
                      title: appI18n.t("account"),
                      tabBarIcon: "account",
                    }}
                  />
                </>
              )}
            </Tab.Navigator>
            <StatusBar barStyle="light-content" />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </RootSiblingParent>
  );
};

export default App;
