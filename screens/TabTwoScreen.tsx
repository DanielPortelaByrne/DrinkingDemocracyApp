import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  ScrollView,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { screen2Styles } from "../assets/styles/styles";
import { getNames } from "../components/nameStore";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getCategoryAssets } from "../utils/language/getCategoryAssets";
import { useLanguage } from "../utils/language/useLanguage";
import { GameMode } from "../utils/promptTypes";
import { selectRandomPrompts } from "../utils/selectRandomPrompts";
import { showMessage } from "../utils/showMessage";
import { ensurePromptPacks } from "../utils/storePrompts";

const GAME_MODE_GROUP_HEIGHT = 450;
const MINIMUM_GAME_MODE_TOP = 140;
const PLAYER_COLORS = [
  "#f3ce06",
  "#ed6c1e",
  "#ed1e26",
  "#d70057",
  "#964cad",
  "#00badc",
  "#008e72",
  "#fc8759",
] as const;
const PLAYER_ICONS: React.ComponentProps<typeof Ionicons>["name"][] = [
  "beer",
  "wine",
  "flame",
  "flash",
  "star",
  "heart",
  "skull",
  "sparkles",
];

const hashPlayerList = (names: readonly string[]) =>
  names.join("|").split("").reduce(
    (hash, character) =>
      Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0,
    2166136261
  );

export default function TabTwoScreen({
  route,
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const { language } = route.params;
  const { height: windowHeight } = useWindowDimensions();
  const gameModeTop = Math.max(
    MINIMUM_GAME_MODE_TOP,
    (windowHeight - GAME_MODE_GROUP_HEIGHT) / 2
  );
  const { categoryImages } = getCategoryAssets();
  const {
    prinksText,
    crazyText,
    flirtyText,
    sapText,
    title,
    personalisedGameText,
    contentLoadErrorText,
  } = useLanguage(language);
  const [names, setNames] = useState(getNames());
  const [isPreparing, setIsPreparing] = useState(true);
  const playerAvatars = useMemo(() => {
    const activeNames = names.filter(Boolean);
    const seed = hashPlayerList(activeNames);
    const colorOffset = seed % PLAYER_COLORS.length;
    const iconOffset = Math.floor(seed / PLAYER_COLORS.length) % PLAYER_ICONS.length;

    return activeNames.map((name, index) => ({
      color: PLAYER_COLORS[(colorOffset + index) % PLAYER_COLORS.length],
      icon: PLAYER_ICONS[(iconOffset + index * 3) % PLAYER_ICONS.length],
      name,
    }));
  }, [names]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const prepareSessions = async () => {
        if (isActive) {
          setNames(getNames());
          setIsPreparing(true);
        }

        try {
          await ensurePromptPacks(language);
          await selectRandomPrompts();
        } catch (error) {
          console.error("Unable to prepare game sessions", error);
          if (isActive) showMessage(contentLoadErrorText);
        } finally {
          if (isActive) setIsPreparing(false);
        }
      };

      void prepareSessions();
      return () => {
        isActive = false;
      };
    }, [contentLoadErrorText, language])
  );

  const openGame = (gameMode: GameMode) => {
    if (isPreparing) return;
    navigation.navigate("GameOne", {
      gameMode,
      language,
      categoryImages,
    });
  };

  const modes: {
    gameMode: GameMode;
    label: string;
    image: number;
    buttonStyle: StyleProp<ViewStyle>;
  }[] = [
    {
      gameMode: "prinkGamePrompts",
      label: prinksText,
      image: require("../assets/images/prinks.png"),
      buttonStyle: screen2Styles.prinksButton as StyleProp<ViewStyle>,
    },
    {
      gameMode: "crazyGamePrompts",
      label: crazyText,
      image: require("../assets/images/messy.png"),
      buttonStyle: screen2Styles.messyButton as StyleProp<ViewStyle>,
    },
    {
      gameMode: "flirtyGamePrompts",
      label: flirtyText,
      image: require("../assets/images/flirty.png"),
      buttonStyle: screen2Styles.flirtyButton as StyleProp<ViewStyle>,
    },
  ];

  return (
    <View style={screen2Styles.container as StyleProp<ViewStyle>}>
      <View style={screen2Styles.homeButton as StyleProp<ViewStyle>}>
        <TouchableOpacity
          accessibilityLabel="Return home"
          onPress={() => navigation.navigate("TabOne")}
        >
          <Ionicons name="home-outline" size={32} color="#ed1e26" />
        </TouchableOpacity>
      </View>
      <View style={screen2Styles.titleView as StyleProp<ViewStyle>}>
        <Text style={screen2Styles.screenTitle as StyleProp<TextStyle>}>
          {title}
        </Text>
      </View>

      <Image
        resizeMode="contain"
        source={require("../assets/images/chain.png")}
        style={screen2Styles.chainImage as StyleProp<ImageStyle>}
      />
      <Image
        resizeMode="contain"
        source={require("../assets/images/halo_red.png")}
        style={screen2Styles.haloImage as StyleProp<ImageStyle>}
      />

      <ScrollView
        contentContainerStyle={[
          screen2Styles.contentContainer as StyleProp<ViewStyle>,
          { paddingTop: gameModeTop },
        ]}
        style={screen2Styles.contentScroll as StyleProp<ViewStyle>}
      >
        <View style={screen2Styles.gameModesContainer as StyleProp<ViewStyle>}>
          {isPreparing && <ActivityIndicator color="#ed1e26" size="large" />}
          {modes.map((mode) => (
            <View
              key={mode.gameMode}
              style={
                screen2Styles.gameModeSectionContainer as StyleProp<ViewStyle>
              }
            >
              <Image
                resizeMode="contain"
                source={mode.image}
                style={
                  screen2Styles.gameModeSectionImage as StyleProp<ImageStyle>
                }
              />
              <TouchableOpacity
                accessibilityLabel={mode.label}
                disabled={isPreparing}
                onPress={() => openGame(mode.gameMode)}
                style={[
                  screen2Styles.gameModeButton as StyleProp<ViewStyle>,
                  mode.buttonStyle,
                ]}
              >
                <Text
                  style={
                    screen2Styles.gameModeSectionText as StyleProp<TextStyle>
                  }
                >
                  {mode.label}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <View
            style={
              screen2Styles.gameModeSectionContainer as StyleProp<ViewStyle>
            }
          >
            <TouchableOpacity
              disabled={isPreparing}
              onPress={() =>
                navigation.navigate("PersonalisedGame", { language })
              }
              style={[
                screen2Styles.gameModeButton as StyleProp<ViewStyle>,
                screen2Styles.promptSubmitButton as StyleProp<ViewStyle>,
              ]}
            >
              <Text
                style={screen2Styles.promptSubmitText as StyleProp<TextStyle>}
              >
                {personalisedGameText}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={
              screen2Styles.gameModeSectionContainer as StyleProp<ViewStyle>
            }
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("PromptSubmit", { language })}
              style={[
                screen2Styles.gameModeButton as StyleProp<ViewStyle>,
                screen2Styles.promptSubmitButton as StyleProp<ViewStyle>,
              ]}
            >
              <Text
                style={screen2Styles.promptSubmitText as StyleProp<TextStyle>}
              >
                {sapText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={screen2Styles.playerIconsContainer as StyleProp<ViewStyle>}
        >
          <View
            style={
              screen2Styles.playerIconsInnerContainer as StyleProp<ViewStyle>
            }
          >
            {playerAvatars.map((player, index) => (
              <View
                key={`${player.name}-${index}`}
                style={[
                  screen2Styles.playerIconsInnerMostContainer as StyleProp<ViewStyle>,
                  { borderColor: player.color },
                ]}
              >
                <View
                  style={[
                    screen2Styles.playerIconBadge as StyleProp<ViewStyle>,
                    { backgroundColor: player.color },
                  ]}
                >
                  <Ionicons
                    name={player.icon}
                    size={19}
                    color="#111111"
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={screen2Styles.playerIconText as StyleProp<TextStyle>}
                >
                  {player.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
