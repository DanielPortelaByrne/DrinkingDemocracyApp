import AsyncStorage from "@react-native-async-storage/async-storage";

const NAMES_STORAGE_KEY = "names";
let names: string[] = [];
let pendingWrite = Promise.resolve();

export const updateNames = (newNames: string[]) => {
  names = newNames.map((name) => name.trim()).filter(Boolean);
  const serializedNames = JSON.stringify(names);
  pendingWrite = pendingWrite
    .catch(() => undefined)
    .then(() => AsyncStorage.setItem(NAMES_STORAGE_KEY, serializedNames));
  return pendingWrite;
};

export const getNames = () => {
  return names.length > 0 ? [...names] : [""];
};

export const hydrateNames = async () => {
  const storedNames = await AsyncStorage.getItem(NAMES_STORAGE_KEY);
  if (!storedNames) return getNames();

  try {
    const parsed: unknown = JSON.parse(storedNames);
    if (Array.isArray(parsed)) {
      names = parsed
        .filter((name): name is string => typeof name === "string")
        .map((name) => name.trim())
        .filter(Boolean);
    }
  } catch {
    names = [];
  }

  return getNames();
};
