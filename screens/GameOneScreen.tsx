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
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames, updateNames } from "../components/nameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

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
    switch (language) {
      case "English": {
        setAddRuleButtonText("ADD A RULE");
        setAddRuleFieldText("Gráinne is a dryshite, drink 15 sips");
        setAddRuleButton2Text("ADD RULE");
        setNewRuleTitle("RULE");
        setAddRuleToastText("Rule added!");
        setAddPlayerButtonText("ADD A PLAYER");
        setAddPlayerFieldText("Enter the new player's name");
        setAddPlayerButton2Text("ADD PLAYER");
        setAddPlayerToastText("Player added!");
        setFirstCardText("You're at the first card!");
        setQuitGameTitle("Quit Game");
        setQuitGameText("Are you sure you want to quit the game?");
        setQuitGameOpt1("Yes");
        setQuitGameOpt2("No");
        break;
      }
      case "Irish": {
        setAddRuleButtonText("RIALACHÁN NUA");
        setAddRuleFieldText("Is dryshite í Gráinne, ól 15 blaise");
        setAddRuleButton2Text("CUIR RIALACHÁN LEIS");
        setNewRuleTitle("RIALACHÁN");
        setAddRuleToastText("Rúl curtha leis!");
        setAddPlayerButtonText("IMREOIR NUA");
        setAddPlayerFieldText("Iontráil ainm an imreora nua");
        setAddPlayerButton2Text("CUIR IMREORA LEIS");
        setAddPlayerToastText("Imreoir cuirtear leis!");
        setFirstCardText("Tá tú ag an gcéad cárta!");
        setQuitGameTitle("Céasadh den Chluiche");
        setQuitGameText(
          "An bhfuil tú cinnte go bhfuil tú ag iarraidh an cluiche a dhúnadh?"
        );
        setQuitGameOpt1("Táim");
        setQuitGameOpt2("Nílim");
        break;
      }
      case "Polish": {
        setAddRuleButtonText("DODAJ ZASADĘ");
        setAddRuleFieldText("Gráinne to suchar, wypij 15 łyków");
        setAddRuleButton2Text("DODAJ ZASADĘ");
        setNewRuleTitle("REGUŁA");
        setAddRuleToastText("Reguła dodana!");
        setAddPlayerButtonText("DODAJ GRACZA");
        setAddPlayerFieldText("Wprowadź imię nowego gracza");
        setAddPlayerButton2Text("DODAJ GRACZA");
        setAddPlayerToastText("Gracz dodany!");
        setFirstCardText("Jesteś na pierwszej karcie!");
        setQuitGameTitle("Zakończ grę");
        setQuitGameText("Czy na pewno chcesz zakończyć grę?");
        setQuitGameOpt1("Tak");
        setQuitGameOpt2("Nie");
        break;
      }
      case "Spanish": {
        setAddRuleButtonText("AGREGAR REGLA");
        setAddRuleFieldText("Gráinne es una fastidiosa, toma 15 sorbos");
        setAddRuleButton2Text("AGREGAR REGLA");
        setAddPlayerButtonText("AGREGAR JUGADOR");
        setAddPlayerFieldText("Ingresa el nombre del nuevo jugador");
        setAddPlayerButton2Text("AGREGAR JUGADOR");
        setAddPlayerToastText("¡Jugador agregado!");
        setFirstCardText("¡Estás en la primera carta!");
        setQuitGameTitle("Salir del Juego");
        setQuitGameText("¿Estás seguro de que deseas salir del juego?");
        setQuitGameOpt1("Sí");
        setQuitGameOpt2("No");
        break;
      }
      default: {
        setAddRuleButtonText("ADD A RULE");
        setAddRuleFieldText("Gráinne is a dryshite, drink 15 sips");
        setAddRuleButton2Text("ADD RULE");
        setAddPlayerButtonText("ADD A PLAYER");
        setAddPlayerFieldText("Enter the new player's name");
        setAddPlayerButton2Text("ADD PLAYER");
        setAddPlayerToastText("Player added!");
        setFirstCardText("You're at the first card!");
        setQuitGameTitle("Quit Game");
        setQuitGameText("Are you sure you want to quit the game?");
        setQuitGameOpt1("Yes");
        setQuitGameOpt2("No");
        break;
      }
    }
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
      style={[styles.container, { backgroundColor }]}
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
        style={styles.image}
        source={require("../assets/images/beer_gif.gif")}
      > */}
      <ImageBackground
        style={styles.image}
        source={categoryImages[currentCategory]}
      >
        {isEditVisible && (
          <>
            <TouchableOpacity
              style={styles.ruleButton}
              onPress={() => setIsOverlayVisible(!isOverlayVisible)}
            >
              <Text style={styles.veryBoldText}>{addRuleButtonText}</Text>
            </TouchableOpacity>
            {isOverlayVisible && (
              <View style={styles.overlay}>
                <TextInput
                  style={styles.textInput}
                  placeholder={addRuleFieldText}
                  onChangeText={(text) => setNewRule(text)}
                  value={newRule}
                />
                <TouchableOpacity
                  style={styles.submitButton}
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
                  <Text style={styles.submitButtonText}>
                    {addRuleButton2Text}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.playerButton}
              onPress={() => setIsPlayerOverlayVisible(!isPlayerOverlayVisible)}
            >
              <Text style={styles.veryBoldText}>{addPlayerButtonText}</Text>
            </TouchableOpacity>
            {isPlayerOverlayVisible && (
              <View style={styles.overlay}>
                <TextInput
                  style={styles.textInput}
                  placeholder={addPlayerFieldText}
                  onChangeText={(text) => setNewPlayerName(text)}
                  value={newPlayerName}
                />
                <TouchableOpacity
                  style={styles.submitButton}
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
                  <Text style={styles.submitButtonText}>
                    {addPlayerButton2Text}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        <View style={styles.topLeftButtonContainer}>
          <TouchableOpacity
            style={styles.topLeftButton}
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

        <View style={styles.topRightButtonContainer}>
          <TouchableOpacity
            style={styles.topRightButton}
            onPress={() => setIsEditVisible(!isEditVisible)}
          >
            <MaterialIcons name="add" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.topRightBeerContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
  textInput: {
    position: "absolute",
    top: "45%",
    left: "10%",
    right: "10%",
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    zIndex: 11,
    backgroundColor: "#ffff",
  },
  submitButton: {
    position: "absolute",
    top: "55%",
    left: "10%",
    right: "10%",
    height: 50,
    marginTop: 15,
    backgroundColor: "#ed1e26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
    padding: 10,
  },
  ruleButton: {
    position: "absolute",
    top: 45,
    right: 15,
    height: 50,
    width: 130,
    backgroundColor: "#ed1e26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
    padding: 8,
  },
  playerButton: {
    position: "absolute",
    top: 100,
    right: 15,
    height: 50,
    width: 130,
    backgroundColor: "#ed1e26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
    padding: 8,
  },
  submitButtonText: {
    fontFamily: "Konstruktor",
    color: "#fff",
    fontSize: 25,
  },
  veryBoldText: {
    fontFamily: "Konstruktor",
    fontSize: 16,
  },
  topLeftButtonContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  topLeftButton: {
    height: 48,
    width: 48,
    top: 30,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  topRightButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  topRightButton: {
    position: "absolute",
    right: 20, // or a fixed value like 20
    top: 50,
  },
  topRightBeerContainer: {
    position: "absolute",
    top: 150,
    right: 30,
    left: 120,
  },
  image: {
    // flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
