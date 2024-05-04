import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StyleProp,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";
import { screen1Styles } from "../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import { useFonts } from "expo-font";
import { NameInput } from "../components/NameInput";
import { resetPrompts, storePrompts } from "../utils/storePrompts";
import { useLanguage } from "../utils/language/useLanguage";
var language = "English";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  const { subtitle, toast, player, setLanguage } = useLanguage();

  const glow1 = require("../assets/images/transparent_logo_glow_new_2.png");
  const glow2 = require("../assets/images/transparent_logo_glow_new_5.png");

  // Store the prompts in async storage when the component is mounted
  useEffect(() => {
    resetPrompts();
    storePrompts("English");
    Promise.all([Image.prefetch(glow1.uri), Image.prefetch(glow2.uri)])
      .then(() => {
        setImageSource(glow1);
      })
      .catch((error) => {
        console.log("Error preloading image", error);
      });
  }, []);

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

  if (!fontsLoaded) {
    return undefined;
  }

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
                resetPrompts();
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
                resetPrompts();
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
                resetPrompts();
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
                resetPrompts();
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
            <NameInput scrollViewRef={scrollViewRef} player={player} />
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
        style={screen1Styles.imageButton as StyleProp<ViewStyle>}
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
