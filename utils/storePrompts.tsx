import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLanguage, hasNativePromptContent } from "../constants/Languages";
import { crazy } from "../crazy";
import { flirty } from "../flirty";
import { prompts } from "../prompts";
import { virus } from "../virus";
import { virusend } from "../virusend";
import {
  PROMPT_PACK_NAMES,
  Prompt,
  PromptPackName,
} from "./promptTypes";

const REMOTE_CONTENT_BASE =
  "https://raw.githubusercontent.com/DanielPortelaByrne/DrinkingDemocracyApp/json-data/JSON";
const CONTENT_LANGUAGE_KEY = "promptContentLanguage";
const FETCH_TIMEOUT_MS = 8_000;

export const PROMPT_PACK_STORAGE_KEYS: Record<PromptPackName, string> = {
  prompts: "promptsPack",
  crazy: "crazyPack",
  flirty: "flirtyPack",
  virus: "virusPack",
  virusend: "virusendPack",
};

const bundledPacks: Record<PromptPackName, Prompt[]> = {
  prompts: prompts as Prompt[],
  crazy: crazy as Prompt[],
  flirty: flirty as Prompt[],
  virus: virus as Prompt[],
  virusend: virusend as Prompt[],
};

export type PromptLoadResult = {
  requestedLanguage: AppLanguage;
  fallbackPacks: PromptPackName[];
};

export const isPromptArray = (value: unknown): value is Prompt[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (prompt) =>
      typeof prompt === "object" &&
      prompt !== null &&
      typeof (prompt as Prompt).text === "string" &&
      (prompt as Prompt).text.trim().length > 0 &&
      typeof (prompt as Prompt).category === "string" &&
      (prompt as Prompt).category.trim().length > 0
  );

const fetchPromptPack = async (
  language: AppLanguage,
  pack: PromptPackName
): Promise<Prompt[]> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${REMOTE_CONTENT_BASE}/${language}/${pack}.json`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`Prompt request failed with ${response.status}`);
    }

    const data: unknown = await response.json();
    if (!isPromptArray(data)) {
      throw new Error(`Prompt pack ${language}/${pack} was empty or invalid`);
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
};

const loadPromptPack = async (
  requestedLanguage: AppLanguage,
  pack: PromptPackName
): Promise<{ prompts: Prompt[]; usedFallback: boolean }> => {
  const candidates: AppLanguage[] = hasNativePromptContent(requestedLanguage)
    ? requestedLanguage === "English"
      ? ["English"]
      : [requestedLanguage, "English"]
    : ["English"];

  for (const candidate of candidates) {
    try {
      return {
        prompts: await fetchPromptPack(candidate, pack),
        usedFallback: candidate !== requestedLanguage,
      };
    } catch (error) {
      if (__DEV__) {
        console.warn(`Unable to load ${candidate}/${pack}`, error);
      }
    }
  }

  return { prompts: bundledPacks[pack], usedFallback: true };
};

export const storePrompts = async (
  language: AppLanguage
): Promise<PromptLoadResult> => {
  const loadedPacks = await Promise.all(
    PROMPT_PACK_NAMES.map(async (pack) => ({
      pack,
      ...(await loadPromptPack(language, pack)),
    }))
  );

  await AsyncStorage.multiSet([
    ...loadedPacks.map(({ pack, prompts: loadedPrompts }) => [
      PROMPT_PACK_STORAGE_KEYS[pack],
      JSON.stringify(loadedPrompts),
    ] as [string, string]),
    [CONTENT_LANGUAGE_KEY, language],
  ]);

  return {
    requestedLanguage: language,
    fallbackPacks: loadedPacks
      .filter(({ usedFallback }) => usedFallback)
      .map(({ pack }) => pack),
  };
};

export const ensurePromptPacks = async (language: AppLanguage) => {
  const storedValues = await AsyncStorage.multiGet([
    CONTENT_LANGUAGE_KEY,
    ...PROMPT_PACK_NAMES.map((pack) => PROMPT_PACK_STORAGE_KEYS[pack]),
  ]);
  const storedMap = Object.fromEntries(storedValues);

  const cacheIsValid =
    storedMap[CONTENT_LANGUAGE_KEY] === language &&
    PROMPT_PACK_NAMES.every((pack) => {
      const value = storedMap[PROMPT_PACK_STORAGE_KEYS[pack]];
      if (!value) return false;

      try {
        return isPromptArray(JSON.parse(value));
      } catch {
        return false;
      }
    });

  return cacheIsValid
    ? { requestedLanguage: language, fallbackPacks: [] }
    : storePrompts(language);
};

export const resetPromptHistory = async () => {
  await AsyncStorage.multiRemove([
    "playedPrinksPrompts",
    "playedCrazyPrompts",
    "playedFlirtyPrompts",
    "playedPersonalisedPrompts",
  ]);
};
