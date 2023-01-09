let names: string[] = [];

export const updateNames = (newNames: string[]) => {
  names = newNames.map((name) => name.trim());
};

export const getNames = () => {
  return names;
};
