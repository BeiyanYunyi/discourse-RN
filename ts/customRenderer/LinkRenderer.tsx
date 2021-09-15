import { useNavigation } from "@react-navigation/core";
import React from "react";
import { CustomBlockRenderer } from "react-native-render-html";

const LinkRenderer: CustomBlockRenderer = ({ TDefaultRenderer, ...props }) => {
  const navigation = useNavigation();
  return <TDefaultRenderer {...props} />;
};

export default LinkRenderer;
