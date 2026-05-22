export type SkillCategoryNode = {
  id: string;
  name?: string | null;
  parent?: { id?: string; name?: string | null } | null;
  children?: readonly { id: string; name?: string }[];
};

export type SkillCategoryCatalogItem = {
  id: string;
  name: string;
};

export type SkillWithCategoryId = {
  name: string;
  categoryId?: string | null;
};

export type SkillsByLabelGroup<TSkill> = {
  categoryLabel: string;
  skills: TSkill[];
};

/** @deprecated Prefer `SkillsByLabelGroup` */
export type GroupedSkills<
  TSkill extends SkillWithCategoryId = SkillWithCategoryId,
> = SkillsByLabelGroup<TSkill>;

export type SkillsByCategoryGroup<TSkill> = {
  id: string;
  title: string;
  skills: TSkill[];
};

const DEFAULT_UNKNOWN_LABEL = "Other";

type LabelModeOptions = {
  mode?: "label";
  unknownLabel?: string;
  skipUnnamed?: boolean;
};

type CatalogModeOptions<TSkill, TOutput> = {
  mode: "catalog";
  getCategoryId?: (skill: TSkill) => string;
  mapSkill: (
    skill: TSkill,
    categories: ReadonlyArray<SkillCategoryCatalogItem>,
  ) => TOutput;
  resolveCategoryTitle?: (
    categoryId: string,
    categories: ReadonlyArray<SkillCategoryCatalogItem>,
    skills: TOutput[],
  ) => string;
};

export function buildCategoryLabelMap(
  categories: readonly SkillCategoryNode[],
  unknownLabel = DEFAULT_UNKNOWN_LABEL,
): Map<string, string> {
  const categoryMap = new Map<string, string>();

  for (const category of categories) {
    if (!category?.id) {
      continue;
    }

    const categoryLabel =
      category.parent?.name ?? category.name ?? unknownLabel;
    categoryMap.set(category.id, categoryLabel);

    for (const child of category.children ?? []) {
      if (!child?.id) {
        continue;
      }
      categoryMap.set(child.id, category.name ?? categoryLabel);
    }
  }

  return categoryMap;
}

export function resolveSkillCategoryLabel(
  categoryId: string | null | undefined,
  categoryMap: Map<string, string>,
  unknownLabel = DEFAULT_UNKNOWN_LABEL,
): string {
  if (!categoryId) {
    return unknownLabel;
  }
  return categoryMap.get(categoryId) ?? unknownLabel;
}

function groupSkillsByLabel<TSkill extends SkillWithCategoryId>(
  skills: readonly TSkill[],
  categories: readonly SkillCategoryNode[],
  options?: LabelModeOptions,
): SkillsByLabelGroup<TSkill>[] {
  const unknownLabel = options?.unknownLabel ?? DEFAULT_UNKNOWN_LABEL;
  const skipUnnamed = options?.skipUnnamed ?? true;
  const categoryMap = buildCategoryLabelMap(categories, unknownLabel);
  const groups = new Map<string, TSkill[]>();

  for (const skill of skills) {
    if (skipUnnamed && !skill?.name) {
      continue;
    }

    const label = resolveSkillCategoryLabel(
      skill.categoryId,
      categoryMap,
      unknownLabel,
    );
    groups.set(label, [...(groups.get(label) ?? []), skill]);
  }

  return Array.from(groups.entries()).map(([categoryLabel, items]) => ({
    categoryLabel,
    skills: items,
  }));
}

function groupSkillsByCatalogId<TSkill, TOutput>(
  skills: readonly TSkill[],
  categories: ReadonlyArray<SkillCategoryCatalogItem>,
  options: CatalogModeOptions<TSkill, TOutput>,
): SkillsByCategoryGroup<TOutput>[] {
  const getCategoryId =
    options.getCategoryId ??
    ((skill: TSkill) => {
      const row = skill as SkillWithCategoryId;
      return row.categoryId?.trim() || "other";
    });

  const resolveCategoryTitle =
    options.resolveCategoryTitle ??
    ((
      categoryId: string,
      catalog: ReadonlyArray<SkillCategoryCatalogItem>,
      categorySkills: TOutput[],
    ) => {
      const catalogName = catalog.find(
        (category) => category.id === categoryId,
      )?.name;
      if (catalogName) {
        return catalogName;
      }

      const firstSkill = categorySkills[0] as { categoryName?: string };
      return firstSkill?.categoryName ?? categoryId;
    });

  const byCategoryId = new Map<string, TOutput[]>();

  for (const skill of skills) {
    const categoryId = getCategoryId(skill);
    const list = byCategoryId.get(categoryId) ?? [];
    list.push(options.mapSkill(skill, categories));
    byCategoryId.set(categoryId, list);
  }

  const result: SkillsByCategoryGroup<TOutput>[] = [];
  const placed = new Set<string>();

  for (const category of categories) {
    const categorySkills = byCategoryId.get(category.id);
    if (!categorySkills?.length) {
      continue;
    }

    result.push({
      id: category.id,
      title: category.name,
      skills: categorySkills,
    });
    placed.add(category.id);
  }

  for (const [categoryId, categorySkills] of byCategoryId) {
    if (placed.has(categoryId)) {
      continue;
    }

    result.push({
      id: categoryId,
      title: resolveCategoryTitle(categoryId, categories, categorySkills),
      skills: categorySkills,
    });
  }

  return result;
}

export function groupSkillsByCategory<TSkill, TOutput>(
  skills: readonly TSkill[],
  categories: ReadonlyArray<SkillCategoryCatalogItem>,
  options: CatalogModeOptions<TSkill, TOutput>,
): SkillsByCategoryGroup<TOutput>[];

export function groupSkillsByCategory<TSkill extends SkillWithCategoryId>(
  skills: readonly TSkill[],
  categories: ReadonlyArray<SkillCategoryNode>,
  options?: LabelModeOptions,
): SkillsByLabelGroup<TSkill>[];

export function groupSkillsByCategory<
  TSkill extends SkillWithCategoryId,
  TOutput,
>(
  skills: readonly TSkill[],
  categories: ReadonlyArray<SkillCategoryNode | SkillCategoryCatalogItem>,
  options?: LabelModeOptions | CatalogModeOptions<TSkill, TOutput>,
): SkillsByLabelGroup<TSkill>[] | SkillsByCategoryGroup<TOutput>[] {
  if (options?.mode === "catalog") {
    return groupSkillsByCatalogId(
      skills,
      categories as ReadonlyArray<SkillCategoryCatalogItem>,
      options as CatalogModeOptions<TSkill, TOutput>,
    );
  }

  return groupSkillsByLabel(
    skills,
    categories as ReadonlyArray<SkillCategoryNode>,
    options,
  );
}
