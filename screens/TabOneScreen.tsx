import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StyleProp,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  screen1Styles,
  nameInputComponentStyles,
} from "../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { prompts } from "../prompts";
import { crazy } from "../crazy";
import { flirty } from "../flirty";
import { virus } from "../virus";
import { virusend } from "../virusend";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { updateNames, getNames } from "../components/nameStore";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import en from "../languages/en.json";
import ga from "../languages/ga.json";
import pl from "../languages/pl.json";
import es from "../languages/es.json";
import { LanguageData } from "../utils/language/LanguageData";
var language = "English";

const languages: { [key: string]: Partial<LanguageData> } = {
  English: en,
  Irish: ga,
  Polish: pl,
  Spanish: es,
};

// Store the prompts in async storage
const storePrompts = async (language: string) => {
  try {
    // Convert the prompts array to a JSON string
    // Save the prompts strings in async storage
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/prompts.json"
      );
      const data = await response.json();
      const promptsString = JSON.stringify(data);
      await AsyncStorage.setItem("promptsPack", promptsString);
      console.log("Successfully fetched and stored data: " + promptsString);
    } catch (error) {
      console.error(error);
      console.log("prinks");
      const promptsString = JSON.stringify(prompts);
      await AsyncStorage.setItem("promptsPack", promptsString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/crazy.json"
      );
      const data = await response.json();
      const crazyString = JSON.stringify(data);
      await AsyncStorage.setItem("crazyPack", crazyString);
      console.log("Successfully fetched and stored data: " + crazyString);
    } catch (error) {
      console.error(error);
      const crazyString = JSON.stringify(crazy);
      await AsyncStorage.setItem("crazyPack", crazyString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/flirty.json"
      );
      const data = await response.json();
      const flirtyString = JSON.stringify(data);
      await AsyncStorage.setItem("flirtyPack", flirtyString);
      console.log("Successfully fetched and stored data: " + flirtyString);
    } catch (error) {
      console.error(error);
      const flirtyString = JSON.stringify(flirty);
      await AsyncStorage.setItem("flirtyPack", flirtyString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/virus.json"
      );
      const data = await response.json();
      const virusString = JSON.stringify(data);
      await AsyncStorage.setItem("virusPack", virusString);
      console.log("Successfully fetched and stored data: " + virusString);
    } catch (error) {
      console.error(error);
      const virusString = JSON.stringify(virus);
      await AsyncStorage.setItem("virusPack", virusString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/virusend.json"
      );
      const data = await response.json();
      const virusEndString = JSON.stringify(data);
      await AsyncStorage.setItem("virusendPack", virusEndString);
      console.log("Successfully fetched and stored data: " + virusEndString);
    } catch (error) {
      console.error(error);
      const virusEndString = JSON.stringify(virusend);
      await AsyncStorage.setItem("virusendPack", virusEndString);
    }
  } catch (error) {
    console.error(error);
  }
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  const glow1 = require("../assets/images/transparent_logo_glow_new_2.png");
  const glow2 = require("../assets/images/transparent_logo_glow_new_5.png");

  // Store the prompts in async storage when the component is mounted
  useEffect(() => {
    AsyncStorage.removeItem("playedPrinksPrompts");
    AsyncStorage.removeItem("playedCrazyPrompts");
    AsyncStorage.removeItem("playedFlirtyPrompts");
    AsyncStorage.removeItem("virusPack");
    AsyncStorage.removeItem("virusendPack");
    storePrompts("English");
    Promise.all([Image.prefetch(glow1.uri), Image.prefetch(glow2.uri)])
      .then(() => {
        setImageSource(glow1);
      })
      .catch((error) => {
        console.log("Error preloading image", error);
      });
  }, []);

  const setLanguage = async (language: string) => {
    let languageData = languages[language];
    console.log("Reaching new function with language: " + language);

    // If the selected language is not available or not explicitly set, default to English
    if (!languageData) {
      languageData = languages["English"];
    }

    setSubTitle(languageData.subTitle || "WHO'S SESHING");
    setToast(languageData.toast || "Enter at least 2 names!");
    setPlayer(languageData.player || "Player");
  };

  const handlePressIn = () => {
    setImageSource(glow2);
  };
  const handlePressOut = () => {
    setImageSource(glow1);
  };

  const [imageSource, setImageSource] = useState(glow1);

  const scrollViewRef = useRef<ScrollView>(null);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const [subtitle, setSubTitle] = useState("WHO'S SESHING");
  const [toast, setToast] = useState("Enter at least 2 names!");
  const [player, setPlayer] = useState("Player");

  if (!fontsLoaded) {
    return undefined;
  }

  const NameInput: React.FC<RootTabScreenProps<"TabOne">> = () => {
    const [names, setNames] = useState(getNames());
    useFocusEffect(
      React.useCallback(() => {
        setNames(getNames());
      }, [])
    );

    const handleNameChange = (text: string, index: number) => {
      // If the input text is not empty, add it to the list of names
      const newNames = [...names];
      newNames[index] = text;
      setNames(newNames);
      updateNames(newNames); // update the names in the name store
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    };

    const handleAddName = () => {
      setNames([...names, ""]);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
      const newNames = [...names];
      updateNames(newNames); // update the names in the name store
    };
    const handleRemoveName = () => {
      if (names.length > 1) {
        setNames(names.filter((_, index) => index !== names.length - 1));
        updateNames(names.filter((_, index) => index !== names.length - 1)); // update the names in the name store
      }
    };

    return (
      <View style={nameInputComponentStyles.container}>
        {names.map((name, index) => (
          <View style={nameInputComponentStyles.nameItem} key={index}>
            <TextInput
              placeholder={`${player} ${index + 1}`}
              value={name}
              onChangeText={(text) => handleNameChange(text, index)}
              style={screen1Styles.textInput as StyleProp<ImageStyle>}
              textAlign="center"
            />
          </View>
        ))}

        <View style={nameInputComponentStyles.buttonContainer}>
          {names.length > 1 && (
            <TouchableOpacity
              style={{
                ...screen1Styles.button,
                width: "25%",
                marginRight: 5,
              }}
              onPress={handleRemoveName}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ ...screen1Styles.button, width: "25%" }}
            onPress={handleAddName}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={screen1Styles.container as StyleProp<ImageStyle>}>
      <View style={screen1Styles.innerContainer as StyleProp<ImageStyle>}>
        <TouchableOpacity onPress={handleDropdownToggle}>
          <Ionicons name="language" size={32} color="#ed1e26" />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={screen1Styles.dropdownContainer as StyleProp<ViewStyle>}>
            <TouchableOpacity
              style={screen1Styles.flagButton}
              onPress={() => {
                setDropdownVisible(false);
                language = "English";
                AsyncStorage.removeItem("playedPrinksPrompts");
                AsyncStorage.removeItem("playedCrazyPrompts");
                AsyncStorage.removeItem("playedFlirtyPrompts");
                AsyncStorage.removeItem("virusPack");
                AsyncStorage.removeItem("virusendPack");
                AsyncStorage.setItem("language", language);
                storePrompts(language);
                setLanguage(language);
                console.log("Language set to: " + language);
              }}
            >
              <Image
                style={screen1Styles.flagImage}
                source={require("../assets/images/flags/uk.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={screen1Styles.flagButton}
              onPress={() => {
                setDropdownVisible(false);
                language = "Irish";
                AsyncStorage.setItem("language", language);
                AsyncStorage.removeItem("playedPrinksPrompts");
                AsyncStorage.removeItem("playedCrazyPrompts");
                AsyncStorage.removeItem("playedFlirtyPrompts");
                AsyncStorage.removeItem("virusPack");
                AsyncStorage.removeItem("virusendPack");
                storePrompts(language);
                setLanguage(language);
                console.log("Language set to: " + language);
              }}
            >
              <Image
                style={screen1Styles.flagImage}
                source={require("../assets/images/flags/ireland.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={screen1Styles.flagButton}
              onPress={() => {
                setDropdownVisible(false);
                language = "Polish";
                AsyncStorage.setItem("language", language);
                AsyncStorage.removeItem("playedPrinksPrompts");
                AsyncStorage.removeItem("playedCrazyPrompts");
                AsyncStorage.removeItem("playedFlirtyPrompts");
                AsyncStorage.removeItem("virusPack");
                AsyncStorage.removeItem("virusendPack");
                storePrompts(language);
                setLanguage(language);
                console.log("Language set to: " + language);
              }}
            >
              <Image
                style={screen1Styles.flagImage}
                source={require("../assets/images/flags/poland.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={screen1Styles.flagButton}
              onPress={() => {
                setDropdownVisible(false);
                language = "Spanish";
                AsyncStorage.setItem("language", language);
                AsyncStorage.removeItem("playedPrinksPrompts");
                AsyncStorage.removeItem("playedCrazyPrompts");
                AsyncStorage.removeItem("playedFlirtyPrompts");
                AsyncStorage.removeItem("virusPack");
                AsyncStorage.removeItem("virusendPack");
                storePrompts(language);
                setLanguage(language);
                console.log("Language set to: " + language);
              }}
            >
              <Image
                style={screen1Styles.flagImage}
                source={require("../assets/images/flags/spain.png")}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Image
        style={screen1Styles.logo as StyleProp<ImageStyle>}
        source={require("../assets/images/title_logo.png")}
      />
      <Image
        source={require("../assets/images/halo.png")}
        style={screen1Styles.backgroundImage as StyleProp<ImageStyle>}
      />
      <View
        style={
          screen1Styles.outerScrollViewContentContainer as StyleProp<ViewStyle>
        }
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            screen1Styles.scrollViewContentContainer as StyleProp<ViewStyle>
          }
        >
          <View
            style={screen1Styles.subtitleTextContainer as StyleProp<ViewStyle>}
          >
            <Text style={screen1Styles.subtitleText as StyleProp<TextStyle>}>
              {subtitle}
            </Text>
            <NameInput navigation={navigation} scrollViewRef={scrollViewRef} />
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
        style={screen1Styles.imageButton}
        onPress={() => {
          if (getNames().length > 1 && getNames()[0].length > 0) {
            navigation.navigate("TabTwo", {
              language: language,
            });
          } else {
            ToastAndroid.show(toast, ToastAndroid.SHORT);
          }
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          source={imageSource}
          style={screen1Styles.bottomImage as StyleProp<ImageStyle>}
        />
      </TouchableOpacity>
    </View>
  );
}
