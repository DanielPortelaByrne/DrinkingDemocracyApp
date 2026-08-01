import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  ScrollView,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { screen1Styles } from "../assets/styles/styles";
import { NameInput } from "../components/NameInput";
import { getNames } from "../components/nameStore";
import { Text, View } from "../components/Themed";
import {
  AppLanguage,
  DEFAULT_LANGUAGE,
} from "../constants/Languages";
import { RootTabScreenProps } from "../types";
import {
  loadLanguagePreference,
  saveLanguagePreference,
} from "../utils/language/languagePreferences";
import {
  getLanguageData,
  useLanguage,
} from "../utils/language/useLanguage";
import { showMessage } from "../utils/showMessage";
import {
  ensurePromptPacks,
  resetPromptHistory,
  storePrompts,
} from "../utils/storePrompts";

const languageOptions: {
  language: AppLanguage;
  image: number;
  accessibilityLabel: string;
}[] = [
  {
    language: "English",
    image: require("../assets/images/flags/uk.png"),
    accessibilityLabel: "Use English",
  },
  {
    language: "Irish",
    image: require("../assets/images/flags/ireland.png"),
    accessibilityLabel: "Úsáid Gaeilge",
  },
  {
    language: "Polish",
    image: require("../assets/images/flags/poland.png"),
    accessibilityLabel: "Użyj polskiego",
  },
  {
    language: "Spanish",
    image: require("../assets/images/flags/spain.png"),
    accessibilityLabel: "Usar español",
  },
];

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [language, setLanguage] = useState<AppLanguage>(DEFAULT_LANGUAGE);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isPreparing, setIsPreparing] = useState(true);
  const [imageSource, setImageSource] = useState(
    require("../assets/images/transparent_logo_glow_new_2.png")
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const { subTitle: subtitle, toast, player, contentLoadErrorText } =
    useLanguage(language);

  const glowDefault = require("../assets/images/transparent_logo_glow_new_2.png");
  const glowPressed = require("../assets/images/transparent_logo_glow_new_5.png");

  useEffect(() => {
    let isActive = true;

    const prepareInitialContent = async () => {
      try {
        const savedLanguage = await loadLanguagePreference();
        if (isActive) setLanguage(savedLanguage);
        await ensurePromptPacks(savedLanguage);
      } catch (error) {
        console.error("Unable to prepare game content", error);
        if (isActive) {
          showMessage(getLanguageData(DEFAULT_LANGUAGE).contentLoadErrorText);
        }
      } finally {
        if (isActive) setIsPreparing(false);
      }
    };

    void prepareInitialContent();
    return () => {
      isActive = false;
    };
  }, []);

  const selectLanguage = async (nextLanguage: AppLanguage) => {
    setDropdownVisible(false);
    if (nextLanguage === language) return;

    setIsPreparing(true);
    setLanguage(nextLanguage);
    try {
      await Promise.all([
        saveLanguagePreference(nextLanguage),
        resetPromptHistory(),
      ]);
      await storePrompts(nextLanguage);
    } catch (error) {
      console.error("Unable to change language", error);
      showMessage(getLanguageData(nextLanguage).contentLoadErrorText);
    } finally {
      setIsPreparing(false);
    }
  };

  const startGame = async () => {
    const validNames = getNames().filter(Boolean);
    if (validNames.length < 2) {
      showMessage(toast);
      return;
    }

    setIsPreparing(true);
    try {
      await ensurePromptPacks(language);
      navigation.navigate("TabTwo", { language });
    } catch (error) {
      console.error("Unable to start game", error);
      showMessage(contentLoadErrorText);
    } finally {
      setIsPreparing(false);
    }
  };

  return (
    <View style={screen1Styles.container as StyleProp<ImageStyle>}>
      <View style={screen1Styles.innerContainer as StyleProp<ImageStyle>}>
        <TouchableOpacity
          accessibilityLabel="Choose language"
          disabled={isPreparing}
          onPress={() => setDropdownVisible((visible) => !visible)}
        >
          <Ionicons name="language" size={32} color="#ed1e26" />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={screen1Styles.dropdownContainer as StyleProp<ViewStyle>}>
            {languageOptions.map((option) => (
              <TouchableOpacity
                accessibilityLabel={option.accessibilityLabel}
                key={option.language}
                onPress={() => void selectLanguage(option.language)}
                style={screen1Styles.flagButton}
              >
                <Image
                  source={option.image}
                  style={screen1Styles.flagImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Image
        source={require("../assets/images/title_logo.png")}
        style={screen1Styles.logo as StyleProp<ImageStyle>}
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
          contentContainerStyle={
            screen1Styles.scrollViewContentContainer as StyleProp<ViewStyle>
          }
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
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

      {isPreparing && <ActivityIndicator color="#ed1e26" size="large" />}
      <TouchableOpacity
        accessibilityLabel="Continue to game selection"
        disabled={isPreparing}
        onPress={() => void startGame()}
        onPressIn={() => setImageSource(glowPressed)}
        onPressOut={() => setImageSource(glowDefault)}
        style={screen1Styles.imageButton as StyleProp<ViewStyle>}
      >
        <Image
          source={imageSource}
          style={screen1Styles.bottomImage as StyleProp<ImageStyle>}
        />
      </TouchableOpacity>
    </View>
  );
}
