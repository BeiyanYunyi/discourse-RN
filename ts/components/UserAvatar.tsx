import { Avatar } from "react-native-paper";
import React from "react";
import config from "../config/config";
import discourseWrapper from "../wrapper/discourseWrapper";

const UserAvatar = ({
  avatarAddr,
  size,
}: {
  avatarAddr: string;
  size: number;
}) => {
  return (
    <Avatar.Image
      size={size}
      source={{
        uri: discourseWrapper.getAvatarAddr(avatarAddr),
        headers: { "User-Agent": config.userAgent },
      }}
    />
  );
};

export default UserAvatar;
