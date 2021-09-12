import {
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { store } from "./ts/redux/store";
import ScreenController from "./ts/screens/ScreenController";

const App = () => {
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
