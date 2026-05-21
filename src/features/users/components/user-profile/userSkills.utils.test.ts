import {
  groupSkillsByCategory,
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

  it("groups skills by API category order and appends unknown categories", () => {
    const result = groupSkillsByCategory(
      [
        { name: "React", mastery: "Advanced", categoryId: "frontend" },
        { name: "Postgres", mastery: "Regular", categoryId: "database" },
      ],
      [{ id: "frontend", name: "Frontend" }],
    );

    expect(result.map((category) => category.title)).toEqual([
      "Frontend",
      "database",
    ]);
    expect(result[0].skills[0]).toMatchObject({
      id: "react",
      name: "React",
      categoryName: "Frontend",
    });
  });
});
