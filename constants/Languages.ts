export const APP_LANGUAGES = [
  "English",
  "Irish",
  "Polish",
  "Spanish",
] as const;

export type AppLanguage = (typeof APP_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: AppLanguage = "English";
export const LANGUAGE_STORAGE_KEY = "selectedLanguage";

export const hasNativePromptContent = (language: AppLanguage) =>
  language === "English" || language === "Irish";

export const isAppLanguage = (value: unknown): value is AppLanguage =>
  typeof value === "string" &&
  APP_LANGUAGES.includes(value as AppLanguage);
