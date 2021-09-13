type ScreenPropsList = {
  Home: undefined;
  Login: undefined;
  Topic: { topicID: number; title: string; progress?: number };
  PostEditor: { topicId: number; title: string; replyToPostNumber: number };
  TopicEditor: undefined;
};

export default ScreenPropsList;
