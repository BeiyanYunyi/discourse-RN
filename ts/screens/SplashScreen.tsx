/* eslint-disable prefer-template */
import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import splashImg from "../../assets/front_splash.png";
import { changeScreen } from "../redux/screenReducer";
import { useAppDispatch } from "../redux/store";
import apiKeyWrapper from "../wrapper/apiKeyWrapper";
import rsaKeyWrapper from "../wrapper/rsaKeyWrapper";

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = React.useState("加载中\n获取加密公私钥对");

  React.useEffect(() => {
    let logged = true;
    rsaKeyWrapper
      .init()
      .then(() => {
        setText((text) => text + "\n获取登录状态");
        return apiKeyWrapper.init();
      })
      .then((result) => {
        setText((text) => text + "\n启动完成");
        if (!result) {
          dispatch(changeScreen("Login"));
          logged = false;
        }
      })
      .then(() => {
        if (logged) dispatch(changeScreen("Home"));
      });
  }, [dispatch]);
  return (
    <View
      style={{
        backgroundColor: "#000",
        height: "100%",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={splashImg}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text style={{ color: "#eee" }}>{text}</Text>
    </View>
  );
};

export default SplashScreen;
