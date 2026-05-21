export type SortDirection = "asc" | "desc";

function toggleSortDirection(direction: SortDirection): SortDirection {
  return direction === "asc" ? "desc" : "asc";
}

function sortByLocaleCompare<T>(
  items: T[],
  getValue: (item: T) => string,
  direction: SortDirection,
): T[] {
  const sorted = [...items].sort((left, right) =>
    getValue(left).localeCompare(getValue(right)),
  );
  return direction === "asc" ? sorted : sorted.reverse();
}

export { sortByLocaleCompare, toggleSortDirection };
