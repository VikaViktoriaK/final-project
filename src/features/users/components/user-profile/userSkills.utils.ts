import { masteryToProgressColor } from "@/features/users/constants/userSkills.mastery";
import type {
  ProfileSkillRow,
  SkillCategoryCatalogItem,
  UserSkill,
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
  categories: ReadonlyArray<SkillCategoryCatalogItem> = [],
): string {
  return (
    categories.find((c) => c.id === categoryId)?.name ?? categoryId ?? "Other"
  );
}

export { normalizeCatalogItem } from "@/features/users/utils/skillCatalog.utils";

export function enrichProfileSkill(
  row: ProfileSkillRow,
  categories: ReadonlyArray<SkillCategoryCatalogItem> = [],
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
