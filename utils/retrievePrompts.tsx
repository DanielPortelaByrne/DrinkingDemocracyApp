import AsyncStorage from "@react-native-async-storage/async-storage";
import { Prompt } from "./promptTypes";

const parsePrompts = (value: string | null): Prompt[] => {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as Prompt[]) : [];
  } catch {
    return [];
  }
};

// Retrieve the prompts from async storage
const retrievePrompts = async (gameModeParam: string) => {
  try {
    // Get the selected prompts string from async storage
    const selectedPromptsString = await AsyncStorage.getItem(gameModeParam);
    // Convert the selected prompts string back to an array
    return parsePrompts(selectedPromptsString);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const retrievePlayed = async (playedArray: string): Promise<Prompt[]> => {
  try {
    return parsePrompts(await AsyncStorage.getItem(playedArray));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { retrievePrompts, retrievePlayed };
