type ScreenPropsList = {
  Home: undefined;
  Login: undefined;
  Splash: undefined;
  Topic: { topicID: number; title: string };
  Editor: { topicId: number; title: string; replyToPostNumber: number };
};

export default ScreenPropsList;
