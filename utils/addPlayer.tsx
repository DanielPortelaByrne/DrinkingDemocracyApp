import { getNames, updateNames } from "../components/nameStore";

export const addPlayer = async (playerName: string) => {
  const trimmedName = playerName.trim();
  if (!trimmedName) return;

  const names = [...getNames().filter(Boolean), trimmedName];
  await updateNames(names);
};
