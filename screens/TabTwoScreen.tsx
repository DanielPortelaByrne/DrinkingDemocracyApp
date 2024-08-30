import {
  Image,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import { screen2Styles } from "../assets/styles/styles";
import { useLanguage } from "../utils/language/useLanguage";
import { selectRandomPrompts } from "../utils/selectRandomPrompts";
import { getCategoryAssets } from "../utils/language/getCategoryAssets";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

export default function TabTwoScreen({
  route,
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const { language } = route.params;
  const { categoryImages } = getCategoryAssets(language);
  const { prinksText, crazyText, flirtyText, sapText, title, setLanguage } =
    useLanguage();
  const [names, setNames] = useState(getNames());

  console.log("Returned language:", language);

  useFocusEffect(
    React.useCallback(() => {
      setLanguage(language);
      setNames(getNames());
      selectRandomPrompts();
    }, [language])
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
    <View style={screen2Styles.container as StyleProp<ViewStyle>}>
      <View style={screen2Styles.homeButton as StyleProp<ViewStyle>}>
        <TouchableOpacity onPress={() => navigation.navigate("TabOne")}>
          <Ionicons name="home-outline" size={32} color="#ed1e26" />
        </TouchableOpacity>
      </View>
      <View style={screen2Styles.titleView as StyleProp<ViewStyle>}>
        <Text style={screen2Styles.screenTitle as StyleProp<TextStyle>}>
          {title}
        </Text>
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
        style={screen2Styles.chainImage as StyleProp<ImageStyle>}
      />

      <Image
        source={require("../assets/images/halo_red.png")}
        style={screen2Styles.haloImage as StyleProp<ImageStyle>}
      />
      <View style={screen2Styles.playerIconsContainer as StyleProp<ViewStyle>}>
        <View
          style={
            screen2Styles.playerIconsInnerContainer as StyleProp<ViewStyle>
          }
        >
          {names.map((name, index) => (
            <View
              style={
                screen2Styles.playerIconsInnerMostContainer as StyleProp<ViewStyle>
              }
              key={index}
            >
              <Ionicons name="person-circle" size={25} color="white" />
              <View style={screen2Styles.playerIcon}>
                <Text
                  style={screen2Styles.playerIconText as StyleProp<TextStyle>}
                >
                  {name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={screen2Styles.gameModesContainer as StyleProp<ViewStyle>}>
        {/* <View style={screen2Styles.adBannerContainer as StyleProp<ViewStyle>}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View> */}
        <View
          style={screen2Styles.gameModeSectionContainer as StyleProp<ViewStyle>}
        >
          <Image
            style={screen2Styles.gameModeSectionImage as StyleProp<ImageStyle>}
            source={require("../assets/images/prinks.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "prinkGamePrompts",
                language: language,
                categoryImages: categoryImages,
              });
            }}
            style={screen2Styles.prinksButton as StyleProp<ViewStyle>}
          >
            <Text
              style={screen2Styles.gameModeSectionText as StyleProp<TextStyle>}
            >
              {prinksText}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={screen2Styles.gameModeSectionContainer as StyleProp<ViewStyle>}
        >
          <Image
            style={screen2Styles.gameModeSectionImage as StyleProp<ImageStyle>}
            source={require("../assets/images/messy.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "crazyGamePrompts",
                language: language,
                categoryImages: categoryImages,
              });
            }}
            style={screen2Styles.messyButton as StyleProp<ViewStyle>}
          >
            <Text
              style={screen2Styles.gameModeSectionText as StyleProp<TextStyle>}
            >
              {crazyText}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={screen2Styles.gameModeSectionContainer as StyleProp<ViewStyle>}
        >
          <Image
            style={screen2Styles.gameModeSectionImage as StyleProp<ImageStyle>}
            source={require("../assets/images/flirty.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "flirtyGamePrompts",
                language: language,
                categoryImages: categoryImages,
              });
            }}
            style={screen2Styles.flirtyButton as StyleProp<ViewStyle>}
          >
            <Text
              style={screen2Styles.gameModeSectionText as StyleProp<TextStyle>}
            >
              {flirtyText}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={screen2Styles.gameModeSectionContainer as StyleProp<TextStyle>}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PromptSubmit", {
                language: language,
              });
            }}
            style={screen2Styles.promptSubmitButton as StyleProp<TextStyle>}
          >
            <Text
              style={screen2Styles.promptSubmitText as StyleProp<TextStyle>}
            >
              {sapText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
