import React, { useEffect, useState } from "react";
import {
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { sendEmail } from "../hooks/sendEmail";
import { promptSubmitScreenStyles } from "../assets/styles/styles";
import { useLanguage } from "../utils/language/useLanguage";

export default function PromptSubmitScreen({
  route,
  navigation,
}: RootTabScreenProps<"PromptSubmit">) {
  const { language } = route.params;
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [prompt, setPrompt] = useState({
    text: "",
    category: "",
    handle: "",
  });
  const {
    enterPromptText,
    customPromptText,
    pickCatText,
    selectCatText,
    gameModeText,
    selectGameModeText,
    socialText,
    instruct1,
    instruct2,
    instruct3,
    instruct4,
    submitText,
    toast1,
    toast2,
    toast3,
    toast4,
    cat1,
    cat2,
    cat3,
    cat4,
    cat5,
    cat6,
    mode1,
    mode2,
    mode3,
    setLanguage,
  } = useLanguage();

  useEffect(() => {
    setLanguage(language);
  }, []);

  let jsonPrompt = "";

  const handlePromptTextChange = (text: string) => {
    setPrompt((prevPrompt) => ({ ...prevPrompt, text: text }));
    console.log("Prompt text set to: " + text);
  };

  const handlePromptHandleChange = (handle: string) => {
    setPrompt((prevPrompt) => ({ ...prevPrompt, handle: handle }));
    console.log("Prompt handle set to: " + handle);
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
    console.log(prompt.text);
    if (prompt.text.includes("Name"))
      prompt.text = prompt.text.replace("Name", "[Name]");
    if (prompt.text.includes("Name2"))
      prompt.text = prompt.text.replace("Name2", "[Name2]");
    jsonPrompt = JSON.stringify(prompt);
    console.log(jsonPrompt);
    setPrompt((prevPrompt) => ({ ...prevPrompt, category: "" }));
    setPrompt((prevPrompt) => ({ ...prevPrompt, text: "" }));

    setSelectedCategory("");
    setSelectedGameMode("");
  };

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={promptSubmitScreenStyles.container as StyleProp<ViewStyle>}>
        <View style={{ position: "absolute", top: "10%", left: "8%" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TabTwo", {
                language: language,
              })
            }
          >
            <Ionicons name="arrow-undo-sharp" size={32} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            top: "10%",
            right: "8%",
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
            style={promptSubmitScreenStyles.overlay as StyleProp<ViewStyle>}
            onPress={(event) => setIsOverlayVisible(false)}
          >
            <View
              style={
                promptSubmitScreenStyles.overlayView as StyleProp<ViewStyle>
              }
            >
              <View style={promptSubmitScreenStyles.innerView}>
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
                  {instruct1}
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
                  {instruct2}
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
                  {instruct3}
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
                  {instruct4}
                </Text>
              </View>
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
              {enterPromptText}
            </Text>
            <TextInput
              placeholder={`${customPromptText}`}
              onChangeText={(text) => handlePromptTextChange(text)}
              style={promptSubmitScreenStyles.textInput as StyleProp<ViewStyle>}
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
              {pickCatText}
            </Text>
            <Picker
              selectedValue={selectedCategory}
              style={{ backgroundColor: "white", marginBottom: 10 }}
              onValueChange={(text) => handlePromptCategoryChange(text)}
            >
              <Picker.Item label={selectCatText} value="" />
              <Picker.Item label={cat1} value="RULE" />
              <Picker.Item label={cat2} value="GET IT DOWN YA" />
              <Picker.Item label={cat3} value="CHALLENGE" />
              <Picker.Item label={cat4} value="VOTE" />
              <Picker.Item label={cat5} value="SEXY" />
              <Picker.Item label={cat6} value="VIRUS" />
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
              {gameModeText}
            </Text>
            <Picker
              selectedValue={selectedGameMode}
              style={{ backgroundColor: "white", marginBottom: 10 }}
              onValueChange={(itemValue) => setSelectedGameMode(itemValue)}
            >
              <Picker.Item label={selectGameModeText} value="" />
              <Picker.Item label={mode1} value="PRINKS" />
              <Picker.Item label={mode2} value="MESSY" />
              <Picker.Item label={mode3} value="FLIRTY" />
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
              {socialText}
            </Text>
            <TextInput
              placeholder={`@...`}
              onChangeText={(text) => handlePromptHandleChange(text)}
              style={promptSubmitScreenStyles.textInput as StyleProp<ViewStyle>}
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
                  ToastAndroid.show(toast1, ToastAndroid.SHORT);
                } else if (prompt.category.length < 1) {
                  ToastAndroid.show(toast2, ToastAndroid.SHORT);
                } else if (selectedGameMode === "") {
                  ToastAndroid.show(toast3, ToastAndroid.SHORT);
                } else {
                  setPromptObject();
                  sendEmail(
                    "drinkingdemocracy@gmail.com",
                    "Prompt Submission from " + prompt.handle,
                    "Game Mode: " +
                      selectedGameMode +
                      "\n" +
                      "Prompt Json: " +
                      jsonPrompt +
                      "\n" +
                      "Handle: " +
                      prompt.handle +
                      "\n" +
                      "========================================="
                  ).then(() => {
                    console.log("Your message was successfully sent!");
                  });
                  ToastAndroid.show(toast4, ToastAndroid.SHORT);
                  navigation.navigate("TabTwo", {
                    language: language,
                  });
                }
              }}
            >
              <Text
                style={{
                  fontFamily: "Konstruktor",
                  color: "#ffffff",
                  textAlign: "center",
                  fontSize: 18,
                  padding: 10,
                }}
              >
                {submitText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
