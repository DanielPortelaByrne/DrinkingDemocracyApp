import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";
import { AppLanguage } from "./constants/Languages";
import { GameMode } from "./utils/promptTypes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type CategoryImages = Record<string, ImageSourcePropType>;

export type RootStackParamList = {
  TabOne: undefined;
  TabTwo: { language: AppLanguage };
  GameOne: {
    gameMode: GameMode;
    language: AppLanguage;
    categoryImages: CategoryImages;
  };
  PromptSubmit: { language: AppLanguage };
  PersonalisedGame: { language: AppLanguage };
  GameOver: { language: AppLanguage };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

// Retain the existing name while the app uses a single native-stack navigator.
export type RootTabScreenProps<Screen extends keyof RootStackParamList> =
  RootStackScreenProps<Screen>;
