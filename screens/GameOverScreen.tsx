import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React from "react";
import { useLanguage } from "../utils/language/useLanguage";

export default function GameOverScreen({
  route,
  navigation,
}: RootTabScreenProps<"GameOver">) {
  const { language } = route.params;
  const { gameOverText, moreGamesText } = useLanguage(language);

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
