import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
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
import email from "react-native-email";
import { sendEmail } from "../hooks/sendEmail";
import en from "../languages/en.json";
import ga from "../languages/ga.json";
import pl from "../languages/pl.json";
import es from "../languages/es.json";
import { LanguageData } from "../utils/language/LanguageData";
import { promptSubmitScreenStyles } from "../assets/styles/styles";

const languages: { [key: string]: Partial<LanguageData> } = {
  English: en,
  Irish: ga,
  Polish: pl,
  Spanish: es,
};

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
  const [enterPromptText, setEnterPromptText] = useState("ENTER YOUR PROMPT");
  const [customPromptText, setCustomPromptText] = useState(
    "Enter your custom prompt"
  );
  const [pickCatText, setPickCatText] = useState("PICK YOUR PROMPT CATEGORY");
  const [selectCatText, setSelectCatText] = useState("Select prompt category");
  const [gameModeText, setGameModeText] = useState(
    "PICK YOUR PROMPT GAME MODE"
  );
  const [selectGameModeText, setSelectGameModeText] = useState(
    "Select your game mode"
  );
  const [socialText, setSocialText] = useState(
    "ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED"
  );

  const [instruct1, setInstruct1] = useState(
    "- BE IN WITH A CHANCE OF HAVING YOUR CUSTOM PROMPT FEATURED PERMANENTLY IN THE GAME"
  );
  const [instruct2, setInstruct2] = useState(
    "- TYPE 'NAME' IF YOU WANT TO RANDOMISE YOUR NAME INPUT, AND 'NAME2' IF YOU WANT TO ADD A SECOND RANDOM NAME"
  );
  const [instruct3, setInstruct3] = useState(
    "- E.G. 'NAME HAS TO WHISPER TO NAME2 FOR THE REST OF THE GAME'"
  );
  const [instruct4, setInstruct4] = useState(
    "- ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON THE APP (OPTIONAL)"
  );
  const [submitText, setSubmitText] = useState("SUBMIT YOUR PROMPT");
  const [toast1, setToast1] = useState("Enter prompt text!");
  const [toast2, setToast2] = useState("Choose a prompt category!");
  const [toast3, setToast3] = useState("Choose a game mode!");
  const [toast4, setToast4] = useState("Game prompt submitted!");
  const [cat1, setCat1] = useState("RULE");
  const [cat2, setCat2] = useState("GET IT DOWN YA");
  const [cat3, setCat3] = useState("CHALLENGE");
  const [cat4, setCat4] = useState("VOTE");
  const [cat5, setCat5] = useState("SEXY");
  const [cat6, setCat6] = useState("VIRUS");
  const [mode1, setMode1] = useState("PRINKS");
  const [mode2, setMode2] = useState("MESSY");
  const [mode3, setMode3] = useState("FLIRTY");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [prompt, setPrompt] = useState({
    text: "",
    category: "",
    handle: "",
  });
  // const [handleText, setHandleText] = useState("");

  useEffect(() => {
    setLanguage(language);
  }, []);

  const setLanguage = async (language: string) => {
    let languageData = languages[language];
    console.log("Reaching new function with language: " + language);

    // If the selected language is not available or not explicitly set, default to English
    if (!languageData) {
      languageData = languages["English"];
    }

    setEnterPromptText(languageData.enterPromptText || "ENTER YOUR PROMPT");
    setPickCatText(languageData.pickCatText || "PICK YOUR PROMPT CATEGORY");
    setGameModeText(languageData.gameModeText || "PICK YOUR PROMPT GAME MODE");
    setSocialText(
      languageData.socialText || "ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED"
    );
    setSubmitText(languageData.submitText || "SUBMIT YOUR PROMPT");
    setSelectCatText(languageData.selectCatText || "Select prompt category");
    setSelectGameModeText(
      languageData.selectGameModeText || "Select your game mode"
    );
    setCustomPromptText(
      languageData.customPromptText || "Enter your custom prompt"
    );
    setInstruct1(
      languageData.instruct1 ||
        "- BE IN WITH A CHANCE OF HAVING YOUR CUSTOM PROMPT FEATURED PERMANENTLY IN THE GAME"
    );
    setInstruct2(
      languageData.instruct2 ||
        "- TYPE 'NAME' IF YOU WANT TO RANDOMISE YOUR NAME INPUT, AND 'NAME2' IF YOU WANT TO ADD A SECOND RANDOM NAME"
    );
    setInstruct3(
      languageData.instruct3 ||
        "- E.G. 'NAME HAS TO WHISPER TO NAME2 FOR THE REST OF THE GAME'"
    );
    setInstruct4(
      languageData.instruct4 ||
        "- ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON THE APP (OPTIONAL)"
    );
    setToast1(languageData.toast1 || "Enter prompt text!");
    setToast2(languageData.toast2 || "Choose a prompt category!");
    setToast3(languageData.toast3 || "Choose a game mode!");
    setToast4(languageData.toast4 || "Game prompt submitted!");
    setCat1(languageData.cat1 || "RULE");
    setCat2(languageData.cat2 || "GET IT DOWN YA");
    setCat3(languageData.cat3 || "CHALLENGE");
    setCat4(languageData.cat4 || "VOTE");
    setCat5(languageData.cat5 || "SEXY");
    setCat6(languageData.cat6 || "VIRUS");
    setMode1(languageData.mode1 || "PRINKS");
    setMode2(languageData.mode2 || "MESSY");
    setMode3(languageData.mode3 || "FLIRTY");
  };

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
        {/* <Image
        style={styles.image}
        source={require("../assets/images/title_logo.png")}
      /> */}
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
              onValueChange={(itemValue, itemIndex) =>
                setSelectedGameMode(itemValue)
              }
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
                  // handleEmail();
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
                  // lineHeight: 50,
                  fontSize: 18,
                  padding: 10,
                }}
              >
                {submitText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Image
        source={require("../assets/images/transparent_logo_glow.png")}
        style={styles.bottomImage}
      /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}
