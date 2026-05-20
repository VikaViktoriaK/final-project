export type SortOrder = "asc" | "desc";

export function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase();
}

export function compareLocaleStrings(a: string, b: string): number {
  return normalizeSearchText(a).localeCompare(
    normalizeSearchText(b),
    undefined,
    {
      sensitivity: "base",
    },
  );
}

export function filterAndSortByField<T>(
  items: T[],
  query: string,
  order: SortOrder,
  getField: (item: T) => string,
): T[] {
  const q = normalizeSearchText(query);
  const result = q
    ? items.filter((item) => normalizeSearchText(getField(item)).includes(q))
    : [...items];

  result.sort((a, b) => {
    const cmp = compareLocaleStrings(getField(a), getField(b));
    return order === "asc" ? cmp : -cmp;
  });

  return result;
}
