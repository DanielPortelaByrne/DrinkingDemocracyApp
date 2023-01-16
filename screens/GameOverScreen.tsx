import { Button, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";

export default function GameOverScreen({
  navigation,
}: RootTabScreenProps<"GameOver">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
    // AGENCYR: require("../assets/fonts/AGENCYB.TTF"),
  });

  useEffect(() => {
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
        Game Over
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("TabTwo")}
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
          More Games
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
