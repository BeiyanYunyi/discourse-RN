import React from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { initNotifications } from "../redux/notificationReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { NotificationType } from "../types/NotificationType";
import formatTime from "../utils/formatTime";
import getKeyFromValue from "../utils/getKeyFromValue";

const Notification = ({ notification }: { notification: NotificationType }) => {
  const notificationTypes = useAppSelector(
    (state) => state.siteInfo.notificationTypes
  );
  return (
    <Card style={{ margin: 5, marginBottom: 0 }}>
      <Card.Title
        title={getKeyFromValue(
          notificationTypes,
          notification.notification_type
        )}
        subtitle={formatTime(notification.created_at)}
      />
      <Card.Content>
        <Text>{notification.data.topic_title}</Text>
      </Card.Content>
    </Card>
  );
};

const Notifications = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(initNotifications());
  }, [dispatch]);
  const notifications = useAppSelector((state) => state.notifications);
  const renderNotification = ({ item }: { item: NotificationType }) => {
    return <Notification notification={item} />;
  };
  return (
    <FlatList
      data={notifications.notifications}
      renderItem={renderNotification}
    />
  );
};

export default Notifications;
