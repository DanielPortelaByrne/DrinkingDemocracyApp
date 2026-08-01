import { Alert, Platform, ToastAndroid } from "react-native";

export const SHORT_MESSAGE_DURATION_MS = 2_000;

export const showMessage = (message: string, title = "Drinking Democracy") => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
    return;
  }

  Alert.alert(title, message);
};
