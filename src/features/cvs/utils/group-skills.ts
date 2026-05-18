import type { SkillCategory, SkillMastery } from "../types";

type GroupedSkills = {
  categoryLabel: string;
  skills: SkillMastery[];
};

function groupSkillsByCategory(
  skills: SkillMastery[],
  categories: SkillCategory[],
): GroupedSkills[] {
  const categoryMap = new Map<string, string>();
  for (const category of categories) {
    categoryMap.set(category.id, category.parent?.name ?? category.name);
    for (const child of category.children) {
      categoryMap.set(child.id, category.name);
    }
  }

  const groups = new Map<string, SkillMastery[]>();
  for (const skill of skills) {
    const label = skill.categoryId
      ? (categoryMap.get(skill.categoryId) ?? "Other")
      : "Other";
    const existing = groups.get(label) ?? [];
    existing.push(skill);
    groups.set(label, existing);
  }

  return Array.from(groups.entries()).map(([categoryLabel, items]) => ({
    categoryLabel,
    skills: items,
  }));
}

export type { GroupedSkills };
export { groupSkillsByCategory };
