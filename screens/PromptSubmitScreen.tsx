import React, { useCallback, useRef, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  ActionSheetIOS,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import Toast from "react-native-root-toast";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { sendEmail } from "../hooks/sendEmail";

export default function PromptSubmitScreen({
  navigation,
}: RootTabScreenProps<"PromptSubmit">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [prompt, setPrompt] = useState({
    text: "",
    selectedCategory: "",
    handle: "",
  });
  const options = ["RULE", "GET IT DOWN YA", "CHALLENGE", "SEXY", "VIRUS"];
  const options2 = ["PRINKS", "CRAZY", "FLIRTY"];
  const showCategoryActionSheet = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", ...options],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          setSelectedCategory(options[buttonIndex - 1]);
          setPrompt((prevPrompt) => ({
            ...prevPrompt,
            selectedCategory: options[buttonIndex - 1],
          }));
          // console.log(options[buttonIndex - 1]);
          console.log("Prompt category set to: " + prompt.selectedCategory);
        }
      }
    );
  }, [options]);
  const showModeActionSheet = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", ...options2],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          setSelectedGameMode(options2[buttonIndex - 1]);
          console.log(options2[buttonIndex - 1]);
        }
      }
    );
  }, [options2]);
  // const [handleText, setHandleText] = useState("");

  let jsonPrompt = "";

  const handlePromptTextChange = (text: string) => {
    setPrompt((prevPrompt) => ({ ...prevPrompt, text: text }));
    console.log("Prompt text set to: " + text);
  };

  const handlePromptHandleChange = (handle: string) => {
    setPrompt((prevPrompt) => ({ ...prevPrompt, handle: handle }));
    console.log("Prompt handle set to: " + handle);
  };

  // const handlePromptCategoryChange = (category: string) => {
  //   setSelectedCategory(category);
  //   setPrompt((prevPrompt) => ({ ...prevPrompt, category: selectedCategory }));
  //   console.log("Prompt category set to: " + category);
  //   console.log(
  //     "Prompt object: Text: " + prompt.text + " Category: " + prompt.category
  //   );
  // };

  const setPromptObject = () => {
    console.log(prompt.text);
    if (prompt.text.includes("Name"))
      prompt.text = prompt.text.replace("Name", "[Name]");
    if (prompt.text.includes("Name2"))
      prompt.text = prompt.text.replace("Name2", "[Name2]");
    jsonPrompt = JSON.stringify(prompt);
    console.log(jsonPrompt);
    // setPrompt((prevPrompt) => ({ ...prevPrompt, category: "" }));
    setPrompt((prevPrompt) => ({ ...prevPrompt, text: "" }));

    setSelectedCategory("");
    setSelectedGameMode("");
  };

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View
          style={{
            position: "absolute",
            top: "10%",
            left: "8%",
            backgroundColor: "rgba(52, 52, 52, 0)",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("TabTwo")}>
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
            style={styles.overlay}
            onPress={(event) => setIsOverlayVisible(false)}
          >
            <View style={styles.overlayView}>
              <View style={styles.innerView}>
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
                  - ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON
                  THE APP (OPTIONAL)
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
              ENTER YOUR PROMPT
            </Text>
            <TextInput
              placeholder={`Enter your custom prompt`}
              onChangeText={(text) => handlePromptTextChange(text)}
              style={styles.textInput}
              textAlign="center"
              placeholderTextColor="#4f4f4f"
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
            <TouchableOpacity
              onPress={showCategoryActionSheet}
              style={styles.categoryPicker}
            >
              <Text style={styles.categoryText}>
                {selectedCategory || "Select a category"}
              </Text>
            </TouchableOpacity>

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
            <TouchableOpacity
              onPress={showModeActionSheet}
              style={styles.categoryPicker}
            >
              <Text style={styles.categoryText}>
                {selectedGameMode || "Select a Game Mode"}
              </Text>
            </TouchableOpacity>

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
              onChangeText={(text) => handlePromptHandleChange(text)}
              style={styles.textInput}
              textAlign="center"
              placeholderTextColor="#4f4f4f"
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
                  Toast.show("Enter prompt text!", {
                    duration: Toast.durations.SHORT,
                  });
                } else if (prompt.selectedCategory.length < 1) {
                  Toast.show("Choose a prompt category!", {
                    duration: Toast.durations.SHORT,
                  });
                } else if (selectedGameMode === "") {
                  Toast.show("Choose a game mode!", {
                    duration: Toast.durations.SHORT,
                  });
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
                  Toast.show("Game prompt submitted!", {
                    duration: Toast.durations.SHORT,
                  });
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // image: {
  //   width: "80%",
  //   height: "25%",
  //   marginBottom: 80,
  // },
  button: {
    backgroundColor: "#ed1e26",
  },
  textInput: {
    backgroundColor: "white",
    fontStyle: "bold",
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    color: "#4f4f4f",
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 10,
  },
  overlayView: {
    top: "30%",
    justifyContent: "center",
    height: "40%",
    width: "90%",
    backgroundColor: "rgba(0,0,0,1)",
    zIndex: 10,
    // borderWidth: 1,
    // borderColor: "white",
  },
  innerView: {
    backgroundColor: "rgba(0,0,0,1)",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  categoryPicker: {
    width: "100%",
    backgroundColor: "#fafafa",
    marginBottom: 20,
    alignSelf: "center",
  },

  categoryText: {
    alignSelf: "center",
    padding: 10,
    // fontFamily: "Konstruktor",
    fontSize: 16,
    color: "#4f4f4f",
    paddingLeft: 10,
  },
});
