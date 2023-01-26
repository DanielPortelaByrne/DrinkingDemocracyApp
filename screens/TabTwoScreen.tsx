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
import { virus } from "../virus";
import { virusend } from "../virusend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";
// import { useFocusEffect } from "react-navigation";
// import "react-native-gesture-handler";

// Store the prompts in async storage
const storePrompts = async () => {
  try {
    // Convert the prompts array to a JSON string
    const promptsString = JSON.stringify(prompts);
    const crazyString = JSON.stringify(crazy);
    const flirtyString = JSON.stringify(flirty);
    const virusString = JSON.stringify(virus);
    const virusEndString = JSON.stringify(virusend);

    // Save the prompts strings in async storage
    await AsyncStorage.setItem("prompts", promptsString);
    await AsyncStorage.setItem("crazy", crazyString);
    await AsyncStorage.setItem("flirty", flirtyString);
    await AsyncStorage.setItem("virus", virusString);
    await AsyncStorage.setItem("virusend", virusEndString);
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
  const virus = await retrieveVirus();
  const virusend = await retrieveVirusEnd();
  // console.log(virus);
  // console.log("Prompts list length: ", prompts.length);
  // console.log("Crazy prompts list length: ", crazy.length);
  // console.log("Flirty prompts list length: ", flirty.length);

  const indices = [];
  for (let i = 0; i < virus.length; i++) {
    if (i % 2 === 0) {
      indices.push(i);
    }
  }
  indices.sort(() => Math.random() - 0.5);

  const shuffledVirus = [];
  const shuffledVirusEnd = [];
  for (let i = 0; i < indices.length; i++) {
    if (indices[i] + 1 < virus.length) {
      shuffledVirus.push(virus[indices[i]]);
      shuffledVirusEnd.push(virusend[indices[i]]);
      shuffledVirus.push(virus[indices[i] + 1]);
      shuffledVirusEnd.push(virusend[indices[i] + 1]);
    }
  }
  // console.log(shuffledVirus);

  // Shuffle the prompts array
  prompts.sort(() => Math.random() - 0.5);
  crazy.sort(() => Math.random() - 0.5);
  flirty.sort(() => Math.random() - 0.5);
  // virus.sort(() => Math.random() - 0.5);

  // Select the first 25 prompts from the shuffled array
  const selectedPrompts = prompts.slice(0, 50);
  const selectedCrazyPrompts = crazy.slice(0, 50);
  const selectedFlirtyPrompts = flirty.slice(0, 50);
  const selectedVirusPrompts = shuffledVirus.slice(0, 6);
  const selectedVirusEndPrompts = shuffledVirusEnd.slice(0, 6);
  // console.log(selectedVirusPrompts);
  // console.log(selectedVirusEndPrompts);
  // Keep track of where virus prompts are inserted
  let virusStartPositions = new Set();
  let virusEndPositions = new Set();
  // let virusPromptsOrder = [];

  for (let i = 0; i < selectedVirusPrompts.length; i++) {
    const randomPosition = Math.floor(Math.random() * selectedPrompts.length);
    selectedPrompts.splice(randomPosition, 0, selectedVirusPrompts[i]);
    selectedCrazyPrompts.splice(randomPosition, 0, selectedVirusPrompts[i]);
    selectedFlirtyPrompts.splice(randomPosition, 0, selectedVirusPrompts[i]);

    const virusEndInsertionIndex =
      5 +
      Math.floor(
        Math.random() * (selectedPrompts.length - (randomPosition + 1))
      );
    const virusEndPosition = randomPosition + virusEndInsertionIndex + 1;
    selectedPrompts.splice(virusEndPosition, 0, selectedVirusEndPrompts[i]);
    selectedCrazyPrompts.splice(
      virusEndPosition,
      0,
      selectedVirusEndPrompts[i]
    );
    selectedFlirtyPrompts.splice(
      virusEndPosition,
      0,
      selectedVirusEndPrompts[i]
    );
  }
  // for (let i = 0; i < virusPromptsOrder.length; i++) {
  //   console.log(`Index: ${i}, Value: ${virusPromptsOrder[i].prompt.text}`);
  // }
  // console.log(
  //   "Selected prompts length after addtions: " + selectedPrompts.length
  // );
  // console.log("Virus start array postions: " + Array.from(virusStartPositions));
  // console.log("Virus end array postions: " + Array.from(virusEndPositions));
  // for (let i = 0; i < selectedPrompts.length; i++) {
  //   console.log(`Index: ${i}, Value: ${selectedPrompts[i]}`);
  // }
  console.log(selectedPrompts);
  // // Store the selected games prompts in async storage
  // await AsyncStorage.setItem(
  //   "virusGamePrompts",
  //   JSON.stringify(selectedVirusPrompts)
  // );
  // await AsyncStorage.setItem(
  //   "virusEndGamePrompts",
  //   JSON.stringify(selectedVirusEndPrompts)
  // );
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
  // console.log(virusStartPositions);
  // console.log(virusEndPositions);

  return { virusStartPositions, virusEndPositions };
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

const retrieveVirus = async () => {
  // Get the prompts from async storage
  const virusString = await AsyncStorage.getItem("virus");
  // Parse the string into an array of prompts
  const virus = virusString ? JSON.parse(virusString) : [];
  // Return the array of prompts
  return virus;
};

const retrieveVirusEnd = async () => {
  // Get the prompts from async storage
  const virusEndString = await AsyncStorage.getItem("virusend");
  // Parse the string into an array of prompts
  const virusend = virusEndString ? JSON.parse(virusEndString) : [];
  // Return the array of prompts
  return virusend;
};

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const [names, setNames] = useState(getNames());
  // const [virusStartPositions, setVirusStartPositions] = useState([]);
  // const [virusEndPositions, setVirusEndPositions] = useState([]);

  // const { virusStartPositions, virusEndPositions } = selectRandomPrompts();

  // Store the prompts in async storage when the component is mounted
  useEffect(() => {
    storePrompts();
    // setNames(getNames());
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setNames(getNames());
      selectRandomPrompts();
    }, [])
  );

  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  // // call the selectRandomPrompts function and use the returned values to set the state
  // useEffect(() => {
  //   selectRandomPrompts().then(({ virusStartPositions, virusEndPositions }) => {
  //     virusStartPositions = virusStartPositions;
  //     virusEndPositions = virusEndPositions;
  //   });
  // }, []);

  // console.log(virusStartPositions);

  // const names = getNames(); // retrieve the names from the name store
  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 70, left: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("TabOne")}>
          <Ionicons name="home" size={32} color="#ed1e26" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          top: 60,
        }}
      >
        <Text
          style={{
            fontFamily: "Konstruktor",
            fontSize: 48,
            textAlign: "center",
          }}
        >
          GAMES
        </Text>
      </View>
      <Image
        source={require("../assets/images/halo_red.png")}
        style={{
          width: "100%",
          height: "40%",
          position: "absolute",
          bottom: -80,
          zIndex: -1,
        }}
      />
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: 50,
          backgroundColor: "rgba(52, 52, 52, 0)",
        }}
      >
        {/* <Text
          style={{
            fontFamily: "Konstruktor",
            fontSize: 15,
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          Players
        </Text> */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: "rgba(52, 52, 52, 0)",
            // borderColor: "white",
            // borderWidth: 2,
            // backgroundColor: "#000000",
          }}
        >
          {/* <Image
            source={require("../assets/images/halo_red.png")}
            style={{
              // width: "200%",
              // height: "450%",
              position: "absolute",
              // bottom: -130,
              zIndex: -1,
            }}
          /> */}
          {names.map((name, index) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
                justifyContent: "center",
                zIndex: 2,
                backgroundColor: "rgba(52, 52, 52, 0)",
                // backgroundColor: "#000000",
              }}
              key={index}
            >
              <Ionicons name="person-circle" size={25} color="white" />
              <View
                style={{
                  paddingBottom: 8,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 4,
                  zIndex: 2,
                  // backgroundColor: "rgba(52, 52, 52, 0)",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Konstruktor",
                    color: "#ffff",
                    textAlign: "center",
                    fontSize: 13,
                    zIndex: 2,
                  }}
                >
                  {name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // marginTop: 100,
          // marginBottom: 200,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 260,
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/prinks.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "prinksGamePrompts",
                // virusStartPositions,
                // virusEndPositions,
              });
            }}
            style={{
              backgroundColor: "#ed1e26",
              width: "55%",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#111111",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 80,
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
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/crazy.png")}
          />
          <TouchableOpacity
            onPress={() => {
              // setGameMode("crazy");
              // storeGameMode();
              navigation.navigate("GameOne", {
                gameMode: "crazyGamePrompts",
                // virusStartPositions,
                // virusEndPositions,
              });
            }}
            style={{
              backgroundColor: "#f3ce06",
              width: "55%",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#111111",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 80,
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
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/flirty.png")}
          />
          <TouchableOpacity
            onPress={() => {
              // setGameMode("flirty");
              // storeGameMode();
              navigation.navigate("GameOne", {
                gameMode: "flirtyGamePrompts",
                // virusStartPositions,
                // virusEndPositions,
              });
            }}
            style={{
              backgroundColor: "#d70057",
              width: "55%",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#111111",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 80,
                // padding: 25,
              }}
            >
              Let's get flirty
            </Text>
          </TouchableOpacity>
          {/* <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          /> */}
        </View>
      </View>
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
    fontSize: 48,
    fontWeight: "bold",
  },
  greeting: {
    flexDirection: "row",
  },
});
