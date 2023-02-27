import React, { useCallback, useRef, useState } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import email from "react-native-email";

export default function PromptSubmitScreen({
  navigation,
}: RootTabScreenProps<"PromptSubmit">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [prompt, setPrompt] = useState({
    text: "",
    category: "",
  });
  const [handleText, setHandleText] = useState("");
  let jsonPrompt = "";

  const handlePromptTextChange = (text: string) => {
    setPrompt((prevPrompt) => ({ ...prevPrompt, text: text }));
    console.log("Prompt text set to: " + text);
  };

  const handlePromptCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPrompt((prevPrompt) => ({ ...prevPrompt, category: category }));
    console.log("Prompt category set to: " + category);
    console.log(
      "Prompt object: Text: " + prompt.text + " Category: " + prompt.category
    );
  };

  const setPromptObject = () => {
    jsonPrompt = JSON.stringify(prompt);
    console.log(jsonPrompt);
    setPrompt((prevPrompt) => ({ ...prevPrompt, category: "" }));
    setPrompt((prevPrompt) => ({ ...prevPrompt, text: "" }));

    setSelectedCategory("");
    setSelectedGameMode("");
  };

  const handleEmail = () => {
    const to = ["drinkingdemocracy@gmail.com"]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      subject: "Prompt Submission from " + handleText,
      body:
        "Game Mode: " +
        selectedGameMode +
        "\n" +
        "Prompt Json: " +
        jsonPrompt +
        "\n" +
        "Handle: " +
        handleText +
        "\n" +
        "===========================================",
    }).catch(console.error);
  };

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/title_logo.png")}
      />
      <View style={{ position: "absolute", top: 70, left: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("TabTwo")}>
          <Ionicons name="arrow-undo-sharp" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          top: 70,
          right: 30,
          backgroundColor: "rgba(52, 52, 52, 0)",
        }}
      >
        <TouchableOpacity
          onPress={() => setIsOverlayVisible(!isOverlayVisible)}
        >
          <Ionicons
            name="information-circle-outline"
            size={32}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      {isOverlayVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={(event) => setIsOverlayVisible(false)}
        >
          <View style={styles.overlayView}>
            <Text
              style={{
                fontFamily: "Konstruktor",
                fontSize: 15,
                margin: 15,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: "rgba(52, 52, 52, 0)",
              }}
            >
              - BE IN WITH A CHANCE OF HAVING YOUR CUSTOM PROMPT FEATURED
              PERMANENTLY IN THE GAME
            </Text>
            <Text
              style={{
                fontFamily: "Konstruktor",
                fontSize: 15,
                margin: 15,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: "rgba(52, 52, 52, 0)",
              }}
            >
              - TYPE "NAME" IF YOU WANT TO RANDOMISE YOUR NAME INPUT, AND
              "NAME2" IF YOU WANT TO ADD A SECOND RANDOM NAME
            </Text>
            <Text
              style={{
                fontFamily: "Konstruktor",
                fontSize: 15,
                margin: 15,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: "rgba(52, 52, 52, 0)",
              }}
            >
              - E.G. "NAME HAS TO WHISPER TO NAME2 FOR THE REST OF THE GAME"
            </Text>
            <Text
              style={{
                fontFamily: "Konstruktor",
                fontSize: 15,
                margin: 15,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: "rgba(52, 52, 52, 0)",
              }}
            >
              - ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON THE
              APP (OPTIONAL)
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <Image
        source={require("../assets/images/halo_purple.png")}
        style={{
          width: "100%",
          height: "60%",
          position: "absolute",
          top: "22%",
          zIndex: -1,
        }}
      />

      <View
        style={{
          top: -80,
          justifyContent: "center",
          backgroundColor: "rgba(52, 52, 52, 0)",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "rgba(52, 52, 52, 0)",
          }}
        >
          <Text
            style={{
              fontFamily: "Konstruktor",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 10,
              backgroundColor: "rgba(52, 52, 52, 0)",
            }}
          >
            ENTER YOUR PROMPT
          </Text>
          <TextInput
            placeholder={`Enter your custom prompt`}
            onChangeText={(text) => handlePromptTextChange(text)}
            style={styles.textInput}
            textAlign="center"
          />
          <Text
            style={{
              fontFamily: "Konstruktor",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 10,
              backgroundColor: "rgba(52, 52, 52, 0)",
            }}
          >
            PICK YOUR PROMPT CATEGORY
          </Text>
          <Picker
            selectedValue={selectedCategory}
            style={{ backgroundColor: "white", marginBottom: 10 }}
            onValueChange={(text) => handlePromptCategoryChange(text)}
          >
            <Picker.Item label="Select prompt category" value="" />
            <Picker.Item label="RULE" value="RULE" />
            <Picker.Item label="GET IT DOWN YA" value="GET IT DOWN YA" />
            <Picker.Item label="CHALLENGE" value="CHALLENGE" />
            <Picker.Item label="VOTE" value="VOTE" />
            <Picker.Item label="SEXY" value="SEXY" />
            <Picker.Item label="VIRUS" value="VIRUS" />
          </Picker>

          <Text
            style={{
              fontFamily: "Konstruktor",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 10,
              backgroundColor: "rgba(52, 52, 52, 0)",
            }}
          >
            PICK YOUR PROMPT GAME MODE
          </Text>
          <Picker
            selectedValue={selectedGameMode}
            style={{ backgroundColor: "white", marginBottom: 10 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGameMode(itemValue)
            }
          >
            <Picker.Item label="Select your game mode" value="" />
            <Picker.Item label="PRINKS" value="PRINKS" />
            <Picker.Item label="CRAZY" value="CRAZY" />
            <Picker.Item label="FLIRTY" value="FLIRTY" />
          </Picker>

          <Text
            style={{
              fontFamily: "Konstruktor",
              fontSize: 15,
              textAlign: "center",
              marginBottom: 10,
              backgroundColor: "rgba(52, 52, 52, 0)",
            }}
          >
            ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED
          </Text>
          <TextInput
            placeholder={`@...`}
            onChangeText={setHandleText}
            style={styles.textInput}
            textAlign="center"
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "15%",
              backgroundColor: "#000000",
              borderRadius: 25,
              width: "100%",
              borderWidth: 3,
              borderColor: "white",
              marginTop: 10,
            }}
            onPress={() => {
              if (prompt.text.length < 1) {
                ToastAndroid.show("Enter prompt text!", ToastAndroid.SHORT);
              } else if (prompt.category.length < 1) {
                ToastAndroid.show(
                  "Choose a prompt category!",
                  ToastAndroid.SHORT
                );
              } else if (selectedGameMode === "") {
                ToastAndroid.show("Choose a game mode!", ToastAndroid.SHORT);
              } else {
                setPromptObject();
                handleEmail();
                ToastAndroid.show("Game prompt submitted!", ToastAndroid.SHORT);
                navigation.navigate("TabTwo");
              }
            }}
          >
            <Text
              style={{
                fontFamily: "Konstruktor",
                color: "#ffffff",
                textAlign: "center",
                // lineHeight: 50,
                fontSize: 18,
                padding: 10,
              }}
            >
              SUBMIT YOUR PROMPT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Image
        source={require("../assets/images/transparent_logo_glow.png")}
        style={styles.bottomImage}
      /> */}
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
    top: -100,
    width: "100%",
    height: "25%",
    zIndex: -5,
  },
  button: {
    backgroundColor: "#ed1e26",
  },
  textInput: {
    backgroundColor: "white",
    fontStyle: "bold",
    borderRadius: 25,
    marginBottom: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 10,
  },
  overlayView: {
    top: "30%",
    left: 20,
    justifyContent: "center",
    height: 325,
    width: 350,
    backgroundColor: "rgba(0,0,0,1)",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "white",
  },
});
