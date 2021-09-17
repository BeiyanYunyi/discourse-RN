interface NotificationType {
  id: number;
  user_id: number;
  notification_type: number;
  read: boolean;
  created_at: string;
  post_number: string;
  topic_id: number;
  slug: string;
  data: {
    badge_id: number;
    badge_name: string;
    badge_slug: string;
    badge_title: true;
    username: string;
  };
}

interface NotificationResType {
  notifications: NotificationType[];
  total_rows_notifications: number;
  seen_notification_id: number;
  load_more_notifications: string;
}

export default NotificationResType;
