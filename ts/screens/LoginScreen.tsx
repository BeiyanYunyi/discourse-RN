import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React from "react";
import Toast from "react-native-root-toast";
import WebView from "react-native-webview";
import { changeScreen } from "../redux/screenReducer";
import { useAppDispatch } from "../redux/store";
import serializeParams from "../utils/serializeParams";
import apiKeyWrapper from "../wrapper/apiKeyWrapper";
import jsEncrypt from "../wrapper/jsEncryptWrapper";
import rsaKeyWrapper from "../wrapper/rsaKeyWrapper";
import ScreenPropsList from "../types/ScreenPropsList";
import discourseWrapper from "../wrapper/discourseWrapper";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  ScreenPropsList,
  "Login"
>;

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const run = `
      const intid = setInterval(() => {
        const code = document.querySelector("code");
        if (code) {
          window.ReactNativeWebView.postMessage(code.textContent);
          clearInterval(intid);
        }
      }, 50);
      true;
    `;

  return (
    <WebView
      source={{
        uri: `${discourseWrapper.url}/user-api-key/new?${serializeParams(
          discourseWrapper.params
        )}`,
      }}
      injectedJavaScript={run}
      onMessage={async (m) => {
        const { data } = m.nativeEvent;
        jsEncrypt.setPrivateKey(rsaKeyWrapper.keyp.private);
        const dec = jsEncrypt.decrypt(data);
        if (dec) {
          const decObj = JSON.parse(dec);
          await apiKeyWrapper.changeKey(decObj.key);
          Toast.show("登录成功", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          dispatch(changeScreen("Home"));
        }
      }}
    />
  );
};

export default LoginScreen;
