import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ToastAndroid,
  Animated,
  ImageBackground,
  ViewStyle,
  StyleProp,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import en from "../languages/en.json";
import ga from "../languages/ga.json";
import pl from "../languages/pl.json";
import es from "../languages/es.json";
import { LanguageData } from "../utils/language/LanguageData";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames, updateNames } from "../components/nameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { gameOneScreenStyles } from "../assets/styles/styles";

const languages: { [key: string]: Partial<LanguageData> } = {
  English: en,
  Irish: ga,
  Polish: pl,
  Spanish: es,
};

// Retrieve the prompts from async storage
const retrievePrompts = async (gameModeParam: string) => {
  try {
    // Get the selected prompts string from async storage
    const selectedPromptsString = await AsyncStorage.getItem(gameModeParam);
    // Convert the selected prompts string back to an array
    return selectedPromptsString ? JSON.parse(selectedPromptsString) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const retrievePlayed = async (playedArray: string) => {
  // Retrieve the array of already played prompts
  const playedPrompts = await AsyncStorage.getItem(playedArray);
  // Parse the string into an array of prompts
  const played = playedPrompts ? JSON.parse(playedPrompts) : [];
  // Return the array of prompts
  return played;
};

const addPlayer = async (playerName: string) => {
  // Get the current list of names from async storage
  const names = await getNames();
  // Add the new player's name to the list of names
  names.push(playerName);
  // Update the name store with the new list of names
  await AsyncStorage.setItem("names", JSON.stringify(names));
  const newNames = [...names];
  updateNames(newNames); // update the names in the name store
};

export default function GameOneScreen({
  route,
  navigation,
}: RootTabScreenProps<"GameOne">) {
  const { gameMode, language } = route.params;
  const [addRuleButtonText, setAddRuleButtonText] = useState("ADD A RULE");
  const [addRuleFieldText, setAddRuleFieldText] = useState(
    "Gráinne is a dryshite, drink 15 sips"
  );
  const [addRuleButton2Text, setAddRuleButton2Text] = useState("ADD RULE");
  const [newRuleTitle, setNewRuleTitle] = useState("RULE");
  const [addRuleToastText, setAddRuleToastText] = useState("Rule added!");
  const [addPlayerButtonText, setAddPlayerButtonText] =
    useState("ADD A PLAYER");
  const [addPlayerFieldText, setAddPlayerFieldText] = useState(
    "Enter the new player's name"
  );
  const [addPlayerButton2Text, setAddPlayerButton2Text] =
    useState("ADD PLAYER");
  const [addPlayerToastText, setAddPlayerToastText] = useState("Player added!");
  const [firstCardText, setFirstCardText] = useState(
    "You're at the first card!"
  );
  const [quitGameTitle, setQuitGameTitle] = useState("Quit Game");
  const [quitGameText, setQuitGameText] = useState(
    "Are you sure you want to quit the game?"
  );
  const [quitGameOpt1, setQuitGameOpt1] = useState("Yes");
  const [quitGameOpt2, setQuitGameOpt2] = useState("No");
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
    Mosh: require("../assets/fonts/Mosherif-1GezZ.ttf"),
  });

  useEffect(() => {
    setLanguage(language);
    if (!fontsLoaded) {
      return undefined;
    }
  });

  const setLanguage = async (language: string) => {
    let languageData = languages[language];
    console.log("Reaching new function with language: " + language);

    // If the selected language is not available or not explicitly set, default to English
    if (!languageData) {
      languageData = languages["English"];
    }
    setAddRuleButtonText(languageData.addRuleButtonText || "ADD A RULE");
    setAddRuleFieldText(
      languageData.addRuleFieldText || "Gráinne is a dryshite, drink 15 sips"
    );
    setAddRuleButton2Text(languageData.addRuleButton2Text || "ADD RULE");
    setNewRuleTitle(languageData.newRuleTitle || "RULE");
    setAddRuleToastText(languageData.addRuleToastText || "Rule added!");
    setAddPlayerButtonText(languageData.addPlayerButtonText || "ADD A PLAYER");
    setAddPlayerFieldText(
      languageData.addPlayerFieldText || "Enter the new player's name"
    );
    setAddPlayerButton2Text(languageData.addPlayerButton2Text || "ADD PLAYER");
    setAddPlayerToastText(languageData.addPlayerToastText || "Player added!");
    setFirstCardText(languageData.firstCardText || "You're at the first card!");
    setQuitGameTitle(languageData.quitGameTitle || "Quit Game");
    setQuitGameText(
      languageData.quitGameText || "Are you sure you want to quit the game?"
    );
    setQuitGameOpt1(languageData.quitGameOpt1 || "Yes");
    setQuitGameOpt2(languageData.quitGameOpt2 || "No");
  };

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
  // Display a random prompt from the list of prompts
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

  var categoryColors = {};
  var playedArray = "";

  // console.log("Gamemode = " + gameMode);

  // Define a new state variable to store the background image
  const [currentCategory, setCurrentCategory] = useState("");

  var categoryImages = {};

  switch (language) {
    case "English": {
      categoryImages = {
        CHALLENGE: require("../assets/images/CHALLENGE.png") as any,
        RULE: require("../assets/images/RULE.png") as any,
        VIRUS: require("../assets/images/VIRUS.png") as any,
        "VIRUS END": require("../assets/images/VIRUS.png") as any,
        "GET IT DOWN YA": require("../assets/images/GIDY.png") as any,
        VOTE: require("../assets/images/VOTE.png") as any,
        SEXY: require("../assets/images/SEXY.png") as any,
      };
      switch (gameMode) {
        case "prinkGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#d70057",
            RULE: "#8e0045",
            VIRUS: "#008e72",
            "VIRUS END": "#008e72",
            "GET IT DOWN YA": "#00badc",
            QUIZ: "#00428f",
            VOTE: "#00428f",
            SEXY: "#008e72",
          };
          playedArray = "playedPrinksPrompts";
          // console.log("Played array var set to: " + playedArray);
          break;
        }
        case "crazyGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#e39600",
            RULE: "#964cad",
            VIRUS: "#fa563c",
            "VIRUS END": "#fa563c",
            "GET IT DOWN YA": "#2e2f48",
            QUIZ: "#162a30",
            VOTE: "#162a30",
          };
          playedArray = "playedCrazyPrompts";
          break;
        }
        case "flirtyGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#e97e74",
            RULE: "#fcad8e",
            VIRUS: "#57316b",
            "VIRUS END": "#57316b",
            "GET IT DOWN YA": "#575a8d",
            QUIZ: "#bd2841",
            VOTE: "#fc8759",
            SEXY: "#ba3564",
          };
          playedArray = "playedFlirtyPrompts";
          break;
        }
        default: {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#d70057",
            RULE: "#8e0045",
            VIRUS: "#008e72",
            "VIRUS END": "#008e72",
            "GET IT DOWN YA": "#00badc",
            QUIZ: "#00428f",
            VOTE: "#00428f",
          };
          break;
        }
      }
      break;
    }
    case "Irish": {
      categoryImages = {
        DÚSHLÁN: require("../assets/images/CHALLENGE.png") as any,
        RIALACHÁN: require("../assets/images/RULE.png") as any,
        VÍREAS: require("../assets/images/VIRUS.png") as any,
        "DEIREADH AN VÍREAS": require("../assets/images/VIRUS.png") as any,
        "GABH I SÍORRÚD É": require("../assets/images/GIDY.png") as any,
        VÓTA: require("../assets/images/VOTE.png") as any,
        GNÉASÚIL: require("../assets/images/SEXY.png") as any,
      };
      switch (gameMode) {
        case "prinkGamePrompts": {
          // Generate a random color
          categoryColors = {
            DÚSHLÁN: "#d70057",
            RIALACHÁN: "#8e0045",
            VÍREAS: "#008e72",
            "DEIREADH AN VÍREAS": "#008e72",
            "GABH I SÍORRÚD É": "#00badc",
            CEISTEACHÁN: "#00428f",
            VÓTA: "#00428f",
          };
          playedArray = "playedPrinksPrompts";
          // console.log("Played array var set to: " + playedArray);
          break;
        }
        case "crazyGamePrompts": {
          // Generate a random color
          categoryColors = {
            DÚSHLÁN: "#e39600",
            RIALACHÁN: "#964cad",
            VÍREAS: "#fa563c",
            "DEIREADH AN VÍREAS": "#fa563c",
            "GABH I SÍORRÚD É": "#2e2f48",
            CEISTEACHÁN: "#162a30",
            VÓTA: "#162a30",
          };
          playedArray = "playedCrazyPrompts";
          break;
        }
        case "flirtyGamePrompts": {
          // Generate a random color
          categoryColors = {
            DÚSHLÁN: "#e97e74",
            RIALACHÁN: "#fcad8e",
            VÍREAS: "#57316b",
            "DEIREADH AN VÍREAS": "#57316b",
            "GABH I SÍORRÚD É": "#575a8d",
            CEISTEACHÁN: "#bd2841",
            VÓTA: "#fc8759",
            GNÉASÚIL: "#ba3564",
          };
          playedArray = "playedFlirtyPrompts";
          break;
        }
        default: {
          // Generate a random color
          categoryColors = {
            DÚSHLÁN: "#d70057",
            RIALACHÁN: "#8e0045",
            VÍREAS: "#008e72",
            "DEIREADH AN VÍREAS": "#008e72",
            "GABH I SÍORRÚD É": "#00badc",
            CEISTEACHÁN: "#00428f",
            VÓTA: "#00428f",
          };
          break;
        }
      }
      break;
    }
    case "Polish": {
      categoryImages = {
        CHALLENGE: require("../assets/images/CHALLENGE.png") as any,
        RULE: require("../assets/images/RULE.png") as any,
        VIRUS: require("../assets/images/VIRUS.png") as any,
        "VIRUS END": require("../assets/images/VIRUS.png") as any,
        "GET IT DOWN YA": require("../assets/images/GIDY.png") as any,
        VOTE: require("../assets/images/VOTE.png") as any,
        SEXY: require("../assets/images/SEXY.png") as any,
      };
      switch (gameMode) {
        case "prinkGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#d70057",
            RULE: "#8e0045",
            VIRUS: "#008e72",
            "VIRUS END": "#008e72",
            "GET IT DOWN YA": "#00badc",
            QUIZ: "#00428f",
            VOTE: "#00428f",
            SEXY: "#008e72",
          };
          playedArray = "playedPrinksPrompts";
          // console.log("Played array var set to: " + playedArray);
          break;
        }
        case "crazyGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#e39600",
            RULE: "#964cad",
            VIRUS: "#fa563c",
            "VIRUS END": "#fa563c",
            "GET IT DOWN YA": "#2e2f48",
            QUIZ: "#162a30",
            VOTE: "#162a30",
          };
          playedArray = "playedCrazyPrompts";
          break;
        }
        case "flirtyGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#e97e74",
            RULE: "#fcad8e",
            VIRUS: "#57316b",
            "VIRUS END": "#57316b",
            "GET IT DOWN YA": "#575a8d",
            QUIZ: "#bd2841",
            VOTE: "#fc8759",
            SEXY: "#ba3564",
          };
          playedArray = "playedFlirtyPrompts";
          break;
        }
        default: {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#d70057",
            RULE: "#8e0045",
            VIRUS: "#008e72",
            "VIRUS END": "#008e72",
            "GET IT DOWN YA": "#00badc",
            QUIZ: "#00428f",
            VOTE: "#00428f",
            SEXY: "#008e72",
          };
          break;
        }
      }
      break;
    }
    case "Spanish": {
      categoryImages = {
        CHALLENGE: require("../assets/images/CHALLENGE.png") as any,
        RULE: require("../assets/images/RULE.png") as any,
        VIRUS: require("../assets/images/VIRUS.png") as any,
        "VIRUS END": require("../assets/images/VIRUS.png") as any,
        "GET IT DOWN YA": require("../assets/images/GIDY.png") as any,
        VOTE: require("../assets/images/VOTE.png") as any,
        SEXY: require("../assets/images/SEXY.png") as any,
      };
      switch (gameMode) {
        case "prinkGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#d70057",
            RULE: "#8e0045",
            VIRUS: "#008e72",
            "VIRUS END": "#008e72",
            "GET IT DOWN YA": "#00badc",
            QUIZ: "#00428f",
            VOTE: "#00428f",
            SEXY: "#008e72",
          };
          playedArray = "playedPrinksPrompts";
          // console.log("Played array var set to: " + playedArray);
          break;
        }
        case "crazyGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#e39600",
            RULE: "#964cad",
            VIRUS: "#fa563c",
            "VIRUS END": "#fa563c",
            "GET IT DOWN YA": "#2e2f48",
            QUIZ: "#162a30",
            VOTE: "#162a30",
          };
          playedArray = "playedCrazyPrompts";
          break;
        }
        case "flirtyGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#e97e74",
            RULE: "#fcad8e",
            VIRUS: "#57316b",
            "VIRUS END": "#57316b",
            "GET IT DOWN YA": "#575a8d",
            QUIZ: "#bd2841",
            VOTE: "#fc8759",
            SEXY: "#ba3564",
          };
          playedArray = "playedFlirtyPrompts";
          break;
        }
        default: {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#d70057",
            RULE: "#8e0045",
            VIRUS: "#008e72",
            "VIRUS END": "#008e72",
            "GET IT DOWN YA": "#00badc",
            QUIZ: "#00428f",
            VOTE: "#00428f",
            SEXY: "#008e72",
          };
          break;
        }
      }
      break;
    }
    default: {
      switch (gameMode) {
        case "prinkGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#d70057",
            RULE: "#8e0045",
            VIRUS: "#008e72",
            "VIRUS END": "#008e72",
            "GET IT DOWN YA": "#00badc",
            QUIZ: "#00428f",
            VOTE: "#00428f",
            SEXY: "#008e72",
          };
          playedArray = "playedPrinksPrompts";
          // console.log("Played array var set to: " + playedArray);
          break;
        }
        case "crazyGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#e39600",
            RULE: "#964cad",
            VIRUS: "#fa563c",
            "VIRUS END": "#fa563c",
            "GET IT DOWN YA": "#2e2f48",
            QUIZ: "#162a30",
            VOTE: "#162a30",
          };
          playedArray = "playedCrazyPrompts";
          break;
        }
        case "flirtyGamePrompts": {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#e97e74",
            RULE: "#fcad8e",
            VIRUS: "#57316b",
            "VIRUS END": "#57316b",
            "GET IT DOWN YA": "#575a8d",
            QUIZ: "#bd2841",
            VOTE: "#fc8759",
            SEXY: "#ba3564",
          };
          playedArray = "playedFlirtyPrompts";
          break;
        }
        default: {
          // Generate a random color
          categoryColors = {
            CHALLENGE: "#d70057",
            RULE: "#8e0045",
            VIRUS: "#008e72",
            "VIRUS END": "#008e72",
            "GET IT DOWN YA": "#00badc",
            QUIZ: "#00428f",
            VOTE: "#00428f",
            SEXY: "#008e72",
          };
          break;
        }
      }
      break;
    }
  }

  useEffect(() => {
    shake();
  }, [randomName, randomPrompt]);

  const displayRandomPromptAndName = async () => {
    // Retrieve the prompts from async storage
    const selectedPrompts = await retrievePrompts(gameMode);
    //retrieve played prompts array to be updated
    const playedPrompts = await retrievePlayed(playedArray);
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
      //add updated playedPrompts list of played prompts in Async
      await AsyncStorage.setItem(
        playedArray,
        JSON.stringify(updatedPlayedPrompts)
      );
      // Save the category of the prompt
      const { category }: { category: keyof typeof categoryColors } = prompt;
      setCurrentCategory(category);
      // Create an array to store the chosen name indexes
      const chosenNameIndexes: number[] = [];
      // Pick a random name from the list and check if it has already been chosen
      let nameIndex = Math.floor(Math.random() * names.length);
      while (chosenNameIndexes.includes(nameIndex)) {
        nameIndex = Math.floor(Math.random() * names.length);
      }
      const name = names[nameIndex];
      chosenNameIndexes.push(nameIndex);

      // Pick a second random name from the list and check if it has already been chosen
      let nameIndex2 = Math.floor(Math.random() * names.length);
      while (chosenNameIndexes.includes(nameIndex2)) {
        nameIndex2 = Math.floor(Math.random() * names.length);
      }
      const name2 = names[nameIndex2];
      chosenNameIndexes.push(nameIndex2);

      var name3 = null;

      // Pick a third random name from the list and check if it has already been chosen
      if (names.length >= 3) {
        let nameIndex3 = Math.floor(Math.random() * names.length);
        while (chosenNameIndexes.includes(nameIndex3)) {
          nameIndex3 = Math.floor(Math.random() * names.length);
        }
        name3 = names[nameIndex3];
        chosenNameIndexes.push(nameIndex3);
      }

      let currentVirusID = "";

      // Check if the current prompt is a virus start
      if (prompt.category === "VIRUS" && prompt.id.slice(-1) === "a") {
        currentVirusID = prompt.id.slice(0, -1);
        // Check if the current virus end exists in the remaining selectedPrompts array
        for (let i = index + 1; i < selectedPrompts.length; i++) {
          if (selectedPrompts[i].id === currentVirusID + "b") {
            // Update the "[Name]" with the corresponding virus name
            // console.log("Virus end before replace:" + selectedPrompts[i].text);
            selectedPrompts[i].text = selectedPrompts[i].text.replace(
              "[Name]",
              name
            );
            selectedPrompts[i].text = selectedPrompts[i].text.replace(
              "[Name2]",
              name2
            );
            break;
          }
        }
      }

      // Update the random name text
      setRandomName(name);

      const color = categoryColors[category];

      // Remove the displayed prompt from the list
      selectedPrompts.splice(index, 1);

      // Store the updated list of prompts in async storage
      await AsyncStorage.setItem(gameMode, JSON.stringify(selectedPrompts));

      const namesToReplace = [
        { search: "[Name]", replace: name },
        { search: "[Name2]", replace: name2 },
      ];

      if (name3) {
        namesToReplace.push({ search: "[Name3]", replace: name3 });
      }

      for (let i = 0; i < namesToReplace.length; i++) {
        if (prompt.text.includes(namesToReplace[i].search)) {
          prompt.text = prompt.text.replace(
            namesToReplace[i].search,
            namesToReplace[i].replace
          );
        }
      }
      // Update the random prompt text
      setRandomPrompt(prompt.text);
      setRandomCategory(category);
      // Update the background color
      setBackgroundColor(color);
      setCurrentCategory(category);
      //if there's a handle to credit, update handle
      // console.log(prompt.handle);
      setPromptHandle(handle);
      // console.log("Before" + promptHandle);
      if (prompt.hasOwnProperty("handle")) {
        // console.log("handle found");
        handle = prompt.handle;
        setPromptHandle(handle);
        // console.log(promptHandle);
      }

      // Add the current name, prompt, and color to the previousPrompts array as an object
      setPreviousPrompts([
        ...previousPrompts,
        {
          name: name,
          prompt: prompt.text,
          color: color,
          category: category, // add the category field
          handle: handle,
        },
      ]);
      arrayIndex.current = previousPrompts.length;
      index++;
    } else {
      // If there are no prompts left to display, navigate back to the TabTwoScreen
      navigation.navigate("GameOver", {
        language: language,
      });
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9} // set activeOpacity to 1
      style={[
        gameOneScreenStyles.container as StyleProp<ViewStyle>,
        { backgroundColor },
      ]}
      onPress={(event) => {
        const { locationX } = event.nativeEvent;
        const screenWidth = Dimensions.get("window").width;
        if (!isEditVisible && !isOverlayVisible && !isPlayerOverlayVisible) {
          // Check which side of the screen the user tapped on
          const side = locationX < screenWidth / 2 ? "left" : "right";

          // Check if the user tapped on the left side of the screen
          if (side === "left") {
            // Tap on the left side of the screen
            if (arrayIndex.current > 0) {
              // If there are any previous prompts, go back to the last one
              const lastPrompt = previousPrompts[arrayIndex.current - 1];
              // console.log("Last prompt in array: ", lastPrompt);
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
              // Tap on the right side of the screen
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
              navigation.navigate("GameOver", {
                language: language,
              });
            }
          }
        } else {
          setIsOverlayVisible(false);
          setIsPlayerOverlayVisible(false);
          setIsEditVisible(false);
        }
      }}
    >
      {/* <ImageBackground
        style={gameOneScreenStyles.image}
        source={require("../assets/images/beer_gif.gif")}
      > */}
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
                  onChangeText={(text) => setNewRule(text)}
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
                  onChangeText={(text) => setNewPlayerName(text)}
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
        {/* <View style={gameOneScreenStyles.topRightBeerContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/images/beer_glass.png")} />
            <Image source={require("../assets/images/beer_glass.png")} />
            <Image source={require("../assets/images/beer_glass.png")} />
            <Image source={require("../assets/images/beer_glass.png")} />
          </View>
        </View> */}

        {randomCategory !== " " && (
          <Text
            style={{
              fontFamily: "Konstruktor",
              color: "#fff",
              fontSize: 45,
              textAlign: "center",
              // marginBottom: 20,
              padding: 20,
              textShadowColor: "#000",
              textShadowOffset: { width: 4, height: 4 },
              textShadowRadius: 0.1,
            }}
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
            // fontWeight: "bold",
            // fontStyle: "italic",
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
