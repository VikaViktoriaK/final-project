import { FALLBACK_SKILL_CATEGORIES } from "@/features/users/constants/userSkills.constants";
import { masteryToProgressColor } from "@/features/users/constants/userSkills.mastery";
import type {
  NormalizedSkillCatalogItem,
  ProfileSkillRow,
  SkillCategoryCatalogItem,
  SkillCatalogItem,
  UserSkill,
  UserSkillCategory,
} from "@/features/users/types/userSkills.types";

export function skillRowKey(skill: { name: string }): string {
  return skill.name.trim().toLowerCase();
}

export function skillNotOnProfile(
  catalogName: string,
  current: ProfileSkillRow[],
): boolean {
  const n = catalogName.trim().toLowerCase();
  return !current.some((row) => row.name.trim().toLowerCase() === n);
}

export function resolveSkillCategoryId(row: ProfileSkillRow): string {
  return row.categoryId?.trim() || "other";
}

export function resolveSkillCategoryName(
  categoryId: string,
  categories: SkillCategoryCatalogItem[] = FALLBACK_SKILL_CATEGORIES,
): string {
  return (
    categories.find((c) => c.id === categoryId)?.name ?? categoryId ?? "Other"
  );
}

export function normalizeCatalogItem(
  item: SkillCatalogItem,
): NormalizedSkillCatalogItem {
  return {
    id: item.id,
    name: item.name,
    categoryId: item.category?.id?.trim() || "other",
  };
}

export function enrichProfileSkill(
  row: ProfileSkillRow,
  categories: SkillCategoryCatalogItem[] = FALLBACK_SKILL_CATEGORIES,
): UserSkill {
  const categoryId = resolveSkillCategoryId(row);
  return {
    id: skillRowKey(row),
    name: row.name,
    categoryId,
    categoryName: resolveSkillCategoryName(categoryId, categories),
    mastery: row.mastery,
    progressColor: masteryToProgressColor(row.mastery),
  };
}

/**
 * Groups profile skills under `skillCategories` from the API (preserves API order).
 */
export function groupSkillsByCategory(
  skills: ProfileSkillRow[],
  categories: SkillCategoryCatalogItem[] = FALLBACK_SKILL_CATEGORIES,
): UserSkillCategory[] {
  const byCategoryId = new Map<string, UserSkill[]>();

  for (const row of skills) {
    const categoryId = resolveSkillCategoryId(row);
    const list = byCategoryId.get(categoryId) ?? [];
    list.push(enrichProfileSkill(row, categories));
    byCategoryId.set(categoryId, list);
  }

  const result: UserSkillCategory[] = [];
  const placed = new Set<string>();

  for (const category of categories) {
    const categorySkills = byCategoryId.get(category.id);
    if (!categorySkills?.length) continue;
    result.push({
      id: category.id,
      title: category.name,
      skills: categorySkills,
    });
    placed.add(category.id);
  }

  for (const [categoryId, categorySkills] of byCategoryId) {
    if (placed.has(categoryId)) continue;
    result.push({
      id: categoryId,
      title: categorySkills[0]?.categoryName ?? categoryId,
      skills: categorySkills,
    });
  }

  return result;
}
