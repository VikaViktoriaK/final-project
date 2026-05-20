/** Profile `skills` — GraphQL type `SkillMastery` */
export type ProfileSkillRow = {
  name: string;
  mastery: string;
  categoryId: string;
};

export type UserSkill = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  mastery: string;
  progressColor: string;
};

export type UserSkillCategory = {
  id: string;
  title: string;
  skills: UserSkill[];
};

export type SkillCategoryCatalogItem = {
  id: string;
  name: string;
};

/** Catalog `skills` — GraphQL type `Skill` (nested `category: SkillCategory`) */
export type SkillCatalogItem = {
  id: string;
  name: string;
  category?: {
    id: string;
    name?: string | null;
  } | null;
};

/** Normalized catalog row used in UI and mutations */
export type NormalizedSkillCatalogItem = {
  id: string;
  name: string;
  categoryId: string;
};
