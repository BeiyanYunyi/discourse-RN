import { useNavigation } from "@react-navigation/core";
import React from "react";
import { IconButton } from "react-native-paper";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import config from "../config/config";
import {
  PostEditorScreenNavigationProp,
  TopicEditorScreenNavigationProp,
} from "../types/ScreenNavigationProps";
import CustomedToast from "../utils/CustomedToast";
import wait from "../utils/wait";
import apiKeyWrapper from "../wrapper/apiKeyWrapper";

const Editor = ({
  onMessage,
}: {
  onMessage: (event: WebViewMessageEvent) => void;
}) => {
  const navigation = useNavigation<
    PostEditorScreenNavigationProp | TopicEditorScreenNavigationProp
  >();
  const webRef = React.useRef<WebView>(null);
  let confirmedLeave = false;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="send"
          onPress={() => {
            webRef.current?.injectJavaScript(
              "window.ReactNativeWebView.postMessage(window.vd.getValue());true;"
            );
          }}
        />
      ),
    });
  });
  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      // Prompt the user before leaving the screen
      if (!confirmedLeave) {
        // It's safe.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        confirmedLeave = true;
        CustomedToast({ message: "再按一次退出" });
        wait(3000).then(() => {
          confirmedLeave = false;
        });
        return;
      }
      navigation.dispatch(e.data.action);
    });
  }, [confirmedLeave, navigation]);
  const siteURL = config.url;
  const { clientId, userAgent } = config;
  const apiKey = apiKeyWrapper.key;
  return (
    <WebView
      ref={webRef}
      originWhitelist={["*"]}
      onMessage={(e) => {
        confirmedLeave = true;
        onMessage(e);
      }}
      source={{
        baseUrl: siteURL,
        html: `<!DOCTYPE html>
          <html>
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/vditor@3.8.6/dist/index.css"
              />
            </head>
          
            <body>
              <script src="https://cdn.jsdelivr.net/npm/vditor@3.8.6/dist/index.min.js"></script>
              <div id="vditor" />
              <script type="application/javascript">
                window.vd = new Vditor("vditor", {
                  icon: "material",
                  height: window.innerHeight / 2,
                  width: "100%",
                  placeholder: "Type here",
                  upload: {
                    url: "${siteURL}/uploads.json",
                    headers: {
                      "User-Api-Key": "${apiKey}",
                      "User-Api-Client-Id": "${clientId}",
                      "User-Agent": "${userAgent}",
                    },
                    multiple: false,
                    extraData: { type: "composer" },
                    fieldName: "files[]",
                    format(f, res) {
                      const parsedRes = JSON.parse(res);
                      return JSON.stringify({
                        msg: "",
                        code: 0,
                        data: {
                          errFiles: [],
                          succMap: {
                            [parsedRes.original_filename]: parsedRes.url,
                          },
                        },
                      });
                    },
                  },
                  cache: { enable: false },
                  after: () => {
                    const btns = Array.from(document.querySelectorAll("button"));
                    btns
                      .find(
                        (btn) =>
                          btn.attributes["data-type"] &&
                          btn.attributes["data-type"].textContent === "fullscreen"
                      )
                      .dispatchEvent(new CustomEvent("click"));
                  },
                });
              </script>
            </body>
          </html>`,
      }}
    />
  );
};

export default Editor;
