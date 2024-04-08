import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import React, { useEffect, useState } from "react";
import en from "../languages/en.json";
import ga from "../languages/ga.json";
import pl from "../languages/pl.json";
import es from "../languages/es.json";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// Define an interface for language translations
interface LanguageData {
  addRuleButtonText: string;
  addRuleFieldText: string;
  addRuleButton2Text: string;
  newRuleTitle: string;
  addRuleToastText: string;
  addPlayerButtonText: string;
  addPlayerFieldText: string;
  addPlayerButton2Text: string;
  addPlayerToastText: string;
  firstCardText: string;
  quitGameTitle: string;
  quitGameText: string;
  quitGameOpt1: string;
  quitGameOpt2: string;
  title: string;
  prinksText: string;
  crazyText: string;
  flirtyText: string;
  sapText: string;
}

const languages: { [key: string]: Partial<LanguageData> } = {
  English: en,
  Irish: ga,
  Polish: pl,
  Spanish: es,
};

const selectRandomPrompts = async () => {
  const playedPrinks = await retrievePrinksPlayed();
  const playedCrazy = await retrieveCrazyPlayed();
  const playedFlirty = await retrieveFlirtyPlayed();
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
  console.log("Retrieved played prompts: ");
  for (let i = 0; i < playedPrinks.length; i++) {
    console.log("[" + (i + 1) + "] " + playedPrinks[i].text);
  }

  // Filter out already played prompts
  interface Prompt {
    text: string;
    category: string;
  }
  const filteredPrompts = prompts.filter((prompt: Prompt) => {
    return !playedPrinks.some(
      (playedPrompt: Prompt) => playedPrompt.text === prompt.text
    );
  });
  const promptsString = JSON.stringify(filteredPrompts);
  await AsyncStorage.setItem("prompts", promptsString);
  console.log("Prinks count after: " + filteredPrompts.length);

  const filteredCrazy = crazy.filter((crazy: Prompt) => {
    return !playedCrazy.some(
      (playedPrompt: Prompt) => playedPrompt.text === crazy.text
    );
  });
  const crazyString = JSON.stringify(filteredCrazy);
  await AsyncStorage.setItem("crazy", crazyString);
  console.log("Crazy count after: " + filteredCrazy.length);

  const filteredFlirty = flirty.filter((flirty: Prompt) => {
    return !playedFlirty.some(
      (playedPrompt: Prompt) => playedPrompt.text === flirty.text
    );
  });
  const flirtyString = JSON.stringify(filteredFlirty);
  await AsyncStorage.setItem("flirty", flirtyString);
  console.log("Flirty count after: " + filteredFlirty.length);

  // If there are no new prompts to select, reset the played prompts array
  if (filteredPrompts.length === 0 || filteredPrompts.length <= 30) {
    await AsyncStorage.removeItem("playedPrinksPrompts");
    console.log(
      "No more new unique prompts left to choose from, removing prompts history from async and starting fresh"
    );
  }
  if (filteredCrazy.length === 0 || filteredCrazy.length <= 30) {
    await AsyncStorage.removeItem("playedCrazyPrompts");
    console.log(
      "No more new unique prompts left to choose from, removing prompts history from async and starting fresh"
    );
  }
  if (filteredFlirty.length === 0 || filteredFlirty.length <= 30) {
    await AsyncStorage.removeItem("playedFlirtyPrompts");
    console.log(
      "No more new unique prompts left to choose from, removing prompts history from async and starting fresh"
    );
  }

  // Shuffle the filtered arrays
  filteredPrompts.sort(() => Math.random() - 0.5);
  filteredCrazy.sort(() => Math.random() - 0.5);
  filteredFlirty.sort(() => Math.random() - 0.5);

  // Select the first 30 prompts from the shuffled array
  const selectedPrompts = filteredPrompts.slice(0, 30);
  const selectedCrazyPrompts = filteredCrazy.slice(0, 30);
  const selectedFlirtyPrompts = filteredFlirty.slice(0, 30);
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
  // console.log("Prink Game Prompts: " + JSON.stringify(selectedPrompts));
  await AsyncStorage.setItem(
    "prinkGamePrompts",
    JSON.stringify(selectedPrompts)
  );
  // console.log("Crazy Game Prompts: " + JSON.stringify(selectedCrazyPrompts));
  await AsyncStorage.setItem(
    "crazyGamePrompts",
    JSON.stringify(selectedCrazyPrompts)
  );
  // console.log("Flirty Game Prompts: " + JSON.stringify(selectedFlirtyPrompts));
  await AsyncStorage.setItem(
    "flirtyGamePrompts",
    JSON.stringify(selectedFlirtyPrompts)
  );

  return { virusStartPositions, virusEndPositions };
};

const retrievePrompts = async () => {
  // Get the prompts from async storage
  const promptsString = await AsyncStorage.getItem("promptsPack");
  // Parse the string into an array of prompts
  const prompts = promptsString ? JSON.parse(promptsString) : [];
  // Return the array of prompts
  return prompts;
};

const retrieveCrazy = async () => {
  // Get the prompts from async storage
  const crazyString = await AsyncStorage.getItem("crazyPack");
  // Parse the string into an array of prompts
  const crazy = crazyString ? JSON.parse(crazyString) : [];
  // Return the array of prompts
  return crazy;
};

const retrieveFlirty = async () => {
  // Get the prompts from async storage
  const flirtyString = await AsyncStorage.getItem("flirtyPack");
  // Parse the string into an array of prompts
  const flirty = flirtyString ? JSON.parse(flirtyString) : [];
  // Return the array of prompts
  return flirty;
};

const retrieveVirus = async () => {
  // Get the prompts from async storage
  const virusString = await AsyncStorage.getItem("virusPack");
  // Parse the string into an array of promptsp
  const virus = virusString ? JSON.parse(virusString) : [];
  // Return the array of prompts
  return virus;
};

const retrieveVirusEnd = async () => {
  // Get the prompts from async storage
  const virusEndString = await AsyncStorage.getItem("virusendPack");
  // Parse the string into an array of prompts
  const virusend = virusEndString ? JSON.parse(virusEndString) : [];
  // Return the array of prompts
  return virusend;
};

const retrievePrinksPlayed = async () => {
  // Retrieve the array of already played prompts
  const playedPrinksPrompts = await AsyncStorage.getItem("playedPrinksPrompts");
  // Parse the string into an array of prompts
  const played = playedPrinksPrompts ? JSON.parse(playedPrinksPrompts) : [];
  // Return the array of prompts
  return played;
};

const retrieveCrazyPlayed = async () => {
  // Retrieve the array of already played prompts
  const playedCrazyPrompts = await AsyncStorage.getItem("playedCrazyPrompts");
  // Parse the string into an array of prompts
  const played = playedCrazyPrompts ? JSON.parse(playedCrazyPrompts) : [];
  // Return the array of prompts
  return played;
};

const retrieveFlirtyPlayed = async () => {
  // Retrieve the array of already played prompts
  const playedFlirtyPrompts = await AsyncStorage.getItem("playedFlirtyPrompts");
  // Parse the string into an array of prompts
  const played = playedFlirtyPrompts ? JSON.parse(playedFlirtyPrompts) : [];
  // Return the array of prompts
  return played;
};

export default function TabTwoScreen({
  route,
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const { language } = route.params;
  // const languageData: LanguageTranslations = languages[language];
  const [names, setNames] = useState(getNames());
  const [prinksText, setPrinksText] = useState("Let's get prinking");
  const [crazyText, setCrazyText] = useState("Let's get messy");
  const [flirtyText, setFlirtyText] = useState("Let's get flirty");
  const [sapText, setSapText] = useState("SUBMIT A PROMPT");
  const [title, setTitle] = useState("GAMES");

  console.log("Returned language:", language);

  useFocusEffect(
    React.useCallback(() => {
      setLanguage(language);
      setNames(getNames());
      selectRandomPrompts();
    }, [language])
  );

  const setLanguage = async (language: string) => {
    let languageData = languages[language];
    console.log("Passing: " + language);
    console.log("Reaching language set, languageData:" + languageData.title);

    // If the selected language is not available or not explicitly set, default to English
    if (!languageData) {
      languageData = languages["English"];
    }

    setTitle(languageData.title || "GAMES");
    setPrinksText(languageData.prinksText || "Let's get prinking");
    setCrazyText(languageData.crazyText || "Let's get messy");
    setFlirtyText(languageData.flirtyText || "Let's get flirty");
    setSapText(languageData.sapText || "SUBMIT A PROMPT");
  };

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
          <Ionicons name="home-outline" size={32} color="#ed1e26" />
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
          {title}
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
        source={require("../assets/images/chain.png")}
        style={{
          width: "100%",
          height: "40%",
          position: "absolute",
          top: "25%",
          zIndex: -1,
        }}
      />

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
          backgroundColor: "rgba(52, 52, 52, 0)",
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
            backgroundColor: "rgba(52, 52, 52, 0)",
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
            backgroundColor: "rgba(52, 52, 52, 0)",
          }}
        >
          <Image
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/prinks.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "prinkGamePrompts",
                language: language,
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
                fontSize: 16,
                textAlign: "center",
                lineHeight: 80,
              }}
            >
              {prinksText}
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
            backgroundColor: "rgba(52, 52, 52, 0)",
          }}
        >
          <Image
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/messy.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "crazyGamePrompts",
                language: language,
              });
            }}
            style={{
              backgroundColor: "#ed6c1e",
              width: "55%",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#111111",
                fontSize: 16,
                textAlign: "center",
                lineHeight: 80,
              }}
            >
              {crazyText}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            backgroundColor: "rgba(52, 52, 52, 0)",
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
                language: language,
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
                fontSize: 16,
                textAlign: "center",
                lineHeight: 80,
                // padding: 25,
              }}
            >
              {flirtyText}
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
              navigation.navigate("PromptSubmit", {
                language: language,
              });
            }}
            style={{
              backgroundColor: "#1c1c1c",
              // backgroundColor: "rgba(52, 52, 52, 0)",
              width: "77%",
              height: "100%",
              borderWidth: 2,
              borderColor: "white",
            }}
          >
            {/* <LinearGradient
              colors={["#000000", "#f3ce06", "#ed1e26"]}
              start={[0.5, 0.01]}
            > */}
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "white",
                fontSize: 26,
                textAlign: "center",
                lineHeight: 80,
                // padding: 25,
              }}
            >
              {sapText}
            </Text>
            {/* </LinearGradient> */}
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
