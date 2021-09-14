import { DarkTheme } from "react-native-paper";
import Toast from "react-native-root-toast";

const CustomedToast = ({ message }: { message: string }) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    textColor: DarkTheme.colors.text,
    backgroundColor: DarkTheme.colors.background,
    shadowColor: DarkTheme.colors.notification,
  });
};

export default CustomedToast;
