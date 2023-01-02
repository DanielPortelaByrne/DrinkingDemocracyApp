import { Button, StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const names = getNames(); // retrieve the names from the name store
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 70, left: 30 }}
        onPress={() => navigation.navigate("TabOne")}
      >
        <Ionicons name="ios-home" size={32} color="red" />
      </TouchableOpacity>
      <Text style={styles.title}>Games</Text>
      <Text style={{ flexDirection: "row" }}>
        Welcome
        {names.map((name, index) => (
          <Text key={index}>
            {" "}
            {name}
            {index === names.length - 1 ? "" : ","}
          </Text>
        ))}
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="#111111" />
      {/* <EditScreenInfo path="/screens/GamesScreen.tsx" /> */}
      <Button
        title="Start Game One"
        onPress={() => navigation.navigate("GameOne")}
        color="#ed1e26"
      />
      {/* <Button title="AI Personalised Game" onPress={() => navigation.navigate('PersonalisedGame')} color="#ed1e26"/> */}
      {/* <Button title="Getting Crazy" onPress={() => navigation.navigate('TabOne')}/>
      <Button title="Getting Flirty" onPress={() => navigation.navigate('TabOne')}/>
      <Button title="Versus Battles" onPress={() => navigation.navigate('TabOne')}/> */}
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  greeting: {
    flexDirection: "row",
  },
});
