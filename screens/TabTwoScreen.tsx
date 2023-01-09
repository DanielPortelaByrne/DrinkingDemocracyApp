import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { getNames } from "../components/nameStore";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { prompts } from "../prompts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
// import { useFocusEffect } from "react-navigation";
// import "react-native-gesture-handler";

const selectRandomPrompts = async () => {
  console.log("Running random prompts");
  // Retrieve the prompts from async storage
  const prompts = await retrievePrompts();

  // Shuffle the prompts array
  prompts.sort(() => Math.random() - 0.5);

  // Select the first 15 prompts from the shuffled array
  const selectedPrompts = prompts.slice(0, 15);

  // Print the selected prompts to the console
  console.log("Random prompts list length: ", selectedPrompts.length);
  // console.log(selectedPrompts);

  // Store the selected prompts in async storage
  await AsyncStorage.setItem("gamePrompts", JSON.stringify(selectedPrompts));
};

const retrievePrompts = async () => {
  // Get the prompts from async storage
  const promptsString = await AsyncStorage.getItem("prompts");
  // Parse the string into an array of prompts
  const prompts = promptsString ? JSON.parse(promptsString) : [];
  // Return the array of prompts
  return prompts;
};

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  useFocusEffect(
    React.useCallback(() => {
      selectRandomPrompts();
    }, [])
  );

  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const names = getNames(); // retrieve the names from the name store
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 70, left: 30 }}
        onPress={() => navigation.navigate("TabOne")}
      >
        <Ionicons name="ios-home" size={32} color="red" />
      </TouchableOpacity>
      <View style={{ alignSelf: "center" }}>
        <Text
          style={{
            fontFamily: "Konstruktor",
            fontSize: 50,
            textAlign: "center",
          }}
        >
          Games
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          Players:
          {names.map((name, index) => (
            <Text key={index}>
              {" "}
              {name}
              {index === names.length - 1 ? "" : ","}
            </Text>
          ))}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 200,
          marginBottom: 200,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 260,
            marginBottom: 25,
          }}
        >
          <Image
            style={{ width: 80, height: 80, marginRight: 10 }}
            source={require("../assets/images/prinks.png")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("GameOne")}
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
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                marginTop: 5,
              }}
            >
              Let's get prinking
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 260,
            marginBottom: 25,
          }}
        >
          <Image
            style={{ width: 80, height: 80, marginRight: 10 }}
            source={require("../assets/images/crazy.png")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("GameOne")}
            style={{
              backgroundColor: "#f3ce06",
              padding: 20,
              width: 200,
              height: 80,
            }}
          >
            <Text
              style={{
                color: "#111111",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                marginTop: 5,
              }}
            >
              Let's get crazy
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 260,
            // marginBottom: 350,
          }}
        >
          <Image
            style={{ width: 80, height: 80, marginRight: 10 }}
            source={require("../assets/images/flirty.png")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("GameOne")}
            style={{
              backgroundColor: "#d70057",
              padding: 20,
              width: 200,
              height: 80,
            }}
          >
            <Text
              style={{
                color: "#111111",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                marginTop: 5,
              }}
            >
              Let's get flirty
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  greeting: {
    flexDirection: "row",
  },
});
