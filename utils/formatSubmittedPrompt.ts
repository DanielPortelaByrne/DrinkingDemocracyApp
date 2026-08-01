import { Prompt } from "./promptTypes";

const placeholders = ["Name3", "Name2", "Name"] as const;

export const normalizeSubmittedPromptText = (text: string) => {
  let normalized = text.trim();

  placeholders.forEach((placeholder, index) => {
    normalized = normalized.replace(
      new RegExp(`\\[${placeholder}\\]`, "gi"),
      `__DD_PLACEHOLDER_${index}__`
    );
  });
  placeholders.forEach((placeholder) => {
    normalized = normalized.replace(
      new RegExp(`\\b${placeholder}\\b`, "gi"),
      `[${placeholder}]`
    );
  });
  placeholders.forEach((placeholder, index) => {
    normalized = normalized.replace(
      new RegExp(`__DD_PLACEHOLDER_${index}__`, "g"),
      `[${placeholder}]`
    );
  });

  return normalized;
};

export const formatSubmittedPrompt = (prompt: Prompt) =>
  JSON.stringify({
    ...prompt,
    text: normalizeSubmittedPromptText(prompt.text),
    handle: prompt.handle?.trim().replace(/^@/, "") ?? "",
  });
