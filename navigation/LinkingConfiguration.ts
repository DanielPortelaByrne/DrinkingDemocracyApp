import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      TabOne: "",
      TabTwo: "games",
      PersonalisedGame: "personalise",
      PromptSubmit: "submit-prompt",
      NotFound: "*",
    },
  },
};

export default linking;
