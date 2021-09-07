import TopicType from "./TopicType";
import UserType from "./UserType";

export default interface GetTopicResType {
  users: UserType[];
  topic_list: {
    can_create_topic: boolean;
    more_topics_url: string;
    per_page: number;
    top_tags: string[];
    topics: TopicType[];
  };
}
