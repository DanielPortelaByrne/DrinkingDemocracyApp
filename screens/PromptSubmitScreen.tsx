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
import { debounce } from "lodash";

export default function PromptSubmitScreen({
  navigation,
}: RootTabScreenProps<"PromptSubmit">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [gameModeValue, setGameModeValue] = useState<string>("");
  const [prompt, setPrompt] = useState({
    text: "",
    category: "",
  });

  const scrollViewRef = useRef<ScrollView>(null);

  if (!fontsLoaded) {
    return undefined;
  }

  const PromptInput: React.FC<RootTabScreenProps<"PromptSubmit">> = () => {
    const categoryItems = [
      { label: "Select prompt category", value: "" },
      { label: "RULE", value: "RULE" },
      { label: "GET IT DOWN YA", value: "GET IT DOWN YA" },
      { label: "CHALLENGE", value: "CHALLENGE" },
      { label: "VOTE", value: "VOTE" },
      { label: "SEXY", value: "SEXY" },
      { label: "VIRUS", value: "VIRUS" },
    ];

    const gameModeItems = [
      { label: "Select game mode", value: "" },
      { label: "PRINKS", value: "PRINKS" },
      { label: "CRAZY", value: "CRAZY" },
      { label: "FLIRTY", value: "FLIRTY" },
    ];
    const setCategoryValue = (value: string) => {
      setPrompt((prevPrompt) => ({ ...prevPrompt, category: value }));
      console.log("Selected category value:", value);
    };

    const setTextValue = useCallback(
      debounce((value: string) => {
        setPrompt((prevPrompt) => ({ ...prevPrompt, text: value }));
        console.log("Entered prompt value:", value);
      }, 2000),
      []
    );

    const setHandleValue = (value: string) => {
      // setPrompt((prevPrompt) => ({
      //   ...prevPrompt,
      //   text: value,
      // }));
      console.log("Entered handle value:", value);
    };

    const setGameModeValue = (value: string) => {
      // Do something with the entered game mode value
      console.log("Entered game mode value:", value);
    };

    return (
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "rgba(52, 52, 52, 0)",
        }}
      >
        <View
          style={{
            marginTop: 2.5,
            marginBottom: 2.5,
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
            placeholder={`Prompt`}
            onChangeText={(text) => setTextValue(text)}
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
            selectedValue={categoryValue}
            onValueChange={(itemValue, itemIndex) =>
              setCategoryValue(itemValue)
            }
            style={{ backgroundColor: "white", marginBottom: 10 }}
          >
            {categoryItems.map((item) => (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.value}
              />
            ))}
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
            selectedValue={gameModeValue}
            onValueChange={(itemValue, itemIndex) =>
              setGameModeValue(itemValue)
            }
            style={{ backgroundColor: "white", marginBottom: 10 }}
          >
            {gameModeItems.map((item) => (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.value}
              />
            ))}
          </Picker>
          <Text
            style={{
              fontFamily: "Konstruktor",
              fontSize: 15,
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: "rgba(52, 52, 52, 0)",
            }}
          >
            ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED
          </Text>
          <TextInput
            placeholder={`@...`}
            onChangeText={(text) => setHandleValue(text)}
            style={styles.textInput}
            textAlign="center"
          />
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "15%",
            backgroundColor: "#ed1e26",
            borderWidth: 2,
            borderRadius: 25,
            width: "100%",
          }}
          onPress={() => {
            console.log("reaching submit");
            const jsonPrompt = JSON.stringify(prompt);
            console.log(jsonPrompt);
            ToastAndroid.show("Game prompt submitted!", ToastAndroid.SHORT);
            navigation.navigate("TabTwo");
          }}
        >
          <Text
            style={{
              fontFamily: "Konstruktor",
              color: "#000000",
              textAlign: "center",
              // lineHeight: 50,
              fontSize: 18,
              padding: 10,
            }}
          >
            SUBMIT YOUR PROMPT
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            backgroundColor: "rgba(52, 52, 52, 0)",
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require("../assets/images/title_logo.png")}
      /> */}
      <View style={{ position: "absolute", top: 70, left: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("TabOne")}>
          <Ionicons name="arrow-undo-sharp" size={32} color="#ed1e26" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          top: 60,
        }}
      >
        {/* <Text
          style={{
            fontFamily: "Konstruktor",
            fontSize: 40,
            textAlign: "center",
          }}
        >
          SUBMIT YOUR PROMPT
        </Text> */}
      </View>

      {/* <Image
        source={require("../assets/images/halo.png")}
        style={{
          width: "100%",
          height: "40%",
          position: "absolute",
          top: "25%",
          zIndex: -1,
        }}
      /> */}

      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingRight: "15%",
          paddingLeft: "15%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "rgba(52, 52, 52, 0)",
          }}
        >
          {/* <Text
            style={{
              fontFamily: "Konstruktor",
              fontSize: 18,
              textAlign: "center",
              marginTop: 25,
              marginBottom: 10,
              backgroundColor: "rgba(52, 52, 52, 0)",
            }}
          >
            THINK YOU'RE CREATIVE ENOUGH TO GET FEATURED?
          </Text> */}

          <PromptInput navigation={navigation} />
        </View>
      </ScrollView>

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
    width: "100%",
    height: "25%",
  },
  button: {
    backgroundColor: "#ed1e26",
    // height: "100%",
    // borderRadius: 25,
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontStyle: "bold",
    borderRadius: 25,
    marginBottom: 10,
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
