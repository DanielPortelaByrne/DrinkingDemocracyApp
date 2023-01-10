import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { prompts } from "../prompts";
import { crazy } from "../crazy";
import { flirty } from "../flirty";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
// import { useFocusEffect } from "react-navigation";
// import "react-native-gesture-handler";

// Store the prompts in async storage
const storePrompts = async () => {
  try {
    // Convert the prompts array to a JSON string
    const promptsString = JSON.stringify(prompts);
    const crazyString = JSON.stringify(crazy);
    const flirtyString = JSON.stringify(flirty);

    // Save the prompts strings in async storage
    await AsyncStorage.setItem("prompts", promptsString);
    await AsyncStorage.setItem("crazy", crazyString);
    await AsyncStorage.setItem("flirty", flirtyString);
  } catch (error) {
    console.error(error);
  }
};

const selectRandomPrompts = async () => {
  // console.log("Running random prompts");
  // Retrieve the prompts from async storage
  const prompts = await retrievePrompts();
  const crazy = await retrieveCrazy();
  const flirty = await retrieveFlirty();
  // console.log("Prompts list length: ", prompts.length);
  // console.log("Crazy prompts list length: ", crazy.length);
  // console.log("Flirty prompts list length: ", flirty.length);

  // Shuffle the prompts array
  prompts.sort(() => Math.random() - 0.5);
  crazy.sort(() => Math.random() - 0.5);
  flirty.sort(() => Math.random() - 0.5);

  // Select the first 25 prompts from the shuffled array
  const selectedPrompts = prompts.slice(0, 25);
  const selectedCrazyPrompts = crazy.slice(0, 25);
  const selectedFlirtyPrompts = flirty.slice(0, 25);

  // Print the selected prompts to the console
  // console.log(
  //   "Random: Normal, Crazy, Flirty prompts lists lengths: ",
  //   selectedPrompts.length,
  //   selectedCrazyPrompts.length,
  //   selectedFlirtyPrompts.length
  // );
  // console.log(selectedPrompts);
  // console.log(selectedCrazyPrompts);
  // console.log(selectedFlirtyPrompts);

  // Store the selected games prompts in async storage
  await AsyncStorage.setItem(
    "prinksGamePrompts",
    JSON.stringify(selectedPrompts)
  );
  await AsyncStorage.setItem(
    "crazyGamePrompts",
    JSON.stringify(selectedCrazyPrompts)
  );
  await AsyncStorage.setItem(
    "flirtyGamePrompts",
    JSON.stringify(selectedFlirtyPrompts)
  );
};

const retrievePrompts = async () => {
  // Get the prompts from async storage
  const promptsString = await AsyncStorage.getItem("prompts");
  // Parse the string into an array of prompts
  const prompts = promptsString ? JSON.parse(promptsString) : [];
  // Return the array of prompts
  return prompts;
};

const retrieveCrazy = async () => {
  // Get the prompts from async storage
  const crazyString = await AsyncStorage.getItem("crazy");
  // Parse the string into an array of prompts
  const crazy = crazyString ? JSON.parse(crazyString) : [];
  // Return the array of prompts
  return crazy;
};

const retrieveFlirty = async () => {
  // Get the prompts from async storage
  const flirtyString = await AsyncStorage.getItem("flirty");
  // Parse the string into an array of prompts
  const flirty = flirtyString ? JSON.parse(flirtyString) : [];
  // Return the array of prompts
  return flirty;
};

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  // const [gameMode, setGameMode] = useState<string>("");
  // const storeGameMode = () => {
  //   try {
  //     console.log("Setting Game Mode to: ", gameMode);
  //     // Save the prompts strings in async storage
  //     AsyncStorage.setItem("gameMode", gameMode);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // Store the prompts in async storage when the component is mounted
  useEffect(() => {
    storePrompts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      selectRandomPrompts();
    }, [])
  );

  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const names = getNames(); // retrieve the names from the name store
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 70, left: 30 }}
        onPress={() => navigation.navigate("TabOne")}
      >
        <Ionicons name="ios-home" size={32} color="red" />
      </TouchableOpacity>
      <View style={{ alignSelf: "center" }}>
        <Text
          style={{
            fontFamily: "Konstruktor",
            fontSize: 50,
            textAlign: "center",
          }}
        >
          Games
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          Players:
          {names.map((name, index) => (
            <Text key={index}>
              {" "}
              {name}
              {index === names.length - 1 ? "" : ","}
            </Text>
          ))}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 200,
          marginBottom: 200,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 260,
            marginBottom: 25,
          }}
        >
          <Image
            style={{ width: 80, height: 80, marginRight: 10 }}
            source={require("../assets/images/prinks.png")}
          />
          <TouchableOpacity
            onPress={() => {
              // setGameMode("prinks");
              // storeGameMode();
              navigation.navigate("GameOne", { gameMode: "prinksGamePrompts" });
            }}
            style={{
              backgroundColor: "#ed1e26",
              padding: 20,
              width: 200,
              height: 80,
            }}
          >
            <Text
              style={{
                color: "#111111",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                marginTop: 5,
              }}
            >
              Let's get prinking
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 260,
            marginBottom: 25,
          }}
        >
          <Image
            style={{ width: 80, height: 80, marginRight: 10 }}
            source={require("../assets/images/crazy.png")}
          />
          <TouchableOpacity
            onPress={() => {
              // setGameMode("crazy");
              // storeGameMode();
              navigation.navigate("GameOne", { gameMode: "crazyGamePrompts" });
            }}
            style={{
              backgroundColor: "#f3ce06",
              padding: 20,
              width: 200,
              height: 80,
            }}
          >
            <Text
              style={{
                color: "#111111",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                marginTop: 5,
              }}
            >
              Let's get crazy
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 260,
            // marginBottom: 350,
          }}
        >
          <Image
            style={{ width: 80, height: 80, marginRight: 10 }}
            source={require("../assets/images/flirty.png")}
          />
          <TouchableOpacity
            onPress={() => {
              // setGameMode("flirty");
              // storeGameMode();
              navigation.navigate("GameOne", { gameMode: "flirtyGamePrompts" });
            }}
            style={{
              backgroundColor: "#d70057",
              padding: 20,
              width: 200,
              height: 80,
            }}
          >
            <Text
              style={{
                color: "#111111",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                marginTop: 5,
              }}
            >
              Let's get flirty
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Button title="AI Personalised Game" onPress={() => navigation.navigate('PersonalisedGame')} color="#ed1e26"/> */}
      {/* <Button title="Getting Crazy" onPress={() => navigation.navigate('TabOne')}/>
      <Button title="Getting Flirty" onPress={() => navigation.navigate('TabOne')}/>
      <Button title="Versus Battles" onPress={() => navigation.navigate('TabOne')}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  greeting: {
    flexDirection: "row",
  },
});
