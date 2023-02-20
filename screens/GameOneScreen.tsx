import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ToastAndroid,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames, updateNames } from "../components/nameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// var VIRUS ENDIndex = 0;

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
  const { gameMode } = route.params;
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  useEffect(() => {
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
  // Display a random prompt from the list of prompts
  const [randomName, setRandomName] = useState("");
  const [randomPrompt, setRandomPrompt] = useState("");
  const [randomCategory, setRandomCategory] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#fff"); // Add a state to store the background color
  const [shouldNavigate] = useState(false);
  const [previousPrompts, setPreviousPrompts] = useState<
    { name: string; prompt: string; color: string; category: string }[]
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

  switch (gameMode) {
    case "prinkGamePrompts": {
      // Generate a random color
      categoryColors = {
        CHALLENGE: "#fff62d",
        RULE: "#69ff4f",
        VIRUS: "#ff954d",
        "VIRUS END": "#ff954d",
        "GET IT DOWN YA": "#55ffb6",
        QUIZ: "#1dc0ff",
        VOTE: "#1dc0ff",
      };
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
      break;
    }
    case "flirtyGamePrompts": {
      // Generate a random color
      categoryColors = {
        CHALLENGE: "#f95979",
        RULE: "#d62a5e",
        VIRUS: "#c90084",
        "VIRUS END": "#c90084",
        "GET IT DOWN YA": "#ae0072",
        QUIZ: "#bd2841",
        VOTE: "#bd2841",
        SEXY: "#45072f",
      };
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

  useEffect(() => {
    shake();
  }, [randomName, randomPrompt]);

  const displayRandomPromptAndName = async () => {
    // check webapp to see if any new prompts added
    try {
      const response = await fetch("http://192.168.1.14:3001/api/prompts");
      const data = await response.json();
      const selectedPrompts = await AsyncStorage.getItem(gameMode);
      // Convert the selected prompts string back to an array
      const promptsArray = selectedPrompts ? JSON.parse(selectedPrompts) : [];
      // Generate a random index between 0 and the length of the array
      const randomIndex = Math.floor(Math.random() * (promptsArray.length + 1));

      if (Object.keys(data).length !== 0) {
        console.log(data);
        // check if data object is not empty
        // Use the splice method to insert the new rule at the random index
        promptsArray.splice(randomIndex, 0, {
          text: data.text,
          category: data.category,
        });
        await AsyncStorage.setItem(gameMode, JSON.stringify(promptsArray));
        console.log("Successfully fetched and stored data: " + data);
      } else {
        console.log("No new prompts from the web-app");
      }
    } catch (error) {
      console.error(error);
    }
    // Retrieve the prompts from async storage
    const selectedPrompts = await retrievePrompts(gameMode);
    // fetch("http://192.168.1.14:3001/api/prompts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(selectedPrompts),
    // })
    //   .then((response) => response.json())
    //   .then((selectedPrompts) => console.log(selectedPrompts))
    //   .catch((error) => console.error(error));

    // Start the shake animation
    shake();

    // Check if there are any prompts left to display
    if (selectedPrompts.length > 0) {
      const prompt = selectedPrompts[index];

      // Save the category of the prompt
      const { category }: { category: keyof typeof categoryColors } = prompt;

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
          // console.log("Looking for virus end");
          if (selectedPrompts[i].id === currentVirusID + "b") {
            // Update the "[Name]" with the corresponding virus name
            selectedPrompts[i].text = selectedPrompts[i].text.replace(
              "[Name]",
              name,
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

      if (prompt.category === "VIRUS") {
        console.log(
          prompt.text + "[" + (arrayIndex.current.valueOf() + 1) + "]"
        );
      }
      if (prompt.category === "VIRUS END") {
        console.log(
          prompt.text + "[" + (arrayIndex.current.valueOf() + 1) + "]"
        );
      }

      // Update the random prompt text
      setRandomPrompt(prompt.text);
      setRandomCategory(category);
      // Update the background color
      setBackgroundColor(color);

      // Add the current name, prompt, and color to the previousPrompts array as an object
      setPreviousPrompts([
        ...previousPrompts,
        {
          name: name,
          prompt: prompt.text,
          color: color,
          category: category, // add the category field
        },
      ]);
      arrayIndex.current = previousPrompts.length;
      index++;
    } else {
      // If there are no prompts left to display, navigate back to the TabTwoScreen
      navigation.navigate("GameOver");
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
            // console.log("index: ", arrayIndex.current);
            if (arrayIndex.current > 0) {
              // console.log("Reaching left tap conditional");
              // If there are any previous prompts, go back to the last one
              const lastPrompt = previousPrompts[arrayIndex.current - 1];
              // console.log("Last prompt in array: ", lastPrompt);
              setRandomName(lastPrompt.name);
              setRandomPrompt(lastPrompt.prompt);
              setRandomCategory(lastPrompt.category);
              setBackgroundColor(lastPrompt.color);
              arrayIndex.current--;
              // console.log("Decrementing index to: ", arrayIndex);
            } else {
              // console.log("You're at the first card!");
              ToastAndroid.show(
                "You're at the first card!",
                ToastAndroid.SHORT
              );
            }
          } else {
            if (arrayIndex.current == previousPrompts.length - 1) {
              // console.log("You're at the last card!");
              // Tap on the right side of the screen
              displayRandomPromptAndName();
            } else {
              const nextPrompt = previousPrompts[arrayIndex.current + 1];
              setRandomName(nextPrompt.name);
              setRandomPrompt(nextPrompt.prompt);
              setRandomCategory(nextPrompt.category);
              setBackgroundColor(nextPrompt.color);
              arrayIndex.current++;
              // console.log("Incrementing index to: ", arrayIndex);
            }
            if (shouldNavigate) {
              navigation.navigate("GameOver");
            }
          }
        } else {
          setIsOverlayVisible(false);
          setIsPlayerOverlayVisible(false);
          setIsEditVisible(false);
        }
      }}
    >
      {isEditVisible && (
        <>
          <TouchableOpacity
            style={styles.ruleButton}
            onPress={() => setIsOverlayVisible(!isOverlayVisible)}
          >
            <Text style={styles.veryBoldText}>ADD A RULE</Text>
          </TouchableOpacity>
          {isOverlayVisible && (
            <View style={styles.overlay}>
              <TextInput
                style={styles.textInput}
                placeholder="Gráinne is a dryshite, drink 15 sips"
                onChangeText={(text) => setNewRule(text)}
                value={newRule}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={async () => {
                  // Retrieve the selected prompts from async storage
                  const selectedPrompts = await AsyncStorage.getItem(gameMode);
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
                    category: "RULE",
                  });
                  await AsyncStorage.setItem(
                    gameMode,
                    JSON.stringify(promptsArray)
                  );
                  // Reset the new rule input and close the overlay
                  setNewRule("");
                  // Display a message to the user to confirm that the new rule has been added
                  ToastAndroid.show("Rule added!", ToastAndroid.SHORT);
                  setIsOverlayVisible(false);
                  setIsEditVisible(false);
                }}
              >
                <Text style={styles.submitButtonText}>ADD RULE</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.playerButton}
            onPress={() => setIsPlayerOverlayVisible(!isPlayerOverlayVisible)}
          >
            <Text style={styles.veryBoldText}>ADD A PLAYER</Text>
          </TouchableOpacity>
          {isPlayerOverlayVisible && (
            <View style={styles.overlay}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter the new player's name"
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
                  ToastAndroid.show("Player added!", ToastAndroid.SHORT);
                  setIsPlayerOverlayVisible(false);
                  setIsEditVisible(false);
                }}
              >
                <Text style={styles.submitButtonText}>ADD PLAYER</Text>
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
              "Quit Game",
              "Are you sure you want to quit the game?",
              [
                {
                  text: "Yes",
                  onPress: () => navigation.navigate("TabTwo"),
                },
                {
                  text: "No",
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

      {randomCategory !== " " && (
        <Text
          style={{
            fontFamily: "Konstruktor",
            color: "#fff",
            fontSize: 45,
            textAlign: "center",
            // marginBottom: 20,
            padding: 20,
          }}
        >
          {randomCategory}
        </Text>
      )}

      <Animated.Text
        style={{
          // fontFamily: "AGENCYR",
          fontSize: 28,
          color: "#fff",
          textAlign: "center",
          marginBottom: 10,
          marginLeft: 30,
          marginRight: 30,
          // fontWeight: "bold",
          // fontStyle: "italic",
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
        {/* {randomName}  */}
        {randomPrompt}
      </Animated.Text>
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
    width: 125,
    backgroundColor: "#ed1e26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
    padding: 10,
  },
  playerButton: {
    position: "absolute",
    top: 100,
    right: 15,
    height: 50,
    width: 125,
    backgroundColor: "#ed1e26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
    padding: 10,
  },
  submitButtonText: {
    fontFamily: "Konstruktor",
    color: "#fff",
    fontSize: 25,
  },
  veryBoldText: {
    fontFamily: "Konstruktor",
    fontSize: 17,
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
});
