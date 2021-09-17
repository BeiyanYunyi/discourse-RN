import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import NotificationResType from "../types/NotificationType";
import discourseWrapper from "../wrapper/discourseWrapper";

const NotificationScreen = () => {
  const [notifications, setNotifications] =
    React.useState<NotificationResType>();
  React.useEffect(() => {
    discourseWrapper.getNotifications().then((res) => setNotifications(res));
  }, []);
  return (
    <ScrollView>
      <Text>{JSON.stringify(notifications, null, 2)}</Text>
    </ScrollView>
  );
};

export default NotificationScreen;
