import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { prompts } from "../prompts";
import { crazy } from "../crazy";
import { flirty } from "../flirty";
import { virus } from "../virus";
import { virusend } from "../virusend";

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { updateNames, getNames } from "../components/nameStore";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
var language = "English";

// Store the prompts in async storage
const storePrompts = async (language: string) => {
  try {
    // Convert the prompts array to a JSON string
    // Save the prompts strings in async storage
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/prompts.json"
      );
      const data = await response.json();
      const promptsString = JSON.stringify(data);
      await AsyncStorage.setItem("promptsPack", promptsString);
      console.log("Successfully fetched and stored data: " + promptsString);
    } catch (error) {
      console.error(error);
      console.log("prinks");
      const promptsString = JSON.stringify(prompts);
      await AsyncStorage.setItem("promptsPack", promptsString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/crazy.json"
      );
      const data = await response.json();
      const crazyString = JSON.stringify(data);
      await AsyncStorage.setItem("crazyPack", crazyString);
      console.log("Successfully fetched and stored data: " + crazyString);
    } catch (error) {
      console.error(error);
      const crazyString = JSON.stringify(crazy);
      await AsyncStorage.setItem("crazyPack", crazyString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/flirty.json"
      );
      const data = await response.json();
      const flirtyString = JSON.stringify(data);
      await AsyncStorage.setItem("flirtyPack", flirtyString);
      console.log("Successfully fetched and stored data: " + flirtyString);
    } catch (error) {
      console.error(error);
      const flirtyString = JSON.stringify(flirty);
      await AsyncStorage.setItem("flirtyPack", flirtyString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/virus.json"
      );
      const data = await response.json();
      const virusString = JSON.stringify(data);
      await AsyncStorage.setItem("virusPack", virusString);
      console.log("Successfully fetched and stored data: " + virusString);
    } catch (error) {
      console.error(error);
      const virusString = JSON.stringify(virus);
      await AsyncStorage.setItem("virusPack", virusString);
    }
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON/" +
          language +
          "/virusend.json"
      );
      const data = await response.json();
      const virusEndString = JSON.stringify(data);
      await AsyncStorage.setItem("virusendPack", virusEndString);
      console.log("Successfully fetched and stored data: " + virusEndString);
    } catch (error) {
      console.error(error);
      const virusEndString = JSON.stringify(virusend);
      await AsyncStorage.setItem("virusendPack", virusEndString);
    }
  } catch (error) {
    console.error(error);
  }
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [fontsLoaded] = useFonts({
    Konstruktor: require("../assets/fonts/Konstruktor-qZZRq.otf"),
  });

  // Store the prompts in async storage when the component is mounted
  useEffect(() => {
    AsyncStorage.removeItem("playedPrinksPrompts");
    AsyncStorage.removeItem("playedCrazyPrompts");
    AsyncStorage.removeItem("playedFlirtyPrompts");
    storePrompts("English");
    // setNames(getNames());
  }, []);

  const [imageSource, setImageSource] = useState(
    require("../assets/images/transparent_logo_glow_new_2.png")
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const [subtitle, setSubTitle] = useState("WHO'S SESHING");
  const [player, setPlayer] = useState("Player");

  if (!fontsLoaded) {
    return undefined;
  }

  const NameInput: React.FC<RootTabScreenProps<"TabOne">> = () => {
    // const [names, setNames] = useState<string[]>([""]);

    const [names, setNames] = useState(getNames());
    useFocusEffect(
      React.useCallback(() => {
        setNames(getNames());
      }, [])
    );

    const handleNameChange = (text: string, index: number) => {
      // If the input text is not empty, add it to the list of names
      const newNames = [...names];
      newNames[index] = text;
      setNames(newNames);
      updateNames(newNames); // update the names in the name store
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
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
      <View
        style={{
          // justifyContent: "center",
          backgroundColor: "rgba(52, 52, 52, 0)",
        }}
      >
        {names.map((name, index) => (
          <View
            style={{
              marginTop: 2.5,
              marginBottom: 2.5,
              backgroundColor: "rgba(52, 52, 52, 0)",
            }}
            key={index}
          >
            <TextInput
              placeholder={`${player} ${index + 1}`}
              value={name}
              onChangeText={(text) => handleNameChange(text, index)}
              style={styles.textInput}
              textAlign="center"
            />
          </View>
        ))}

        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            backgroundColor: "rgba(52, 52, 52, 0)",
            // alignItems: "center",
            // justifyContent: "center",
            // alignContent: "center",
          }}
        >
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
                  // lineHeight: 25,
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
                // lineHeight: 25,
                fontWeight: "bold",
                fontSize: 18,
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
      <View style={{ position: "absolute", top: 70, right: 30, zIndex: 2 }}>
        <TouchableOpacity onPress={handleDropdownToggle}>
          <Ionicons name="language" size={32} color="#ed1e26" />
        </TouchableOpacity>

        {isDropdownVisible && (
          <View
            style={{
              // backgroundColor: "rgba(52, 52, 52, 0)",
              position: "absolute",
              top: 50,
              zIndex: 2,
            }}
          >
            {/* Dropdown content */}
            <TouchableOpacity
              style={{ marginBottom: 5 }}
              onPress={() => {
                setDropdownVisible(false);
                language = "English";
                AsyncStorage.setItem("language", language);
                storePrompts(language);
                setSubTitle("WHO'S SESHING");
                setPlayer("Player");
                console.log("Language set to: " + language);
              }}
            >
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../assets/images/flags/uk.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDropdownVisible(false);
                language = "Irish";
                AsyncStorage.setItem("language", language);
                storePrompts(language);
                setSubTitle("CÉ ATÁ AG ÓL?");
                setPlayer("Imreoir");
                console.log("Language set to: " + language);
              }}
            >
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../assets/images/flags/ireland.png")}
              />
            </TouchableOpacity>
            {/* Add more options as needed */}
          </View>
        )}
      </View>
      <Image
        style={styles.image}
        source={require("../assets/images/title_logo.png")}
      />

      {/* <StatusBar style="auto" /> */}
      <Image
        source={require("../assets/images/halo.png")}
        style={{
          width: "100%",
          height: "35%",
          position: "absolute",
          top: "26%",
          zIndex: -1,
        }}
      />
      <View
        style={{
          top: -60,
          flex: 0.25,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(52, 52, 52, 0)",
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 0.35,
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
            <Text
              style={{
                fontFamily: "Konstruktor",
                fontSize: 18,
                textAlign: "center",
                marginTop: 25,
                marginBottom: 10,
                backgroundColor: "rgba(52, 52, 52, 0)",
              }}
            >
              {subtitle}
            </Text>

            <NameInput navigation={navigation} />
          </View>
        </ScrollView>
      </View>

      {/* <KeyboardAvoidingView behavior="position"> */}
      {/* <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "6%",
            bottom: -45,
            borderColor: "#ffff",
            borderWidth: 2,
            borderRadius: 25,
            width: "45%",
          }}
          onPress={() => {
            if (getNames().length > 1 && getNames()[0].length > 0) {
              navigation.navigate("TabTwo");
            } else {
              ToastAndroid.show("Enter at least 2 names!", ToastAndroid.SHORT);
            }
          }}
        >
          <Text
            style={{
              fontFamily: "Konstruktor",
              color: "#ffff",
              textAlign: "center",
              // lineHeight: 50,
              fontSize: 18,
              padding: 10,
            }}
          >
            LET'S GET DRUNK
          </Text>
        </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(52, 52, 52, 0)",
          zIndex: -1,
        }}
        onPress={() => {
          if (getNames().length > 1 && getNames()[0].length > 0) {
            navigation.navigate("TabTwo", {
              language: language,
            });
          } else {
            ToastAndroid.show("Enter at least 2 names!", ToastAndroid.SHORT);
          }
        }}
        onPressIn={() => {
          setImageSource(
            require("../assets/images/transparent_logo_glow_new_5.png")
          );
        }}
        onPressOut={() => {
          setImageSource(
            require("../assets/images/transparent_logo_glow_new_2.png")
          );
        }}
      >
        <Image source={imageSource} style={styles.bottomImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "25%",
    top: "1%",
  },
  button: {
    backgroundColor: "#ed1e26",
    // height: "100%",
    borderRadius: 25,
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontStyle: "bold",
    borderRadius: 25,
  },
  bottomImage: {
    position: "absolute",
    bottom: -80,
    right: -20,
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center",
    width: "105%",
    height: "55%",
    zIndex: -1,
  },
});
