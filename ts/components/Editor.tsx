import { useNavigation } from "@react-navigation/core";
import React from "react";
import { IconButton } from "react-native-paper";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import config from "../config/config";
import {
  PostEditorScreenNavigationProp,
  TopicEditorScreenNavigationProp,
} from "../types/ScreenNavigationProps";
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="send"
          onPress={() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            webRef.current?.injectJavaScript(
              "window.vd.clearCache();window.ReactNativeWebView.postMessage(window.vd.getValue());true;"
            );
          }}
        />
      ),
    });
  });
  const siteURL = config.url;
  const { clientId, userAgent } = config;
  const apiKey = apiKeyWrapper.key;
  return (
    <WebView
      ref={webRef}
      originWhitelist={["*"]}
      onMessage={onMessage}
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
                typewriterMode: true,
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
                after: () => {
                  vd.setTheme("dark", "dark");
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
