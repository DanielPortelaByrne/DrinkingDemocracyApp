import {
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
  Animated,
  ImageBackground,
  ViewStyle,
  StyleProp,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames, updateNames } from "../components/nameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { gameOneScreenStyles } from "../assets/styles/styles";
import { useLanguage } from "../utils/language/useLanguage";
import { retrievePrompts, retrievePlayed } from "../utils/retrievePrompts";
import { addPlayer } from "../utils/addPlayer";
import React from "react";
import { getGameModeAssets } from "../utils/language/getCategoryAssets";

export default function GameOneScreen({
  route,
  navigation,
}: RootTabScreenProps<"GameOne">) {
  const { gameMode, language, categoryImages } = route.params;
  const { categoryColors, playedArray } = getGameModeAssets(gameMode);
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
    Mosh: require("../assets/fonts/Mosherif-1GezZ.ttf"),
  });

  const {
    addRuleButtonText,
    addRuleFieldText,
    addRuleButton2Text,
    newRuleTitle,
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
    setLanguage,
  } = useLanguage();

  useEffect(() => {
    setLanguage(language);
    if (!fontsLoaded) {
      return undefined;
    }
  });

  // Initialize the shake animation value
  const shakeAnim = new Animated.Value(0);

  // Set up the shake animation
  let shakeIteration = 0;
  const shake = () => {
    shakeAnim.setValue(0);
    Animated.timing(shakeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        shakeIteration++;
        if (shakeIteration < 1) {
          shake();
        } else {
          shakeIteration = 0;
          shakeAnim.setValue(0);
        }
      }
    });
  };

  useEffect(() => {
    shake();
    displayRandomPromptAndName();
  }, []);

  const names = getNames(); // retrieve the names from the name store
  const [randomName, setRandomName] = useState("");
  const [randomPrompt, setRandomPrompt] = useState("");
  let handle = "";
  const [promptHandle, setPromptHandle] = useState("");
  const [randomCategory, setRandomCategory] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#fff"); // Add a state to store the background color
  const [shouldNavigate] = useState(false);
  const [previousPrompts, setPreviousPrompts] = useState<
    {
      name: string;
      prompt: string;
      color: string;
      category: string;
      handle: string;
    }[]
  >([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isPlayerOverlayVisible, setIsPlayerOverlayVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [newRule, setNewRule] = useState("");
  const [isQuitOverlayVisible, setIsQuitOverlayVisible] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");

  const arrayIndex = useRef(0);
  var index = 0;
  // Define a new state variable to store the background image
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    shake();
  }, [randomName, randomPrompt]);

  const getRandomIndexes = (names: string[], count: number) => {
    const chosenIndexes = new Set<number>();
    while (chosenIndexes.size < count) {
      chosenIndexes.add(Math.floor(Math.random() * names.length));
    }
    return Array.from(chosenIndexes);
  };

  const displayRandomPromptAndName = async () => {
    // Retrieve the prompts from async storage
    const [selectedPrompts, playedPrompts] = await Promise.all([
      retrievePrompts(gameMode),
      retrievePlayed(playedArray),
    ]);

    // Start the shake animation
    shake();

    // Check if there are any prompts left to display
    if (selectedPrompts.length > 0) {
      const prompt = selectedPrompts[index];
      const newlyPlayedPrompt = {
        text: prompt.text,
        category: prompt.category,
      };

      // Add the new prompt to the existing array of played prompts
      const updatedPlayedPrompts = [...playedPrompts, newlyPlayedPrompt];
      await AsyncStorage.setItem(
        playedArray,
        JSON.stringify(updatedPlayedPrompts)
      );

      // Save the category of the prompt
      const { category }: { category: keyof typeof categoryColors } = prompt;
      setCurrentCategory(category);

      // Get three unique random indexes
      const chosenIndexes = getRandomIndexes(names, Math.min(3, names.length));
      const [name, name2, name3] = chosenIndexes.map((index) => names[index]);

      // Update virus prompt if necessary
      if (prompt.category === "VIRUS" && prompt.id.slice(-1) === "a") {
        const currentVirusID = prompt.id.slice(0, -1);
        for (let i = index + 1; i < selectedPrompts.length; i++) {
          if (selectedPrompts[i].id === currentVirusID + "b") {
            selectedPrompts[i].text = selectedPrompts[i].text
              .replace("[Name]", name)
              .replace("[Name2]", name2);
            break;
          }
        }
      }

      // Update the random name text
      setRandomName(name);

      const color = categoryColors[category];
      selectedPrompts.splice(index, 1);

      // Store the updated list of prompts in async storage
      await AsyncStorage.setItem(gameMode, JSON.stringify(selectedPrompts));

      // Replace placeholders in the prompt text
      const replacements = [
        { search: "[Name]", replace: name },
        { search: "[Name2]", replace: name2 },
      ];
      if (name3) replacements.push({ search: "[Name3]", replace: name3 });

      replacements.forEach(({ search, replace }) => {
        if (prompt.text.includes(search)) {
          prompt.text = prompt.text.replace(search, replace);
        }
      });

      // Update the random prompt text and other states
      setRandomPrompt(prompt.text);
      setRandomCategory(category);
      setBackgroundColor(color);
      setCurrentCategory(category);
      setPromptHandle(prompt.handle || "");
      if (prompt.hasOwnProperty("handle")) {
        handle = prompt.handle;
        setPromptHandle(handle);
      }

      // Add the current name, prompt, and color to the previousPrompts array as an object
      setPreviousPrompts([
        ...previousPrompts,
        {
          name,
          prompt: prompt.text,
          color,
          category,
          handle,
        },
      ]);
      arrayIndex.current = previousPrompts.length;
      index++;
    } else {
      // If there are no prompts left to display, navigate back to the TabTwoScreen
      navigation.navigate("GameOver", { language });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        gameOneScreenStyles.container as StyleProp<ViewStyle>,
        { backgroundColor },
      ]}
      onPress={(event: { nativeEvent: { locationX: any } }) => {
        const { locationX } = event.nativeEvent;
        const screenWidth = Dimensions.get("window").width;
        if (!isEditVisible && !isOverlayVisible && !isPlayerOverlayVisible) {
          const side = locationX < screenWidth / 2 ? "left" : "right";

          if (side === "left") {
            if (arrayIndex.current > 0) {
              const lastPrompt = previousPrompts[arrayIndex.current - 1];
              setRandomName(lastPrompt.name);
              setRandomPrompt(lastPrompt.prompt);
              setRandomCategory(lastPrompt.category);
              setBackgroundColor(lastPrompt.color);
              setCurrentCategory(lastPrompt.category);
              setPromptHandle(lastPrompt.handle);
              arrayIndex.current--;
            } else {
              ToastAndroid.show(firstCardText, ToastAndroid.SHORT);
            }
          } else {
            if (arrayIndex.current == previousPrompts.length - 1) {
              displayRandomPromptAndName();
            } else {
              const nextPrompt = previousPrompts[arrayIndex.current + 1];
              setRandomName(nextPrompt.name);
              setRandomPrompt(nextPrompt.prompt);
              setRandomCategory(nextPrompt.category);
              setBackgroundColor(nextPrompt.color);
              setCurrentCategory(nextPrompt.category);
              setPromptHandle(nextPrompt.handle);
              arrayIndex.current++;
            }
            if (shouldNavigate) {
              navigation.navigate("GameOver", { language });
            }
          }
        } else {
          setIsOverlayVisible(false);
          setIsPlayerOverlayVisible(false);
          setIsEditVisible(false);
        }
      }}
    >
      <ImageBackground
        style={gameOneScreenStyles.image as StyleProp<ViewStyle>}
        source={categoryImages[currentCategory]}
      >
        {isEditVisible && (
          <>
            <TouchableOpacity
              style={gameOneScreenStyles.ruleButton as StyleProp<ViewStyle>}
              onPress={() => setIsOverlayVisible(!isOverlayVisible)}
            >
              <Text style={gameOneScreenStyles.veryBoldText}>
                {addRuleButtonText}
              </Text>
            </TouchableOpacity>
            {isOverlayVisible && (
              <View style={gameOneScreenStyles.overlay as StyleProp<ViewStyle>}>
                <TextInput
                  style={gameOneScreenStyles.textInput as StyleProp<ViewStyle>}
                  placeholder={addRuleFieldText}
                  onChangeText={(text: any) => setNewRule(text)}
                  value={newRule}
                />
                <TouchableOpacity
                  style={
                    gameOneScreenStyles.submitButton as StyleProp<ViewStyle>
                  }
                  onPress={async () => {
                    // Retrieve the selected prompts from async storage
                    const selectedPrompts = await AsyncStorage.getItem(
                      gameMode
                    );
                    // Convert the selected prompts string back to an array
                    const promptsArray = selectedPrompts
                      ? JSON.parse(selectedPrompts)
                      : [];
                    // Generate a random index between 0 and the length of the array
                    const randomIndex = Math.floor(
                      Math.random() * (promptsArray.length + 1)
                    );
                    // Use the splice method to insert the new rule at the random index
                    promptsArray.splice(randomIndex, 0, {
                      text: newRule,
                      category: newRuleTitle,
                    });
                    await AsyncStorage.setItem(
                      gameMode,
                      JSON.stringify(promptsArray)
                    );
                    // Reset the new rule input and close the overlay
                    setNewRule("");
                    // Display a message to the user to confirm that the new rule has been added
                    ToastAndroid.show(addRuleToastText, ToastAndroid.SHORT);
                    setIsOverlayVisible(false);
                    setIsEditVisible(false);
                  }}
                >
                  <Text style={gameOneScreenStyles.submitButtonText}>
                    {addRuleButton2Text}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={gameOneScreenStyles.playerButton as StyleProp<ViewStyle>}
              onPress={() => setIsPlayerOverlayVisible(!isPlayerOverlayVisible)}
            >
              <Text style={gameOneScreenStyles.veryBoldText}>
                {addPlayerButtonText}
              </Text>
            </TouchableOpacity>
            {isPlayerOverlayVisible && (
              <View style={gameOneScreenStyles.overlay as StyleProp<ViewStyle>}>
                <TextInput
                  style={gameOneScreenStyles.textInput as StyleProp<ViewStyle>}
                  placeholder={addPlayerFieldText}
                  onChangeText={(text: any) => setNewPlayerName(text)}
                  value={newPlayerName}
                />
                <TouchableOpacity
                  style={
                    gameOneScreenStyles.submitButton as StyleProp<ViewStyle>
                  }
                  onPress={() => {
                    // Add the new player's name to the name store and update it
                    addPlayer(newPlayerName);
                    // Reset the new player name input and close the overlay
                    setNewPlayerName("");
                    // Display a message to the user to confirm that the new player has been added
                    ToastAndroid.show(addPlayerToastText, ToastAndroid.SHORT);
                    setIsPlayerOverlayVisible(false);
                    setIsEditVisible(false);
                  }}
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
            style={gameOneScreenStyles.topLeftButton as StyleProp<ViewStyle>}
            onPress={() => {
              Alert.alert(
                quitGameTitle,
                quitGameText,
                [
                  {
                    text: quitGameOpt1,
                    onPress: () =>
                      navigation.navigate("TabTwo", {
                        language: language,
                      }),
                  },
                  {
                    text: quitGameOpt2,
                    onPress: () => setIsQuitOverlayVisible(false),
                  },
                ],
                { cancelable: true }
              );
            }}
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
            style={gameOneScreenStyles.topRightButton as StyleProp<ViewStyle>}
            onPress={() => setIsEditVisible(!isEditVisible)}
          >
            <MaterialIcons name="add" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {randomCategory !== " " && (
          <Text
            style={gameOneScreenStyles.categoryText as StyleProp<ViewStyle>}
          >
            {randomCategory}
          </Text>
        )}

        <Animated.Text
          style={{
            fontFamily: "Mosh",
            fontSize: 35,
            color: "#fff",
            textAlign: "center",
            marginBottom: 10,
            marginLeft: 30,
            marginRight: 30,
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

        {promptHandle && (
          <Animated.Text
            style={{
              fontSize: 14,
              color: "#fff",
              fontWeight: "bold",
              fontStyle: "italic",
              bottom: 50,
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
