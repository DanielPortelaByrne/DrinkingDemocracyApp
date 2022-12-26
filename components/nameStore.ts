let names: string[] = [];

export const updateNames = (newNames: string[]) => {
  names = newNames;
}

export const getNames = () => {
    return names;
  }
  