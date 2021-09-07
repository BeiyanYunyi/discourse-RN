import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { store } from "./ts/redux/store";
import ScreenController from "./ts/screens/ScreenController";

const App = () => {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <NavigationContainer>
          <ScreenController />
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
