import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { updateNames, getNames } from "../components/nameStore";
import { useFonts } from "expo-font";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  const scrollViewRef = useRef<ScrollView>(null);

  if (!fontsLoaded) {
    return undefined;
  }

  const NameInput: React.FC<RootTabScreenProps<"TabOne">> = () => {
    const [names, setNames] = useState<string[]>([""]);

    const handleNameChange = (text: string, index: number) => {
      // If the input text is not empty, add it to the list of names
      const newNames = [...names];
      newNames[index] = text;
      setNames(newNames);
      updateNames(newNames); // update the names in the name store
    };

    const handleAddName = () => {
      setNames([...names, ""]);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
      const newNames = [...names];
      updateNames(newNames); // update the names in the name store
    };
    const handleRemoveName = () => {
      if (names.length > 1) {
        setNames(names.filter((_, index) => index !== names.length - 1));
        updateNames(names.filter((_, index) => index !== names.length - 1)); // update the names in the name store
      }
    };

    return (
      <View style={{ justifyContent: "center" }}>
        {names.map((name, index) => (
          <View style={{ marginTop: 2.5, marginBottom: 2.5 }} key={index}>
            <TextInput
              placeholder={`Player ${index + 1}`}
              value={name}
              onChangeText={(text) => handleNameChange(text, index)}
              style={styles.textInput}
              textAlign="center"
            />
          </View>
        ))}
        <View style={{ marginTop: 5, flexDirection: "row" }}>
          {names.length > 1 && (
            <TouchableOpacity
              style={{ ...styles.button, width: "25%", marginRight: 5 }}
              onPress={handleRemoveName}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textAlign: "center",
                  lineHeight: 27,
                }}
              >
                -
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ ...styles.button, width: "25%" }}
            onPress={handleAddName}
          >
            <Text
              style={{
                textAlign: "center",
                lineHeight: 27,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/title_logo.png")}
      />

      {/* <StatusBar style="auto" /> */}

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "Konstruktor",
              fontSize: 20,
              textAlign: "center",
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            WHO'S SESHING?
          </Text>
          <NameInput navigation={navigation} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          bottom: -35,
        }}
        onPress={() => {
          navigation.navigate("TabTwo");
        }}
      >
        <View
          style={{
            borderColor: "#fdd006",
            borderWidth: 2,
            padding: 10,
            borderRadius: 25,
            width: 170,
          }}
        >
          <Text
            style={{
              fontFamily: "Konstruktor",
              color: "#fdd006",
              textAlign: "center",
              // lineHeight: 27,
              fontSize: 20,
            }}
          >
            LET'S GET DRUNK
          </Text>
        </View>
      </TouchableOpacity>
      <Image
        source={require("../assets/images/transparent_logo_glow.png")}
        style={styles.bottomImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 250,
    zIndex: -1,
  },
  button: {
    backgroundColor: "#ed1e26",
    height: 25,
    borderRadius: 25,
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontStyle: "bold",
    borderRadius: 25,
  },
  bottomImage: {
    bottom: -60,
    left: 0,
    right: 0,
    width: "100%",
    height: "33%",
    zIndex: -1,
  },
});
