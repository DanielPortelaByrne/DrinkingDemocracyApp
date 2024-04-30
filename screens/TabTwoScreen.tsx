import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import React, { useEffect, useState } from "react";
import en from "../languages/en.json";
import ga from "../languages/ga.json";
import pl from "../languages/pl.json";
import es from "../languages/es.json";
import { LanguageData } from "../utils/language/LanguageData";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { screen2Styles } from "../assets/styles/styles";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

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
    <View style={screen2Styles.container}>
      <View style={screen2Styles.homeButton}>
        <TouchableOpacity onPress={() => navigation.navigate("TabOne")}>
          <Ionicons name="home-outline" size={32} color="#ed1e26" />
        </TouchableOpacity>
      </View>
      <View style={screen2Styles.titleView}>
        <Text style={screen2Styles.screenTitle}>{title}</Text>
        {/* <View style={screen2Styles.adBanner}>
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
        style={screen2Styles.chainImage}
      />

      <Image
        source={require("../assets/images/halo_red.png")}
        style={screen2Styles.haloImage}
      />
      <View style={screen2Styles.playerIconsContainer}>
        <View style={screen2Styles.playerIconsInnerContainer}>
          {names.map((name, index) => (
            <View
              style={screen2Styles.playerIconsInnerMostContainer}
              key={index}
            >
              <Ionicons name="person-circle" size={25} color="white" />
              <View style={screen2Styles.playerIcon}>
                <Text style={screen2Styles.playerIconText}>{name}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={screen2Styles.gameModesContainer}>
        <View style={screen2Styles.adBannerContainer}>
          {/* <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          /> */}
        </View>
        <View style={screen2Styles.gameModeSectionContainer}>
          <Image
            style={screen2Styles.gameModeSectionImage}
            source={require("../assets/images/prinks.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "prinkGamePrompts",
                language: language,
              });
            }}
            style={screen2Styles.prinksButton}
          >
            <Text style={screen2Styles.gameModeSectionText}>{prinksText}</Text>
          </TouchableOpacity>
        </View>
        <View style={screen2Styles.gameModeSectionContainer}>
          <Image
            style={screen2Styles.gameModeSectionImage}
            source={require("../assets/images/messy.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "crazyGamePrompts",
                language: language,
              });
            }}
            style={screen2Styles.messyButton}
          >
            <Text style={screen2Styles.gameModeSectionText}>{crazyText}</Text>
          </TouchableOpacity>
        </View>
        <View style={screen2Styles.gameModeSectionContainer}>
          <Image
            style={screen2Styles.gameModeSectionImage}
            source={require("../assets/images/flirty.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "flirtyGamePrompts",
                language: language,
              });
            }}
            style={screen2Styles.flirtyButton}
          >
            <Text style={screen2Styles.gameModeSectionText}>{flirtyText}</Text>
          </TouchableOpacity>
        </View>
        <View style={screen2Styles.gameModeSectionContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PromptSubmit", {
                language: language,
              });
            }}
            style={screen2Styles.promptSubmitButton}
          >
            <Text style={screen2Styles.promptSubmitText}>{sapText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
