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
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import email from "react-native-email";
import { sendEmail } from "../hooks/sendEmail";

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
    switch (language) {
      case "English": {
        setEnterPromptText("ENTER YOUR PROMPT");
        setPickCatText("PICK YOUR PROMPT CATEGORY");
        setGameModeText("PICK YOUR PROMPT GAME MODE");
        setSocialText("ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED");
        setSubmitText("SUBMIT YOUR PROMPT");
        setSelectCatText("Select prompt category");
        setSelectGameModeText("Select your game mode");
        setCustomPromptText("Enter your custom prompt");
        setInstruct1(
          "- BE IN WITH A CHANCE OF HAVING YOUR CUSTOM PROMPT FEATURED PERMANENTLY IN THE GAME"
        );
        setInstruct2(
          "- TYPE 'NAME' IF YOU WANT TO RANDOMISE YOUR NAME INPUT, AND 'NAME2' IF YOU WANT TO ADD A SECOND RANDOM NAME"
        );
        setInstruct3(
          "- E.G. 'NAME HAS TO WHISPER TO NAME2 FOR THE REST OF THE GAME'"
        );
        setInstruct4(
          "- ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON THE APP (OPTIONAL)"
        );
        setToast1("Enter prompt text!");
        setToast2("Choose a prompt category!");
        setToast3("Choose a game mode!");
        setToast4("Game prompt submitted!");
        setCat1("RULE");
        setCat2("GET IT DOWN YA");
        setCat3("CHALLENGE");
        setCat4("VOTE");
        setCat5("SEXY");
        setCat6("VIRUS");
        setMode1("PRINKS");
        setMode2("MESSY");
        setMode3("FLIRTY");
        break;
      }
      case "Irish": {
        setEnterPromptText("IONTRÁIL DO PHROMPTA");
        setPickCatText("ROGHNAIGH DO CHATEGÓIR PHROMPTA");
        setGameModeText("ROGHNAIGH DO MHÓD CHLUICHE PHROMPTA");
        setSocialText(
          "IONTRÁIL DO DHÁLACH MÉID SÓISIALTA CHUN A BHEITH IDIRBHIRT"
        );
        setSubmitText("SEOL DO PHROMPTA");
        setSelectCatText("Roghnaigh catagóir tiomána");
        setSelectGameModeText("Roghnaigh do mhod tráchtála");
        setCustomPromptText("Cuir do phromt pearsanta isteach");
        setInstruct1(
          "- BÍ I DO THAIRSEACH CHUN DEIS A BHEITH AGAT DO PHROMTÉAD PEARSANTA A THAISPEÁINT GO BUAN SA CLUICH"
        );
        setInstruct2(
          "- SCRÍOBH 'NAME' MÁ BA MHIAN LEAT DO SHEOLTAÍAINM A DHÉANAMH ANIARADH, AGUS 'NAME2' MÁ BA MHIAN LEAT DARA SHEOLTAÍAINM A CHUR LEIS"
        );
        setInstruct3(
          "- M.A. 'TÁ ORT SINNIS AG BREATHNÚ AR NAME2 SNA RESTA AG AN CHLUICH'"
        );
        setInstruct4(
          "- CUIR DO DHLEAS ÁITIÚIL MEÁN SÓISIALTA AGUS PLATFÓIRM LEIS CHUN AITHINT A BHEITH ORT SA APLIKÉAD (ROGHNACH)"
        );
        setToast1("Iontráil téacs an phrómóid!");
        setToast2("Roghnaigh catagóir phrómóid!");
        setToast3("Roghnaigh mód cluiche!");
        setToast4("Phrómóid cluiche curtha isteach!");
        setCat1("RIALACHÁN");
        setCat2("GABH I SÍORRÚD É");
        setCat3("DÚSHLÁN");
        setCat4("VÓTA");
        setCat5("GNÉASÚIL");
        setCat6("VÍREAS");
        setMode1("BREÁCHA");
        setMode2("MíCHEART");
        setMode3("FHEIRTEACH");
        break;
      }
      case "Spanish": {
        setEnterPromptText("ENTER YOUR PROMPT");
        setPickCatText("PICK YOUR PROMPT CATEGORY");
        setGameModeText("PICK YOUR PROMPT GAME MODE");
        setSocialText("ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED");
        setSubmitText("SUBMIT YOUR PROMPT");
        setSelectCatText("Select prompt category");
        setSelectGameModeText("Select your game mode");
        setCustomPromptText("Enter your custom prompt");
        setInstruct1(
          "- BE IN WITH A CHANCE OF HAVING YOUR CUSTOM PROMPT FEATURED PERMANENTLY IN THE GAME"
        );
        setInstruct2(
          "- TYPE 'NAME' IF YOU WANT TO RANDOMISE YOUR NAME INPUT, AND 'NAME2' IF YOU WANT TO ADD A SECOND RANDOM NAME"
        );
        setInstruct3(
          "- E.G. 'NAME HAS TO WHISPER TO NAME2 FOR THE REST OF THE GAME'"
        );
        setInstruct4(
          "- ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON THE APP (OPTIONAL)"
        );
        setToast1("Enter prompt text!");
        setToast2("Choose a prompt category!");
        setToast3("Choose a game mode!");
        setToast4("Game prompt submitted!");
        setCat1("RULE");
        setCat2("GET IT DOWN YA");
        setCat3("CHALLENGE");
        setCat4("VOTE");
        setCat5("SEXY");
        setCat6("VIRUS");
        setMode1("PRINKS");
        setMode2("MESSY");
        setMode3("FLIRTY");
        break;
      }
      default: {
        setEnterPromptText("ENTER YOUR PROMPT");
        setPickCatText("PICK YOUR PROMPT CATEGORY");
        setGameModeText("PICK YOUR PROMPT GAME MODE");
        setSocialText("ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED");
        setSubmitText("SUBMIT YOUR PROMPT");
        setSelectCatText("Select prompt category");
        setSelectGameModeText("Select your game mode");
        setCustomPromptText("Enter your custom prompt");
        setInstruct1(
          "- BE IN WITH A CHANCE OF HAVING YOUR CUSTOM PROMPT FEATURED PERMANENTLY IN THE GAME"
        );
        setInstruct2(
          "- TYPE 'NAME' IF YOU WANT TO RANDOMISE YOUR NAME INPUT, AND 'NAME2' IF YOU WANT TO ADD A SECOND RANDOM NAME"
        );
        setInstruct3(
          "- E.G. 'NAME HAS TO WHISPER TO NAME2 FOR THE REST OF THE GAME'"
        );
        setInstruct4(
          "- ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON THE APP (OPTIONAL)"
        );
        setToast1("Enter prompt text!");
        setToast2("Choose a prompt category!");
        setToast3("Choose a game mode!");
        setToast4("Game prompt submitted!");
        setCat1("RULE");
        setCat2("GET IT DOWN YA");
        setCat3("CHALLENGE");
        setCat4("VOTE");
        setCat5("SEXY");
        setCat6("VIRUS");
        setMode1("PRINKS");
        setMode2("MESSY");
        setMode3("FLIRTY");
        break;
      }
    }
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
      <View style={styles.container}>
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
    marginBottom: 10,
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
});
