import AsyncStorage from "@react-native-async-storage/async-storage";
import { prompts } from "../prompts";
import { flirty } from "../flirty";
import { crazy } from "../crazy";
import { virus } from "../virus";
import { virusend } from "../virusend";

// Store the prompts in async storage
export const storePrompts = async (language: string) => {
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

export const resetPrompts = () => {
  console.log("Resetting prompts");
  AsyncStorage.removeItem("playedPrinksPrompts");
  AsyncStorage.removeItem("playedCrazyPrompts");
  AsyncStorage.removeItem("playedFlirtyPrompts");
  AsyncStorage.removeItem("virusPack");
  AsyncStorage.removeItem("virusendPack");
};
