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
    // Save the prompts strings in async storage
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/prompts.json"
      );
      const data = await response.json();
      const promptsString = JSON.stringify(data);
      await AsyncStorage.setItem("prompts", promptsString);
      // console.log("Successfully fetched and stored data: " + promptsString);
    } catch (error) {
      console.error(error);
      console.log("prinks");
      const promptsString = JSON.stringify(prompts);
      await AsyncStorage.setItem("prompts", promptsString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/crazy.json"
      );
      const data = await response.json();
      const crazyString = JSON.stringify(data);
      await AsyncStorage.setItem("crazy", crazyString);
      // console.log("Successfully fetched and stored data: " + crazyString);
    } catch (error) {
      console.error(error);
      const crazyString = JSON.stringify(crazy);
      await AsyncStorage.setItem("crazy", crazyString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/flirty.json"
      );
      const data = await response.json();
      const flirtyString = JSON.stringify(data);
      await AsyncStorage.setItem("flirty", flirtyString);
      // console.log("Successfully fetched and stored data: " + flirtyString);
    } catch (error) {
      console.error(error);
      const flirtyString = JSON.stringify(flirty);
      await AsyncStorage.setItem("flirty", flirtyString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/virus.json"
      );
      const data = await response.json();
      const virusString = JSON.stringify(data);
      await AsyncStorage.setItem("virus", virusString);
      // console.log("Successfully fetched and stored data: " + virusString);
    } catch (error) {
      console.error(error);
      const virusString = JSON.stringify(virus);
      await AsyncStorage.setItem("virus", virusString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/virusend.json"
      );
      const data = await response.json();
      const virusEndString = JSON.stringify(data);
      await AsyncStorage.setItem("virusend", virusEndString);
      // console.log("Successfully fetched and stored data: " + virusEndString);
    } catch (error) {
      console.error(error);
      const virusEndString = JSON.stringify(virusend);
      await AsyncStorage.setItem("virusend", virusEndString);
    }
  } catch (error) {
    console.error(error);
  }
};

const selectRandomPrompts = async () => {
  const prompts = await retrievePrompts();
  const crazy = await retrieveCrazy();
  const flirty = await retrieveFlirty();
  const virus = await retrieveVirus();
  const virusend = await retrieveVirusEnd();

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
  // Shuffle the prompts array
  prompts.sort(() => Math.random() - 0.5);
  crazy.sort(() => Math.random() - 0.5);
  flirty.sort(() => Math.random() - 0.5);

  // Select the first 25 prompts from the shuffled array
  const selectedPrompts = prompts.slice(0, 50);
  const selectedCrazyPrompts = crazy.slice(0, 50);
  const selectedFlirtyPrompts = flirty.slice(0, 50);
  const selectedVirusPrompts = shuffledVirus.slice(0, 4);
  const selectedVirusEndPrompts = shuffledVirusEnd.slice(0, 4);

  // Keep track of where virus prompts are inserted
  let virusStartPositions = new Set();
  let virusEndPositions = new Set();

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
  // console.log(selectedPrompts);
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
  // const adUnitId = __DEV__
  //   ? TestIds.BANNER
  //   : "ca-app-pub-2156240493940672/1342308153";

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
        {/* <View style={{ position: "absolute", top: 70, left: -90 }}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View> */}
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
            marginTop: -100,
            marginBottom: 10,
            padding: 10,
          }}
        >
          {/* <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          /> */}
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
            source={require("../assets/images/prinks.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "prinksGamePrompts",
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
              navigation.navigate("GameOne", {
                gameMode: "crazyGamePrompts",
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
              Let's get crazy
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
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
              navigation.navigate("GameOne", {
                gameMode: "flirtyGamePrompts",
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PromptSubmit");
            }}
            style={{
              backgroundColor: "rgba(52, 52, 52, 0)",
              width: "77%",
              height: "100%",
              borderWidth: 5,
              borderColor: "white",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#ffffff",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 80,
                // padding: 25,
              }}
            >
              SUBMIT A PROMPT
            </Text>
          </TouchableOpacity>
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
