import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ImageStyle,
  ScrollView,
  ViewStyle,
  TextStyle,
} from "react-native";
import { getNames, updateNames } from "./nameStore";
import {
  nameInputComponentStyles,
  screen1Styles,
} from "../assets/styles/styles";

export interface NameInputProps {
  scrollViewRef: React.RefObject<ScrollView>;
  player: string;
}

export const NameInput: React.FC<NameInputProps> = ({
  scrollViewRef,
  player,
}) => {
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
    <View style={nameInputComponentStyles.container}>
      {names.map((name, index) => (
        <View style={nameInputComponentStyles.nameItem} key={index}>
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
        style={nameInputComponentStyles.buttonContainer as StyleProp<ViewStyle>}
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
              style={nameInputComponentStyles.button as StyleProp<ViewStyle>}
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
            style={
              {
                ...nameInputComponentStyles.button,
                fontSize: 18,
              } as StyleProp<TextStyle>
            }
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
