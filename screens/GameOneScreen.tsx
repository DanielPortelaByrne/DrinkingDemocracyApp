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
import { getNames } from "../components/nameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Retrieve the prompts from async storage
const retrievePrompts = async () => {
  try {
    // Get the selected prompts string from async storage
    const selectedPromptsString = await AsyncStorage.getItem("gamePrompts");
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
};

export default function GameOneScreen({
  navigation,
}: RootTabScreenProps<"GameOne">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
    // AGENCYR: require("../assets/fonts/AGENCYB.TTF"),
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
  // Store the prompts in async storage when the component is mounted
  // useEffect(() => {
  //   storePrompts();
  // }, []);

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

  useEffect(() => {
    shake();
  }, [randomName, randomPrompt]);

  const displayRandomPromptAndName = async () => {
    // Retrieve the prompts from async storage
    const selectedPrompts = await retrievePrompts();
    // Start the shake animation
    shake();

    // Check if there are any prompts left to display
    if (selectedPrompts.length > 0) {
      console.log(selectedPrompts.length);
      // Pick a random prompt from the list
      const index = Math.floor(Math.random() * selectedPrompts.length);
      const prompt = selectedPrompts[index];
      // Save the category of the prompt
      const { category }: { category: keyof typeof categoryColors } = prompt;

      // Pick a random name from the list
      const nameIndex = Math.floor(Math.random() * names.length);
      var name = names[nameIndex];

      // Pick a random name from the list
      const nameIndex2 = Math.floor(Math.random() * names.length);
      var name2 = names[nameIndex2];

      // Update the random name text
      setRandomName(name);

      // Generate a random color
      const categoryColors = {
        CHALLENGE: "#d70057",
        RULE: "#8e0045",
        VIRUS: "#008e72",
        "GET IT DOWN YA": "#00badc",
        " ": "#00428f",
      };
      const color = categoryColors[category];
      // Update the background color
      setBackgroundColor(color);

      // Remove the displayed prompt from the list
      selectedPrompts.splice(index, 1);

      // Store the updated list of prompts in async storage
      await AsyncStorage.setItem(
        "gamePrompts",
        JSON.stringify(selectedPrompts)
      );

      // Check if there are 5 prompts left to display
      // if (prompts.length === 5) {
      //   // Navigate back to the TabTwoScreen
      //   setShouldNavigate(true);
      // }
      if (prompt.text.includes("[Name]")) {
        // Replace the first occurrence of "[Name]" with the random name
        prompt.text = prompt.text.replace("[Name]", name);
        setRandomName("");
        name = "";
      }

      if (prompt.text.includes("[Name]")) {
        // Replace the second occurrence of "[Name]" with the second random name
        prompt.text = prompt.text.replace("[Name]", name2);
        setRandomName("");
        name2 = "";
      }

      if (prompt.category.includes("GET IT DOWN YA")) {
        name = "";
      }

      // Update the random prompt text
      setRandomPrompt(prompt.text);
      setRandomCategory(category);

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
      // console.log("Setting index to: ", arrayIndex.current);
      // console.log(
      //   "Name: " +
      //     randomName +
      //     " Prompt: " +
      //     randomPrompt +
      //     " Colour: " +
      //     backgroundColor
      // );

      for (const [index, prompt] of previousPrompts.entries()) {
        console.log(
          index,
          prompt.name,
          prompt.prompt,
          prompt.color,
          prompt.category
        );
      }
      console.log(" ");
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
                placeholder="Enter a new rule"
                onChangeText={(text) => setNewRule(text)}
                value={newRule}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={async () => {
                  // Retrieve the selected prompts from async storage
                  const selectedPrompts = await AsyncStorage.getItem(
                    "gamePrompts"
                  );
                  // Convert the selected prompts string back to an array
                  const promptsArray = selectedPrompts
                    ? JSON.parse(selectedPrompts)
                    : [];
                  // Add the new rule to the prompts array and store it in async storage
                  promptsArray.push({ text: newRule, category: "RULE" });
                  await AsyncStorage.setItem(
                    "gamePrompts",
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
                <Text style={styles.submitButtonText}>Add Rule</Text>
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
                <Text style={styles.submitButtonText}>Add Player</Text>
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
              { cancelable: false }
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
            fontSize: 60,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {randomCategory}
        </Text>
      )}

      <Animated.Text
        style={{
          // fontFamily: "AGENCYR",
          fontSize: 30,
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
        {randomName} {randomPrompt}
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
    fontSize: 30,
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  veryBoldText: {
    fontWeight: "bold",
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
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
