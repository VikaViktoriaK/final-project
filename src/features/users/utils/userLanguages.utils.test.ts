import {
  isNativeProficiency,
  languageNotOnProfile,
  languageRowKey,
} from "./userLanguages.utils";

describe("user language utils", () => {
  it("detects native proficiency labels", () => {
    expect(isNativeProficiency(" Native ")).toBe(true);
    expect(isNativeProficiency("B2")).toBe(false);
  });

  it("builds stable language row keys", () => {
    expect(languageRowKey({ name: "English", proficiency: "C1" })).toBe(
      "English:C1",
    );
  });

  it("checks catalog languages case-insensitively against profile rows", () => {
    const current = [{ name: " English ", proficiency: "C1" }];

    expect(languageNotOnProfile("english", current)).toBe(false);
    expect(languageNotOnProfile("Spanish", current)).toBe(true);
  });
});
