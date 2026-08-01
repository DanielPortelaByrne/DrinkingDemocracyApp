import { ImageSourcePropType } from "react-native";
import { GameMode, PLAYED_PROMPT_KEYS } from "../promptTypes";

const CATEGORY_ALIASES: Record<string, string> = {
  "DÚSHLÁN": "CHALLENGE",
  "RIALACHÁN": "RULE",
  "VÍREAS": "VIRUS",
  "DEIREADH AN VÍREAS": "VIRUS END",
  "GABH I SÍORRÚD É": "GET IT DOWN YA",
  "CEISTEACHÁN": "QUIZ",
  "VÓTA": "VOTE",
  "GNÉASÚIL": "SEXY",
  // Handle values cached by older builds with broken UTF-8 decoding.
  "DÃŠSHLÃN": "CHALLENGE",
  "RIALACHÃN": "RULE",
  "VÃREAS": "VIRUS",
  "DEIREADH AN VÃREAS": "VIRUS END",
  "GABH I SÃORRÃšD Ã‰": "GET IT DOWN YA",
  "CEISTEACHÃN": "QUIZ",
  "VÃ“TA": "VOTE",
  "GNÃ‰ASÃšIL": "SEXY",
};

export const normalizeCategory = (category: string) =>
  CATEGORY_ALIASES[category] ?? category;

const categoryImages: Record<string, ImageSourcePropType> = {
  CHALLENGE: require("../../assets/images/CHALLENGE.png"),
  RULE: require("../../assets/images/RULE.png"),
  VIRUS: require("../../assets/images/VIRUS.png"),
  "VIRUS END": require("../../assets/images/VIRUS.png"),
  "GET IT DOWN YA": require("../../assets/images/GIDY.png"),
  QUIZ: require("../../assets/images/VOTE.png"),
  VOTE: require("../../assets/images/VOTE.png"),
  SEXY: require("../../assets/images/SEXY.png"),
};

export const getCategoryAssets = () => ({ categoryImages });

const colorsByMode: Record<
  Exclude<GameMode, "personalisedGamePrompts">,
  Record<string, string>
> = {
  prinkGamePrompts: {
    CHALLENGE: "#d70057",
    RULE: "#8e0045",
    VIRUS: "#008e72",
    "VIRUS END": "#008e72",
    "GET IT DOWN YA": "#00badc",
    QUIZ: "#00428f",
    VOTE: "#00428f",
    SEXY: "#008e72",
  },
  crazyGamePrompts: {
    CHALLENGE: "#e39600",
    RULE: "#964cad",
    VIRUS: "#fa563c",
    "VIRUS END": "#fa563c",
    "GET IT DOWN YA": "#2e2f48",
    QUIZ: "#162a30",
    VOTE: "#162a30",
    SEXY: "#fa563c",
  },
  flirtyGamePrompts: {
    CHALLENGE: "#e97e74",
    RULE: "#fcad8e",
    VIRUS: "#57316b",
    "VIRUS END": "#57316b",
    "GET IT DOWN YA": "#575a8d",
    QUIZ: "#bd2841",
    VOTE: "#fc8759",
    SEXY: "#ba3564",
  },
};

export const getGameModeAssets = (gameMode: GameMode) => ({
  categoryColors:
    gameMode === "personalisedGamePrompts"
      ? colorsByMode.prinkGamePrompts
      : colorsByMode[gameMode],
  playedArray: PLAYED_PROMPT_KEYS[gameMode],
});
