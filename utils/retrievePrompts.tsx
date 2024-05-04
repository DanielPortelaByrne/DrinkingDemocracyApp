import AsyncStorage from "@react-native-async-storage/async-storage";

// Retrieve the prompts from async storage
const retrievePrompts = async (gameModeParam: string) => {
  try {
    // Get the selected prompts string from async storage
    const selectedPromptsString = await AsyncStorage.getItem(gameModeParam);
    // Convert the selected prompts string back to an array
    return selectedPromptsString ? JSON.parse(selectedPromptsString) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const retrievePlayed = async (playedArray: string) => {
  // Retrieve the array of already played prompts
  const playedPrompts = await AsyncStorage.getItem(playedArray);
  // Parse the string into an array of prompts
  const played = playedPrompts ? JSON.parse(playedPrompts) : [];
  // Return the array of prompts
  return played;
};

export { retrievePrompts, retrievePlayed };
