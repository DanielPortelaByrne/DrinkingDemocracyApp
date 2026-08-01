import {
  formatSubmittedPrompt,
  normalizeSubmittedPromptText,
} from "../formatSubmittedPrompt";

describe("prompt submission formatting", () => {
  it("normalizes longer placeholders before Name", () => {
    expect(
      normalizeSubmittedPromptText("Name meets Name2, then NAME3 joins")
    ).toBe("[Name] meets [Name2], then [Name3] joins");
  });

  it("does not double-wrap an existing placeholder", () => {
    expect(normalizeSubmittedPromptText("[Name] picks Name2")).toBe(
      "[Name] picks [Name2]"
    );
  });

  it("removes a leading at-sign from submitted handles", () => {
    expect(
      JSON.parse(
        formatSubmittedPrompt({
          category: "VOTE",
          handle: "@party-person",
          text: "Name votes",
        })
      )
    ).toEqual({
      category: "VOTE",
      handle: "party-person",
      text: "[Name] votes",
    });
  });
});
