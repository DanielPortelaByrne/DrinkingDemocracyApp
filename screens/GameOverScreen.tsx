import { Button, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";

export default function GameOverScreen({
  route,
  navigation,
}: RootTabScreenProps<"GameOver">) {
  const { language } = route.params;
  const [gameOverText, setGameOverText] = useState("Game Over");
  const [moreGamesText, setMoreGamesText] = useState("More Games");
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  useEffect(() => {
    setLanguage(language);
    if (!fontsLoaded) {
      return undefined;
    }
  });
  const setLanguage = async (language: string) => {
    switch (language) {
      case "English": {
        setGameOverText("Game Over");
        setMoreGamesText("More Games");
        break;
      }
      case "Irish": {
        setGameOverText("Cluiche Críochnaithe");
        setMoreGamesText("Cluichí Breise");
        break;
      }
      case "Spanish": {
        setGameOverText("Game Over");
        setMoreGamesText("More Games");
        break;
      }
      default: {
        setGameOverText("Game Over");
        setMoreGamesText("More Games");
        break;
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Konstruktor",
          fontSize: 60,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {gameOverText}
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TabTwo", {
            language: language,
          })
        }
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
            fontFamily: "Konstruktor",
            textAlign: "center",
            textAlignVertical: "center",
            marginTop: 5,
          }}
        >
          {moreGamesText}
        </Text>
      </TouchableOpacity>
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
    marginVertical: 20,
  },
});
