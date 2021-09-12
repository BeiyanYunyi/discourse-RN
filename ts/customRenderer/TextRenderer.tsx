import React from "react";
import { useTheme } from "react-native-paper";
import { CustomBlockRenderer } from "react-native-render-html";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TextRenderer: CustomBlockRenderer = ({ TDefaultRenderer, ...props }) => {
  const { colors } = useTheme();
  return (
    <TDefaultRenderer
      {...props}
      textProps={{
        selectable: true,
        style: { color: colors.text },
      }}
    />
  );
};

export default TextRenderer;
