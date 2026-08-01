import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AppLanguage,
  DEFAULT_LANGUAGE,
  isAppLanguage,
  LANGUAGE_STORAGE_KEY,
} from "../../constants/Languages";

export const loadLanguagePreference = async (): Promise<AppLanguage> => {
  const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isAppLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
};

export const saveLanguagePreference = async (language: AppLanguage) => {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};
