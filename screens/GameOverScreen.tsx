import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { useLanguage } from "../utils/language/useLanguage";
var language = "English";

export default function GameOverScreen({
  route,
  navigation,
}: RootTabScreenProps<"GameOver">) {
  const { language } = route.params;
  // const [gameOverText, setGameOverText] = useState("Game Over");
  // const [moreGamesText, setMoreGamesText] = useState("More Games");
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  const { gameOverText, moreGamesText, setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage(language);
    if (!fontsLoaded) {
      return undefined;
    }
  });

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
