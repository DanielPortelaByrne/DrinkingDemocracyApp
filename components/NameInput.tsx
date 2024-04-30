import { useFocusEffect } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ImageStyle,
  ScrollView,
} from "react-native";
import { getNames, updateNames } from "./nameStore";
import { RootTabScreenProps } from "../types";
import { screen1Styles } from "../assets/styles/styles";

interface NameInputProps extends RootTabScreenProps<"TabOne"> {
  scrollViewRef: React.RefObject<ScrollView>;
}

// const scrollViewRef = useRef<ScrollView>(null);
const [player, setPlayer] = useState("Player");

const NameInput: React.FC<NameInputProps> = ({ scrollViewRef, navigation }) => {
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
            style={screen1Styles.textInput as StyleProp<ImageStyle>}
            textAlign="center"
          />
        </View>
      ))}

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          backgroundColor: "rgba(52, 52, 52, 0)",
        }}
      >
        {names.length > 1 && (
          <TouchableOpacity
            style={{
              ...screen1Styles.button,
              width: "25%",
              marginRight: 5,
            }}
            onPress={handleRemoveName}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              -
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ ...screen1Styles.button, width: "25%" }}
          onPress={handleAddName}
        >
          <Text
            style={{
              textAlign: "center",
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

export default NameInput;
