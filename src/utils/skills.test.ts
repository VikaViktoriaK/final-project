import {
  buildCategoryLabelMap,
  groupSkillsByCategory,
  resolveSkillCategoryLabel,
} from "./skills";
import {
  enrichProfileSkill,
  resolveSkillCategoryId,
} from "@/features/users/components/user-profile/userSkills.utils";

const treeCategories = [
  {
    id: "frontend",
    name: "Frontend",
    parent: null,
    children: [{ id: "react-category", name: "React" }],
  },
  {
    id: "backend",
    name: "Backend",
    parent: null,
    children: [],
  },
];

const treeSkills = [
  { name: "React", categoryId: "react-category", mastery: "Advanced" },
  { name: "Node", categoryId: "backend", mastery: "Competent" },
  { name: "Unknown", categoryId: "missing", mastery: "Novice" },
  { name: "", categoryId: "frontend", mastery: "Novice" },
];

describe("buildCategoryLabelMap", () => {
  it("maps parent and child category ids to display labels", () => {
    const categoryMap = buildCategoryLabelMap(treeCategories);

    expect(categoryMap.get("frontend")).toBe("Frontend");
    expect(categoryMap.get("react-category")).toBe("Frontend");
    expect(resolveSkillCategoryLabel("missing", categoryMap)).toBe("Other");
  });
});

describe("groupSkillsByCategory", () => {
  it("groups skills by parent category labels and skips nameless skills", () => {
    const grouped = groupSkillsByCategory(treeSkills, treeCategories);

    expect(grouped).toEqual([
      { categoryLabel: "Frontend", skills: [treeSkills[0]] },
      { categoryLabel: "Backend", skills: [treeSkills[1]] },
      { categoryLabel: "Other", skills: [treeSkills[2]] },
    ]);
  });

  it("groups skills by API category order and appends unknown categories", () => {
    const result = groupSkillsByCategory(
      [
        { name: "React", mastery: "Advanced", categoryId: "frontend" },
        { name: "Postgres", mastery: "Regular", categoryId: "database" },
      ],
      [{ id: "frontend", name: "Frontend" }],
      {
        mode: "catalog",
        getCategoryId: resolveSkillCategoryId,
        mapSkill: enrichProfileSkill,
      },
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
