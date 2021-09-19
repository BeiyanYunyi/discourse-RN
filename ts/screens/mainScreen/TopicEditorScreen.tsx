import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import {
  Button,
  Caption,
  Card,
  Divider,
  IconButton,
  Subheading,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Editor from "../../components/Editor";
import appI18n from "../../i18n/controller";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addTopicToTop } from "../../redux/topicsReducer";
import { TopicEditorScreenNavigationProp } from "../../types/ScreenNavigationProps";
import { CategoryType } from "../../types/SiteInfo";
import CustomedToast from "../../utils/CustomedToast";
import discourseWrapper from "../../wrapper/discourseWrapper";

const CategorySelector = React.forwardRef((_props, ref) => {
  const categories = useAppSelector((state) => state.siteInfo.categories);

  const [category, setCategory] = React.useState<CategoryType>(
    categories.find((item) => item.id === 1)!
  );
  const [visible, setVisible] = React.useState(false);
  const { height, width } = useWindowDimensions();

  React.useImperativeHandle(ref, () => ({ category }));

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const renderCategories = ({ item }: { item: CategoryType }) => {
    return (
      <>
        <TouchableRipple
          onPress={() => {
            setCategory(item);
            hideModal();
          }}
          style={{ marginTop: 5 }}
        >
          <Card>
            <Card.Title title={item.name} />
            <Card.Content>
              <Caption>{item.description_excerpt}</Caption>
            </Card.Content>
          </Card>
        </TouchableRipple>
        <Divider />
      </>
    );
  };

  if (!visible) {
    return (
      <Button icon="dots-vertical" onPress={showModal}>
        <Subheading>{category.name}</Subheading>
      </Button>
    );
  }
  return (
    <>
      <View style={{ width, alignItems: "center" }}>
        <IconButton icon="close" onPress={hideModal} animated />
      </View>
      <SafeAreaView style={{ maxHeight: height / 4 }}>
        <FlatList
          data={categories}
          renderItem={renderCategories}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </>
  );
});

const TopicTitle = React.forwardRef((_props, ref) => {
  const [title, setTitle] = React.useState("");
  React.useImperativeHandle(ref, () => {
    return { title };
  });
  return (
    <>
      <TextInput
        dense
        mode="outlined"
        label="title"
        onChangeText={(text) => setTitle(text)}
        value={title}
        style={{ marginBottom: 16 }}
      />
    </>
  );
});

const TopicEditorScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<TopicEditorScreenNavigationProp>();
  const titleRef = React.useRef<{ title: string }>();
  const categoryRef = React.useRef<{ category: CategoryType }>();

  return (
    <>
      <CategorySelector ref={categoryRef} />
      <TopicTitle ref={titleRef} />
      <Editor
        onMessage={async (msg) => {
          if (titleRef.current?.title) {
            const data = await discourseWrapper.createTopic(
              msg.nativeEvent.data,
              titleRef.current?.title,
              categoryRef.current?.category.id
            );
            dispatch(addTopicToTop(data));
            navigation.goBack();
          } else {
            CustomedToast({ message: appI18n.t("pleaseInputTopic") });
          }
        }}
      />
    </>
  );
};

export default TopicEditorScreen;
