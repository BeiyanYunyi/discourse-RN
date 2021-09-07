import UserType from "./UserType";
import TopicType from "./TopicType";

export default interface TopicsListType {
  users: UserType[];
  topics: TopicType[];
  nextPage: number;
}
