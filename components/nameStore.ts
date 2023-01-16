let names: string[] = [];

export const updateNames = (newNames: string[]) => {
  names = newNames.map((name) => name.trim()).filter(Boolean);
};

export const getNames = () => {
  return names;
};
