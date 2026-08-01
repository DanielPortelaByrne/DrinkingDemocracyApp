import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GAME_MODE_PACKS,
  PLAYED_PROMPT_KEYS,
  Prompt,
  PromptPackName,
  StandardGameMode,
} from "./promptTypes";
import { PROMPT_PACK_STORAGE_KEYS, isPromptArray } from "./storePrompts";

const STANDARD_GAME_MODES = Object.keys(
  GAME_MODE_PACKS
) as StandardGameMode[];
const SESSION_PROMPT_COUNT = 30;
const SESSION_VIRUS_PAIR_COUNT = 4;
const MIN_VIRUS_DISTANCE = 5;

export type PersonalisedPack = Exclude<
  PromptPackName,
  "virus" | "virusend"
>;

export const shuffle = <T,>(items: readonly T[], random = Math.random): T[] => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled;
};

const promptIdentity = (prompt: Prompt) =>
  `${prompt.category.trim()}::${prompt.text.trim()}`;

export const getUnplayedPrompts = (
  prompts: readonly Prompt[],
  playedPrompts: readonly Prompt[],
  sessionSize = SESSION_PROMPT_COUNT
) => {
  const played = new Set(playedPrompts.map(promptIdentity));
  const remaining = prompts.filter((prompt) => !played.has(promptIdentity(prompt)));
  const minimumSessionSize = Math.min(sessionSize, prompts.length);

  return {
    prompts: remaining.length < minimumSessionSize ? [...prompts] : remaining,
    resetHistory: remaining.length < minimumSessionSize,
  };
};

const virusPairId = (prompt: Prompt) => prompt.id?.slice(0, -1);

export const prepareGameSession = (
  basePrompts: readonly Prompt[],
  virusPrompts: readonly Prompt[],
  virusEndPrompts: readonly Prompt[],
  random = Math.random
) => {
  const session = shuffle(basePrompts, random).slice(0, SESSION_PROMPT_COUNT);
  const endsById = new Map(
    virusEndPrompts
      .filter((prompt) => prompt.id)
      .map((prompt) => [virusPairId(prompt), prompt])
  );
  const availablePairs = virusPrompts
    .map((start, index) => ({
      start,
      end: endsById.get(virusPairId(start)) ?? virusEndPrompts[index],
    }))
    .filter((pair): pair is { start: Prompt; end: Prompt } => Boolean(pair.end));

  const selectedPairs = shuffle(availablePairs, random).slice(
    0,
    SESSION_VIRUS_PAIR_COUNT
  );

  selectedPairs.forEach(({ start, end }) => {
    const latestStartIndex = Math.max(0, session.length - MIN_VIRUS_DISTANCE);
    const startIndex = Math.floor(random() * (latestStartIndex + 1));
    session.splice(startIndex, 0, { ...start });

    const firstEndIndex = Math.min(
      session.length,
      startIndex + MIN_VIRUS_DISTANCE + 1
    );
    const endIndex =
      firstEndIndex +
      Math.floor(random() * (session.length - firstEndIndex + 1));
    session.splice(endIndex, 0, { ...end });
  });

  return session;
};

const parsePromptArray = (value: string | null) => {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return isPromptArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const loadStoredPromptData = async () => {
  const keys = [
    ...Object.values(PROMPT_PACK_STORAGE_KEYS),
    ...Object.values(PLAYED_PROMPT_KEYS),
  ];
  const stored = Object.fromEntries(await AsyncStorage.multiGet(keys));

  return {
    packs: Object.fromEntries(
      Object.entries(PROMPT_PACK_STORAGE_KEYS).map(([pack, key]) => [
        pack,
        parsePromptArray(stored[key]),
      ])
    ) as Record<PromptPackName, Prompt[]>,
    played: Object.fromEntries(
      Object.entries(PLAYED_PROMPT_KEYS).map(([mode, key]) => [
        mode,
        parsePromptArray(stored[key]),
      ])
    ) as Record<keyof typeof PLAYED_PROMPT_KEYS, Prompt[]>,
  };
};

export const selectRandomPrompts = async () => {
  const { packs, played } = await loadStoredPromptData();
  if (!packs.prompts.length || !packs.crazy.length || !packs.flirty.length) {
    throw new Error("Prompt packs have not been loaded");
  }

  const writes: [string, string][] = [];
  const historiesToReset: string[] = [];

  STANDARD_GAME_MODES.forEach((mode) => {
    const sourcePack = packs[GAME_MODE_PACKS[mode]];
    const eligible = getUnplayedPrompts(sourcePack, played[mode]);
    const session = prepareGameSession(
      eligible.prompts,
      packs.virus,
      packs.virusend
    );

    writes.push([mode, JSON.stringify(session)]);
    if (eligible.resetHistory) {
      historiesToReset.push(PLAYED_PROMPT_KEYS[mode]);
    }
  });

  await AsyncStorage.multiSet(writes);
  if (historiesToReset.length) {
    await AsyncStorage.multiRemove(historiesToReset);
  }
};

export const selectPersonalisedPrompts = async (
  selectedPacks: readonly PersonalisedPack[]
) => {
  if (!selectedPacks.length) {
    throw new Error("At least one prompt pack must be selected");
  }

  const { packs, played } = await loadStoredPromptData();
  const uniquePrompts = Array.from(
    new Map(
      selectedPacks
        .flatMap((pack) => packs[pack])
        .map((prompt) => [promptIdentity(prompt), prompt])
    ).values()
  );
  const eligible = getUnplayedPrompts(
    uniquePrompts,
    played.personalisedGamePrompts
  );
  const session = prepareGameSession(
    eligible.prompts,
    packs.virus,
    packs.virusend
  );

  await AsyncStorage.setItem(
    "personalisedGamePrompts",
    JSON.stringify(session)
  );
  if (eligible.resetHistory) {
    await AsyncStorage.removeItem(
      PLAYED_PROMPT_KEYS.personalisedGamePrompts
    );
  }
};
