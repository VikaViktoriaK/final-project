import { groupSkillsByCategory } from "./group-skills";
import { mockSkill, mockSkillCategories } from "../../test-utils/fixtures";

describe("groupSkillsByCategory", () => {
  it("groups skills under parent category label", () => {
    const grouped = groupSkillsByCategory(
      [mockSkill, { name: "HTML", categoryId: "cat-1", mastery: "Novice" }],
      mockSkillCategories,
    );

    expect(grouped).toEqual([
      {
        categoryLabel: "Frontend",
        skills: [
          { name: "React", categoryId: "cat-2", mastery: "Advanced" },
          { name: "HTML", categoryId: "cat-1", mastery: "Novice" },
        ],
      },
    ]);
  });

  it("places skills without category under Other", () => {
    const grouped = groupSkillsByCategory(
      [{ name: "Docker", categoryId: null, mastery: "Competent" }],
      [],
    );

    expect(grouped).toEqual([
      {
        categoryLabel: "Other",
        skills: [{ name: "Docker", categoryId: null, mastery: "Competent" }],
      },
    ]);
  });
});
