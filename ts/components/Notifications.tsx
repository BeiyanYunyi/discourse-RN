import React from "react";
import { FlatList } from "react-native";
import { Avatar, Card, Text, useTheme } from "react-native-paper";
import appI18n from "../i18n/controller";
import { initNotifications } from "../redux/notificationReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { NotificationType } from "../types/NotificationType";
import formatTime from "../utils/formatTime";
import getKeyFromValue from "../utils/getKeyFromValue";

const NotificationIcon = (props: { type: string }) => {
  const theme = useTheme();
  const iconName = (() => {
    switch (props.type) {
      case "group_message_summary":
        return "account-group";
      case "replied":
        return "reply";
      case "posted":
        return "reply";
      case "liked":
        return "cards-heart";
      case "private_message":
        return "email";
      case "invitee_accepted":
        return "account-check";
      case "quoted":
        return "format-quote-close";
      default:
        return "email";
    }
  })();
  return (
    <Avatar.Icon
      icon={iconName}
      {...props}
      style={{ backgroundColor: theme.colors.accent }}
    />
  );
};

const Notification = ({ notification }: { notification: NotificationType }) => {
  const notificationTypes = useAppSelector(
    (state) => state.siteInfo.notificationTypes
  );
  return (
    <Card style={{ margin: 5, marginBottom: 0 }}>
      <Card.Title
        left={(props) => (
          <NotificationIcon
            {...props}
            type={
              getKeyFromValue(
                notificationTypes,
                notification.notification_type
              )!
            }
          />
        )}
        title={
          (notification.data.display_username ||
            notification.data.group_name ||
            "") +
          appI18n.t(
            getKeyFromValue(notificationTypes, notification.notification_type)!
          )
        }
        subtitle={formatTime(notification.created_at)}
      />
      <Card.Content>
        <Text>{JSON.stringify(notification, null, 2)}</Text>
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
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default Notifications;
