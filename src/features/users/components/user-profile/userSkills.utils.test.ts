import {
  resolveSkillCategoryId,
  skillNotOnProfile,
  skillRowKey,
} from "./userSkills.utils";

describe("user skill utils", () => {
  it("normalizes skill keys and missing category ids", () => {
    expect(skillRowKey({ name: " React " })).toBe("react");
    expect(
      resolveSkillCategoryId({
        name: "React",
        mastery: "Advanced",
        categoryId: "",
      }),
    ).toBe("other");
  });

  it("checks catalog skills case-insensitively against profile rows", () => {
    const current = [{ name: " React ", mastery: "Advanced", categoryId: "1" }];

    expect(skillNotOnProfile("react", current)).toBe(false);
    expect(skillNotOnProfile("Node", current)).toBe(true);
  });
});
