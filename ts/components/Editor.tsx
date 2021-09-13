import React from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import config from "../config/config";
import apiKeyWrapper from "../wrapper/apiKeyWrapper";

const PostEditor = ({
  onMessage,
}: {
  onMessage: (event: WebViewMessageEvent) => void;
}) => {
  const siteURL = config.url;
  const { clientId, userAgent } = config;
  const apiKey = apiKeyWrapper.key;
  return (
    <WebView
      originWhitelist={["*"]}
      onMessage={onMessage}
      source={{
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
              const vd = new Vditor("vditor", {
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
                toolbar: [
                  "emoji",
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "link",
                  "|",
                  "list",
                  "ordered-list",
                  "check",
                  "outdent",
                  "indent",
                  "|",
                  "quote",
                  "line",
                  "code",
                  "inline-code",
                  "insert-before",
                  "insert-after",
                  "|",
                  "upload",
                  "record",
                  "table",
                  "|",
                  "undo",
                  "redo",
                  "|",
                  "fullscreen",
                  "edit-mode",
                  {
                    name: "more",
                    toolbar: [
                      "both",
                      "code-theme",
                      "content-theme",
                      "export",
                      "outline",
                      "preview",
                      "devtools",
                      "info",
                      "help",
                    ],
                  },
                  "|",
                  "br",
                  {
                    name: "send",
                    tip: "发送",
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
                    click(e) {
                      e.preventDefault();
                      window.ReactNativeWebView.postMessage(vd.getValue());
                    },
                  },
                ],
              });
            </script>
          </body>
        </html>`,
        headers: {
          "User-Api-Key": apiKey,
          "User-Api-Client-Id": clientId,
          "User-Agent": userAgent,
        },
      }}
    />
  );
};

export default PostEditor;
