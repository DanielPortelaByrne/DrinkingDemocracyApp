export type Prompt = {
  id?: string;
  text: string;
  category: string;
  handle?: string;
};

export const PROMPT_PACK_NAMES = [
  "prompts",
  "crazy",
  "flirty",
  "virus",
  "virusend",
] as const;

export type PromptPackName = (typeof PROMPT_PACK_NAMES)[number];

export const GAME_MODES = [
  "prinkGamePrompts",
  "crazyGamePrompts",
  "flirtyGamePrompts",
  "personalisedGamePrompts",
] as const;

export type GameMode = (typeof GAME_MODES)[number];
export type StandardGameMode = Exclude<GameMode, "personalisedGamePrompts">;

export const GAME_MODE_PACKS: Record<StandardGameMode, PromptPackName> = {
  prinkGamePrompts: "prompts",
  crazyGamePrompts: "crazy",
  flirtyGamePrompts: "flirty",
};

export const PLAYED_PROMPT_KEYS: Record<GameMode, string> = {
  prinkGamePrompts: "playedPrinksPrompts",
  crazyGamePrompts: "playedCrazyPrompts",
  flirtyGamePrompts: "playedFlirtyPrompts",
  personalisedGamePrompts: "playedPersonalisedPrompts",
};
