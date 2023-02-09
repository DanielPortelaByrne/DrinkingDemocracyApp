import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const retrievePrompts = async () => {
  // Get the prompts from async storage
  const promptsString = await AsyncStorage.getItem("prompts");
  // Parse the string into an array of prompts
  const prompts = promptsString ? JSON.parse(promptsString) : [];
  // Return the array of prompts
  return prompts;
};

const retrieveCrazy = async () => {
  // Get the prompts from async storage
  const crazyString = await AsyncStorage.getItem("crazy");
  // Parse the string into an array of prompts
  const crazy = crazyString ? JSON.parse(crazyString) : [];
  // Return the array of prompts
  return crazy;
};

const retrieveFlirty = async () => {
  // Get the prompts from async storage
  const flirtyString = await AsyncStorage.getItem("flirty");
  // Parse the string into an array of prompts
  const flirty = flirtyString ? JSON.parse(flirtyString) : [];
  // Return the array of prompts
  return flirty;
};

const retrieveVirus = async () => {
  // Get the prompts from async storage
  const virusString = await AsyncStorage.getItem("virus");
  // Parse the string into an array of prompts
  const virus = virusString ? JSON.parse(virusString) : [];
  // Return the array of prompts
  return virus;
};

const retrieveVirusEnd = async () => {
  // Get the prompts from async storage
  const virusEndString = await AsyncStorage.getItem("virusend");
  // Parse the string into an array of prompts
  const virusend = virusEndString ? JSON.parse(virusEndString) : [];
  // Return the array of prompts
  return virusend;
};

export default function DevScreen({
  navigation,
}: RootTabScreenProps<"DevScreen">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 70, left: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("TabTwo")}>
          <Ionicons name="home" size={32} color="#ed1e26" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          top: 60,
        }}
      >
        <Text
          style={{
            fontFamily: "Konstruktor",
            fontSize: 35,
            textAlign: "center",
          }}
        >
          EDIT PROMPTS
        </Text>
      </View>
      <Image
        source={require("../assets/images/halo_red.png")}
        style={{
          width: "100%",
          height: "40%",
          position: "absolute",
          bottom: -80,
          zIndex: -1,
        }}
      />
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: 50,
          backgroundColor: "rgba(52, 52, 52, 0)",
        }}
      ></View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/prinks.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "prinksGamePrompts",
              });
            }}
            style={{
              backgroundColor: "#ed1e26",
              width: "55%",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#111111",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 80,
              }}
            >
              prinks prompts
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/crazy.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "crazyGamePrompts",
              });
            }}
            style={{
              backgroundColor: "#f3ce06",
              width: "55%",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#111111",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 80,
              }}
            >
              crazy prompts
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/flirty.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "flirtyGamePrompts",
              });
            }}
            style={{
              backgroundColor: "#d70057",
              width: "55%",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#111111",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 80,
              }}
            >
              flirty prompts
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: "20%", height: "100%", marginRight: 10 }}
            source={require("../assets/images/flirty.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameOne", {
                gameMode: "flirtyGamePrompts",
              });
            }}
            style={{
              backgroundColor: "#008e72",
              width: "55%",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#111111",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 80,
              }}
            >
              virus prompts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 48,
    fontWeight: "bold",
  },
  greeting: {
    flexDirection: "row",
  },
});
