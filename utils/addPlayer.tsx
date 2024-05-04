import { getNames, updateNames } from "../components/nameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addPlayer = async (playerName: string) => {
  // Get the current list of names from async storage
  const names = await getNames();
  // Add the new player's name to the list of names
  names.push(playerName);
  // Update the name store with the new list of names
  await AsyncStorage.setItem("names", JSON.stringify(names));
  const newNames = [...names];
  updateNames(newNames); // update the names in the name store
};
