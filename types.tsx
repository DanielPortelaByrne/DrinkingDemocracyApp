/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

interface CategoryImages {
  [category: string]: any; // Change 'any' to the actual type of image paths if known
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  TabOne: undefined;
  TabTwo: {
    language: string;
  };
  GameOne: {
    gameMode: string;
    language: string;
  };
  PromptSubmit: {
    language: string;
  };
  PersonalisedGame: undefined;
  GameOver: {
    language: string;
  };
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: {
    language: string;
  };
  GameOne: {
    gameMode: string;
    language: string;
    categoryImages: CategoryImages;
  };
  PromptSubmit: {
    language: string;
  };
  PersonalisedGame: undefined;
  GameOver: {
    language: string;
  };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
