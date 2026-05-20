import type {
  NormalizedSkillCatalogItem,
  SkillCatalogItem,
} from "@/features/users/types/userSkills.types";

export function normalizeCatalogItem(
  item: SkillCatalogItem,
): NormalizedSkillCatalogItem {
  return {
    id: item.id,
    name: item.name,
    categoryId: item.category?.id?.trim() || "other",
  };
}
