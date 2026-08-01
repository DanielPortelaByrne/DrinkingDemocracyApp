import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getCategoryAssets } from "../utils/language/getCategoryAssets";
import { useLanguage } from "../utils/language/useLanguage";
import {
  PersonalisedPack,
  selectPersonalisedPrompts,
} from "../utils/selectRandomPrompts";
import { showMessage } from "../utils/showMessage";
import { ensurePromptPacks } from "../utils/storePrompts";

export default function PersonalisedGameScreen({
  route,
  navigation,
}: RootTabScreenProps<"PersonalisedGame">) {
  const { language } = route.params;
  const {
    prinksText,
    crazyText,
    flirtyText,
    personalisedTitle,
    personalisedInstructions,
    personalisedStartText,
    personalisedValidationText,
    contentLoadErrorText,
  } = useLanguage(language);
  const [selectedPacks, setSelectedPacks] = useState<PersonalisedPack[]>([]);
  const [isPreparing, setIsPreparing] = useState(false);

  const options: { pack: PersonalisedPack; label: string; color: string }[] = [
    { pack: "prompts", label: prinksText, color: "#f3ce06" },
    { pack: "crazy", label: crazyText, color: "#ed6c1e" },
    { pack: "flirty", label: flirtyText, color: "#ed1e26" },
  ];

  const togglePack = (pack: PersonalisedPack) => {
    setSelectedPacks((current) =>
      current.includes(pack)
        ? current.filter((selected) => selected !== pack)
        : [...current, pack]
    );
  };

  const startPersonalisedGame = async () => {
    if (!selectedPacks.length) {
      showMessage(personalisedValidationText);
      return;
    }

    setIsPreparing(true);
    try {
      await ensurePromptPacks(language);
      await selectPersonalisedPrompts(selectedPacks);
      navigation.navigate("GameOne", {
        gameMode: "personalisedGamePrompts",
        language,
        categoryImages: getCategoryAssets().categoryImages,
      });
    } catch (error) {
      console.error("Unable to prepare personalised game", error);
      showMessage(contentLoadErrorText);
    } finally {
      setIsPreparing(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityLabel="Back to games"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={30} color="#ffffff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{personalisedTitle}</Text>
        <Text style={styles.instructions}>{personalisedInstructions}</Text>

        {options.map(({ pack, label, color }) => {
          const isSelected = selectedPacks.includes(pack);
          return (
            <TouchableOpacity
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
              key={pack}
              onPress={() => togglePack(pack)}
              style={[
                styles.option,
                isSelected && {
                  backgroundColor: color,
                  borderColor: color,
                },
              ]}
            >
              <Ionicons
                name={isSelected ? "checkbox" : "square-outline"}
                size={28}
                color={isSelected ? "#111111" : "#ffffff"}
              />
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          disabled={isPreparing}
          onPress={() => void startPersonalisedGame()}
          style={[styles.startButton, isPreparing && styles.disabled]}
        >
          {isPreparing ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.startButtonText}>{personalisedStartText}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
  },
  backButton: {
    left: 24,
    padding: 12,
    position: "absolute",
    top: 48,
    zIndex: 1,
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    padding: 28,
  },
  title: {
    color: "#ffffff",
    fontFamily: "Konstruktor",
    fontSize: 42,
    marginBottom: 16,
    textAlign: "center",
  },
  instructions: {
    color: "#ffffff",
    fontSize: 17,
    marginBottom: 28,
    maxWidth: 420,
    textAlign: "center",
  },
  option: {
    alignItems: "center",
    backgroundColor: "#292929",
    borderColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 2,
    flexDirection: "row",
    marginBottom: 14,
    maxWidth: 420,
    padding: 18,
    width: "100%",
  },
  optionText: {
    color: "#ffffff",
    flex: 1,
    fontFamily: "Konstruktor",
    fontSize: 21,
    marginLeft: 14,
  },
  optionTextSelected: {
    color: "#111111",
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "#ed1e26",
    borderRadius: 25,
    marginTop: 18,
    maxWidth: 420,
    paddingHorizontal: 24,
    paddingVertical: 18,
    width: "100%",
  },
  startButtonText: {
    color: "#ffffff",
    fontFamily: "Konstruktor",
    fontSize: 20,
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});
