import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  GestureResponderEvent,
  ImageBackground,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { gameOneScreenStyles } from "../assets/styles/styles";
import { getNames } from "../components/nameStore";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { addPlayer } from "../utils/addPlayer";
import {
  getGameModeAssets,
  normalizeCategory,
} from "../utils/language/getCategoryAssets";
import { useLanguage } from "../utils/language/useLanguage";
import { Prompt } from "../utils/promptTypes";
import { retrievePlayed, retrievePrompts } from "../utils/retrievePrompts";
import { shuffle } from "../utils/selectRandomPrompts";
import {
  SHORT_MESSAGE_DURATION_MS,
  showMessage,
} from "../utils/showMessage";

type DisplayedPrompt = {
  name: string;
  prompt: string;
  color: string;
  category: string;
  handle: string;
};

const replacePlayerNames = (
  text: string,
  names: [string, string, string]
) =>
  text
    .replace(/\[Name3\]/g, names[2])
    .replace(/\[Name2\]/g, names[1])
    .replace(/\[Name\]/g, names[0]);

export default function GameOneScreen({
  route,
  navigation,
}: RootTabScreenProps<"GameOne">) {
  const { gameMode, language, categoryImages } = route.params;
  const { categoryColors, playedArray } = useMemo(
    () => getGameModeAssets(gameMode),
    [gameMode]
  );
  const {
    addRuleButtonText,
    addRuleFieldText,
    addRuleButton2Text,
    addRuleToastText,
    addPlayerButtonText,
    addPlayerFieldText,
    addPlayerButton2Text,
    addPlayerToastText,
    firstCardText,
    quitGameTitle,
    quitGameText,
    quitGameOpt1,
    quitGameOpt2,
  } = useLanguage(language);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const history = useRef<DisplayedPrompt[]>([]);
  const historyIndex = useRef(-1);
  const isLoadingPrompt = useRef(false);
  const lastFirstCardMessageAt = useRef(0);

  const [randomPrompt, setRandomPrompt] = useState("");
  const [promptHandle, setPromptHandle] = useState("");
  const [randomCategory, setRandomCategory] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#131313");
  const [currentCategory, setCurrentCategory] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isPlayerOverlayVisible, setIsPlayerOverlayVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [newRule, setNewRule] = useState("");
  const [newPlayerName, setNewPlayerName] = useState("");

  const shake = useCallback(() => {
    shakeAnim.stopAnimation();
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        duration: 60,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        duration: 60,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [shakeAnim]);

  const displayHistoryItem = useCallback(
    (item: DisplayedPrompt) => {
      setRandomPrompt(item.prompt);
      setRandomCategory(item.category);
      setBackgroundColor(item.color);
      setCurrentCategory(item.category);
      setPromptHandle(item.handle);
      shake();
    },
    [shake]
  );

  const displayRandomPromptAndName = useCallback(async () => {
    if (isLoadingPrompt.current) return;
    isLoadingPrompt.current = true;

    try {
      const [selectedPrompts, playedPrompts] = await Promise.all([
        retrievePrompts(gameMode),
        retrievePlayed(playedArray),
      ]);

      if (!selectedPrompts.length) {
        navigation.navigate("GameOver", { language });
        return;
      }

      const availableNames = getNames().filter(Boolean);
      if (!availableNames.length) {
        navigation.navigate("TabOne");
        return;
      }

      const chosenNames = shuffle(availableNames).slice(0, 3);
      const names: [string, string, string] = [
        chosenNames[0],
        chosenNames[1] ?? chosenNames[0],
        chosenNames[2] ?? chosenNames[0],
      ];
      const prompt: Prompt = { ...selectedPrompts[0] };
      const remainingPrompts = selectedPrompts.slice(1).map((item) => ({
        ...item,
      }));
      const canonicalCategory = normalizeCategory(prompt.category);

      if (
        canonicalCategory === "VIRUS" &&
        prompt.id?.endsWith("a")
      ) {
        const matchingEndId = `${prompt.id.slice(0, -1)}b`;
        const matchingEnd = remainingPrompts.find(
          (candidate) => candidate.id === matchingEndId
        );
        if (matchingEnd) {
          matchingEnd.text = replacePlayerNames(matchingEnd.text, names);
        }
      }

      await Promise.all([
        AsyncStorage.setItem(
          playedArray,
          JSON.stringify([
            ...playedPrompts,
            { text: prompt.text, category: prompt.category },
          ])
        ),
        AsyncStorage.setItem(gameMode, JSON.stringify(remainingPrompts)),
      ]);

      const displayedPrompt: DisplayedPrompt = {
        name: names[0],
        prompt: replacePlayerNames(prompt.text, names),
        color: categoryColors[canonicalCategory] ?? "#131313",
        category: prompt.category,
        handle: (prompt.handle ?? "").replace(/^@/, ""),
      };

      history.current = [...history.current, displayedPrompt];
      historyIndex.current = history.current.length - 1;
      displayHistoryItem(displayedPrompt);
    } catch (error) {
      console.error("Unable to display prompt", error);
      navigation.navigate("GameOver", { language });
    } finally {
      isLoadingPrompt.current = false;
    }
  }, [
    categoryColors,
    displayHistoryItem,
    gameMode,
    language,
    navigation,
    playedArray,
  ]);

  useEffect(() => {
    void displayRandomPromptAndName();
  }, [displayRandomPromptAndName]);

  const showPreviousPrompt = () => {
    if (historyIndex.current <= 0) {
      const now = Date.now();
      if (
        now - lastFirstCardMessageAt.current <
        SHORT_MESSAGE_DURATION_MS
      ) {
        return;
      }

      lastFirstCardMessageAt.current = now;
      showMessage(firstCardText);
      return;
    }

    historyIndex.current -= 1;
    displayHistoryItem(history.current[historyIndex.current]);
  };

  const showNextPrompt = () => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current += 1;
      displayHistoryItem(history.current[historyIndex.current]);
      return;
    }

    void displayRandomPromptAndName();
  };

  const handleCardPress = (event: GestureResponderEvent) => {
    if (isEditVisible || isOverlayVisible || isPlayerOverlayVisible) {
      setIsOverlayVisible(false);
      setIsPlayerOverlayVisible(false);
      setIsEditVisible(false);
      return;
    }

    const side =
      event.nativeEvent.locationX < Dimensions.get("window").width / 2
        ? "left"
        : "right";
    if (side === "left") showPreviousPrompt();
    else showNextPrompt();
  };

  const addCustomRule = async () => {
    const rule = newRule.trim();
    if (!rule) {
      showMessage(addRuleFieldText);
      return;
    }

    const storedPrompts = await retrievePrompts(gameMode);
    const randomIndex = Math.floor(Math.random() * (storedPrompts.length + 1));
    storedPrompts.splice(randomIndex, 0, { text: rule, category: "RULE" });
    await AsyncStorage.setItem(gameMode, JSON.stringify(storedPrompts));
    setNewRule("");
    showMessage(addRuleToastText);
    setIsOverlayVisible(false);
    setIsEditVisible(false);
  };

  const addNewPlayer = async () => {
    const playerName = newPlayerName.trim();
    if (!playerName) {
      showMessage(addPlayerFieldText);
      return;
    }

    await addPlayer(playerName);
    setNewPlayerName("");
    showMessage(addPlayerToastText);
    setIsPlayerOverlayVisible(false);
    setIsEditVisible(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleCardPress}
      style={[
        gameOneScreenStyles.container as StyleProp<ViewStyle>,
        { backgroundColor },
      ]}
    >
      <ImageBackground
        source={categoryImages[normalizeCategory(currentCategory)]}
        style={gameOneScreenStyles.image as StyleProp<ViewStyle>}
      >
        {isEditVisible && (
          <>
            <TouchableOpacity
              onPress={() => setIsOverlayVisible((visible) => !visible)}
              style={gameOneScreenStyles.ruleButton as StyleProp<ViewStyle>}
            >
              <Text style={gameOneScreenStyles.veryBoldText}>
                {addRuleButtonText}
              </Text>
            </TouchableOpacity>
            {isOverlayVisible && (
              <View style={gameOneScreenStyles.overlay as StyleProp<ViewStyle>}>
                <TextInput
                  onChangeText={setNewRule}
                  placeholder={addRuleFieldText}
                  placeholderTextColor="#666666"
                  style={gameOneScreenStyles.textInput as StyleProp<ViewStyle>}
                  value={newRule}
                />
                <TouchableOpacity
                  onPress={() => void addCustomRule()}
                  style={
                    gameOneScreenStyles.submitButton as StyleProp<ViewStyle>
                  }
                >
                  <Text style={gameOneScreenStyles.submitButtonText}>
                    {addRuleButton2Text}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              onPress={() =>
                setIsPlayerOverlayVisible((visible) => !visible)
              }
              style={gameOneScreenStyles.playerButton as StyleProp<ViewStyle>}
            >
              <Text style={gameOneScreenStyles.veryBoldText}>
                {addPlayerButtonText}
              </Text>
            </TouchableOpacity>
            {isPlayerOverlayVisible && (
              <View style={gameOneScreenStyles.overlay as StyleProp<ViewStyle>}>
                <TextInput
                  onChangeText={setNewPlayerName}
                  placeholder={addPlayerFieldText}
                  placeholderTextColor="#666666"
                  style={gameOneScreenStyles.textInput as StyleProp<ViewStyle>}
                  value={newPlayerName}
                />
                <TouchableOpacity
                  onPress={() => void addNewPlayer()}
                  style={
                    gameOneScreenStyles.submitButton as StyleProp<ViewStyle>
                  }
                >
                  <Text style={gameOneScreenStyles.submitButtonText}>
                    {addPlayerButton2Text}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        <View
          style={
            gameOneScreenStyles.topLeftButtonContainer as StyleProp<ViewStyle>
          }
        >
          <TouchableOpacity
            onPress={() =>
              Alert.alert(quitGameTitle, quitGameText, [
                {
                  text: quitGameOpt1,
                  onPress: () => navigation.navigate("TabTwo", { language }),
                },
                { text: quitGameOpt2, style: "cancel" },
              ])
            }
            style={gameOneScreenStyles.topLeftButton as StyleProp<ViewStyle>}
          >
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View
          style={
            gameOneScreenStyles.topRightButtonContainer as StyleProp<ViewStyle>
          }
        >
          <TouchableOpacity
            onPress={() => setIsEditVisible((visible) => !visible)}
            style={gameOneScreenStyles.topRightButton as StyleProp<ViewStyle>}
          >
            <MaterialIcons name="add" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {!!randomCategory.trim() && (
          <Text
            style={gameOneScreenStyles.categoryText as StyleProp<TextStyle>}
          >
            {randomCategory}
          </Text>
        )}

        <Animated.Text
          style={{
            color: "#fff",
            fontFamily: "Mosh",
            fontSize: 35,
            marginBottom: 10,
            marginLeft: 30,
            marginRight: 30,
            textAlign: "center",
            textShadowColor: "#000",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 10,
            transform: [
              {
                translateX: shakeAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 10, 0],
                }),
              },
            ],
          }}
        >
          {randomPrompt}
        </Animated.Text>

        {!!promptHandle && (
          <Animated.Text
            style={{
              bottom: 50,
              color: "#fff",
              fontSize: 14,
              fontStyle: "italic",
              fontWeight: "bold",
              position: "absolute",
              transform: [
                {
                  translateX: shakeAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 10, 0],
                  }),
                },
              ],
            }}
          >
            Submitted by @{promptHandle}
          </Animated.Text>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}
