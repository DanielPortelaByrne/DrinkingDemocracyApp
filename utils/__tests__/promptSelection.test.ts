import {
  getUnplayedPrompts,
  prepareGameSession,
  shuffle,
} from "../selectRandomPrompts";
import { Prompt } from "../promptTypes";

jest.mock("@react-native-async-storage/async-storage", () => ({
  multiGet: jest.fn(),
  multiRemove: jest.fn(),
  multiSet: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));

const makePrompts = (count: number): Prompt[] =>
  Array.from({ length: count }, (_, index) => ({
    category: "RULE",
    text: `Prompt ${index + 1}`,
  }));

describe("prompt session selection", () => {
  it("shuffles without mutating the source array", () => {
    const source = [1, 2, 3, 4];
    const shuffled = shuffle(source, () => 0);

    expect(source).toEqual([1, 2, 3, 4]);
    expect(shuffled).toHaveLength(source.length);
    expect([...shuffled].sort()).toEqual(source);
    expect(shuffled).not.toEqual(source);
  });

  it("starts a fresh history when too few unseen prompts remain", () => {
    const prompts = makePrompts(5);
    const result = getUnplayedPrompts(prompts, prompts.slice(0, 4), 3);

    expect(result.resetHistory).toBe(true);
    expect(result.prompts).toEqual(prompts);
  });

  it("keeps unseen prompts when there are enough for a session", () => {
    const prompts = makePrompts(5);
    const result = getUnplayedPrompts(prompts, prompts.slice(0, 2), 3);

    expect(result.resetHistory).toBe(false);
    expect(result.prompts).toEqual(prompts.slice(2));
  });

  it("places every selected virus end after its matching start", () => {
    const starts: Prompt[] = [
      { id: "1a", category: "VIRUS", text: "Start one" },
      { id: "2a", category: "VIRUS", text: "Start two" },
    ];
    const ends: Prompt[] = [
      { id: "1b", category: "VIRUS END", text: "End one" },
      { id: "2b", category: "VIRUS END", text: "End two" },
    ];

    const session = prepareGameSession(
      makePrompts(30),
      starts,
      ends,
      () => 0.5
    );

    starts.forEach((start) => {
      const id = start.id?.slice(0, -1);
      const startIndex = session.findIndex((prompt) => prompt.id === `${id}a`);
      const endIndex = session.findIndex((prompt) => prompt.id === `${id}b`);
      expect(startIndex).toBeGreaterThanOrEqual(0);
      expect(endIndex).toBeGreaterThan(startIndex);
    });
  });
});
