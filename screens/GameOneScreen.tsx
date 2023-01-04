import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

// Prompts to store in async storage
const prompts = [
  {
    text: "take 3 sips if you have ever been to a different country, otherwise give them out",
    category: "CHALLENGE",
  },
  {
    text: "down your drink if you have a tattoo, otherwise give it out",
    category: "🙊 SEE, 🙊 DO",
  },
  {
    text: "take 2 sips if you have ever ridden a rollercoaster, otherwise give them out",
    category: "GET IT DOWN YA",
  },
  {
    text: "down your drink if you have ever bungee jumped, otherwise give it out",
    category: "CHALLENGE",
  },
  {
    text: "give out 3 sips if you have ever been in a car accident, otherwise take them",
    category: "RULE",
  },
  {
    text: "take 4 sips if you have a phobia, otherwise give them out",
    category: "GET IT DOWN YA",
  },
  {
    text: "down your drink if you have ever gone skydiving, otherwise give it out",
    category: "CHALLENGE",
  },
  {
    text: "give out 2 sips if you have ever broken a bone, otherwise take them",
    category: "RULE",
  },
  {
    text: "take 5 sips if you have a fear of public speaking, otherwise give them out",
    category: "GET IT DOWN YA",
  },
  {
    text: "down your drink if you have ever played a sport at a professional level, otherwise give it out",
    category: "RULE",
  },
  {
    text: "take 2 sips if you are Irish, otherwise give them out",
    category: "RULE",
  },
  {
    text: "take 2 sips if you are Polish, otherwise give them out",
    category: "🙊 SEE, 🙊 DO",
  },
  {
    text: "take 2 sips if you are American, otherwise give them out",
    category: "RULE",
  },
  {
    text: "take 2 sips if you are Romanian, otherwise give them out",
    category: "🙊 SEE, 🙊 DO",
  },
  {
    text: "take 2 sips if you are mixed background, otherwise give them out",
    category: "🙊 SEE, 🙊 DO",
  },
  {
    text: "take 2 sips if you are in your early 20s, otherwise give them out",
    category: "RULE",
  },
  {
    text: "take 2 sips if you love formula one, otherwise give them out",
    category: "🙊 SEE, 🙊 DO",
  },
  {
    text: "take 2 sips if you spend money excessively, otherwise give them out",
    category: "RULE",
  },
  {
    text: "take 3 sips if you have a job in finance, otherwise give them out",
    category: "🙊 SEE, 🙊 DO",
  },
  {
    text: "take 3 sips if you have a job in tech, otherwise give them out",
    category: "RULE",
  },
  {
    text: "take 3 sips if you have a job in healthcare, otherwise give them out",
    category: "🙊 SEE, 🙊 DO",
  },
  {
    text: "take 3 sips if you have a job in education, otherwise give them out",
    category: "RULE",
  },
  {
    text: "take 3 sips if you have a job in the legal field, otherwise give them out",
    category: "🙊 SEE, 🙊 DO",
  },
  {
    text: "give out 3 sips if you have a job in the retail industry, otherwise take them",
    category: "RULE",
  },
  {
    text: "give out 3 sips if you have a job in the hospitality industry, otherwise take them",
    category: "RULE",
  },
  {
    text: "give out 3 sips if you have a job in the creative industry, otherwise take them",
    category: "RULE",
  },
  {
    text: "play never have i ever: players take turns saying something they have never done, and anyone who has done it must take a drink",
    category: "RULE",
  },
  {
    text: 'play cheers to the governor: players take turns counting up from 1, but must say "cheers to the governor" instead of "3". If someone messes up or hesitates, they must take a drink',
    category: "CHALLENGE",
  },
  {
    text: "play quarters: players take turns trying to bounce a quarter off a table and into a cup. If they make it, they choose someone to drink. If they miss, they must drink",
    category: "CHALLENGE",
  },
];

// Store the prompts in async storage
const storePrompts = async () => {
  try {
    // Convert the prompts array to a JSON string
    const promptsString = JSON.stringify(prompts);
    // Save the prompts string in async storage
    await AsyncStorage.setItem("prompts", promptsString);
    // console.log("Stored prompts");
  } catch (error) {
    console.error(error);
  }
};

// Retrieve the prompts from async storage
const retrievePrompts = async () => {
  try {
    // Get the prompts string from async storage
    const promptsString = await AsyncStorage.getItem("prompts");
    // Convert the prompts string back to an array
    return promptsString ? JSON.parse(promptsString) : [];
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
  // Store the prompts in async storage when the component is mounted
  useEffect(() => {
    storePrompts();
  }, []);

  useEffect(() => {
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

  const displayRandomPromptAndName = async () => {
    // Retrieve the prompts from async storage
    const prompts = await retrievePrompts();

    // Check if there are any prompts left to display
    if (prompts.length > 0) {
      // console.log(prompts.length);
      // Pick a random prompt from the list
      const index = Math.floor(Math.random() * prompts.length);
      const prompt = prompts[index];
      // Save the category of the prompt
      const { category } = prompt;

      // Pick a random name from the list
      const nameIndex = Math.floor(Math.random() * names.length);
      const name = names[nameIndex];

      // Update the random name text
      setRandomName(name);
      // Generate a random color
      const colors = [
        "#FFC300",
        "#FF3D00",
        "#000000",
        "#BF360C",
        "#B71C1C",
        "#607D8B",
        "#006064",
        "#D32F2F",
        "#4CAF50",
      ]; // Add some colors to choose from
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      // Update the background color
      setBackgroundColor(color);

      // Remove the displayed prompt from the list
      prompts.splice(index, 1);
      // Store the updated list of prompts in async storage
      await AsyncStorage.setItem("prompts", JSON.stringify(prompts));

      // Check if there are 5 prompts left to display
      // if (prompts.length === 5) {
      //   // Navigate back to the TabTwoScreen
      //   setShouldNavigate(true);
      // }

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
      console.log("Setting index to: ", arrayIndex.current);
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
            console.log("index: ", arrayIndex.current);
            if (arrayIndex.current > 0) {
              console.log("Reaching left tap conditional");
              // If there are any previous prompts, go back to the last one
              const lastPrompt = previousPrompts[arrayIndex.current - 1];
              // console.log("Last prompt in array: ", lastPrompt);
              setRandomName(lastPrompt.name);
              setRandomPrompt(lastPrompt.prompt);
              setRandomCategory(lastPrompt.category);
              setBackgroundColor(lastPrompt.color);
              arrayIndex.current--;
              console.log("Decrementing index to: ", arrayIndex);
            } else {
              console.log("You're at the first card!");
              ToastAndroid.show(
                "You're at the first card!",
                ToastAndroid.SHORT
              );
            }
          } else {
            if (arrayIndex.current == previousPrompts.length - 1) {
              console.log("You're at the last card!");
              // Tap on the right side of the screen
              displayRandomPromptAndName();
            } else {
              const nextPrompt = previousPrompts[arrayIndex.current + 1];
              setRandomName(nextPrompt.name);
              setRandomPrompt(nextPrompt.prompt);
              setRandomCategory(nextPrompt.category);
              setBackgroundColor(nextPrompt.color);
              arrayIndex.current++;
              console.log("Incrementing index to: ", arrayIndex);
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
                onPress={() => {
                  // Add the new rule to the prompts array and store it in async storage
                  prompts.push({ text: newRule, category: "RULE" });
                  AsyncStorage.setItem("prompts", JSON.stringify(prompts));
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
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.categoryText}>{randomCategory}</Text>

      <Text style={styles.gameText}>
        {randomName} {randomPrompt}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
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
    top: 60,
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
