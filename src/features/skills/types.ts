export type SkillCategoryOption = {
  id: string;
  name: string;
};

export type SkillRow = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
};

export type SkillsSortField = "name" | "category";
