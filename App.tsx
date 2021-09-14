import {
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import React from "react";
import { StatusBar } from "react-native";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { changeScreen } from "./ts/redux/screenReducer";
import { store } from "./ts/redux/store";
import ScreenController from "./ts/screens/ScreenController";
import apiKeyWrapper from "./ts/wrapper/apiKeyWrapper";
import rsaKeyWrapper from "./ts/wrapper/rsaKeyWrapper";

const App = () => {
  const init = async () => {
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
            <ScreenController />
            <StatusBar barStyle="light-content" />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </RootSiblingParent>
  );
};

export default App;
