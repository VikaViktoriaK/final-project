import {
  buildCategoryLabelMap,
  groupSkillsByCategory,
  resolveSkillCategoryLabel,
  type SkillCategoryNode,
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

  it("skips invalid categories and uses parent names when available", () => {
    const categoryMap = buildCategoryLabelMap([
      { id: "", name: "Invalid" },
      {
        id: "parent",
        name: "ChildParent",
        parent: { id: "root", name: "Parent Group" },
        children: [{ id: "", name: "Bad child" }],
      },
      {
        id: "child-only",
        name: "ChildParent",
        children: [{ id: "valid-child", name: "Child" }],
      },
    ] as SkillCategoryNode[]);

    expect(categoryMap.has("")).toBe(false);
    expect(categoryMap.get("parent")).toBe("Parent Group");
    expect(categoryMap.get("valid-child")).toBe("ChildParent");
  });
});

describe("resolveSkillCategoryLabel", () => {
  it("returns unknown label for missing category id", () => {
    const categoryMap = buildCategoryLabelMap(treeCategories);

    expect(resolveSkillCategoryLabel(null, categoryMap)).toBe("Other");
    expect(resolveSkillCategoryLabel(undefined, categoryMap, "Unknown")).toBe(
      "Unknown",
    );
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

  it("includes unnamed skills when skipUnnamed is false", () => {
    const grouped = groupSkillsByCategory(
      [{ name: "", categoryId: "frontend" }],
      treeCategories,
      { skipUnnamed: false },
    );

    expect(grouped[0].skills).toHaveLength(1);
  });

  it("uses custom unknown labels in label mode", () => {
    const grouped = groupSkillsByCategory(
      [{ name: "Orphan", categoryId: "missing" }],
      [],
      { unknownLabel: "Uncategorized" },
    );

    expect(grouped[0].categoryLabel).toBe("Uncategorized");
  });

  it("resolves catalog titles from skill categoryName when catalog misses", () => {
    const result = groupSkillsByCategory(
      [{ name: "Docker", categoryId: "devops" }],
      [],
      {
        mode: "catalog",
        mapSkill: (skill) => ({
          name: skill.name,
          categoryName: "DevOps",
        }),
      },
    );

    expect(result[0].title).toBe("DevOps");
  });

  it("falls back to category id when catalog title cannot be resolved", () => {
    const result = groupSkillsByCategory(
      [{ name: "Rust", categoryId: "systems" }],
      [],
      {
        mode: "catalog",
        mapSkill: (skill) => ({ name: skill.name }),
      },
    );

    expect(result[0].title).toBe("systems");
  });

  it("uses default category id when skill categoryId is blank", () => {
    const result = groupSkillsByCategory(
      [{ name: "General", categoryId: "   " }],
      [{ id: "other", name: "Other" }],
      {
        mode: "catalog",
        mapSkill: (skill) => skill,
      },
    );

    expect(result[0].id).toBe("other");
  });

  it("skips empty catalog categories and keeps populated ones", () => {
    const result = groupSkillsByCategory(
      [{ name: "Go", categoryId: "backend" }],
      [
        { id: "frontend", name: "Frontend" },
        { id: "backend", name: "Backend" },
      ],
      {
        mode: "catalog",
        mapSkill: (skill) => skill,
      },
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("backend");
  });
});
