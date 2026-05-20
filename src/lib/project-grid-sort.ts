import { sortByLocaleCompare, type SortDirection } from "./sort";

type ProjectGridSortField = "name" | "domain" | "startDate" | "endDate";

type ProjectGridSortable = {
  name: string;
  domain: string;
  start_date: string;
  end_date: string | null;
};

function getProjectGridSortValue(
  item: ProjectGridSortable,
  field: ProjectGridSortField,
): string {
  switch (field) {
    case "domain":
      return item.domain ?? "";
    case "startDate":
      return item.start_date ?? "";
    case "endDate":
      return item.end_date ?? "";
    default:
      return item.name ?? "";
  }
}

function sortProjectGridRows<T extends ProjectGridSortable>(
  items: T[],
  field: ProjectGridSortField,
  direction: SortDirection,
): T[] {
  return sortByLocaleCompare(
    items,
    (item) => getProjectGridSortValue(item, field),
    direction,
  );
}

export type { ProjectGridSortField, ProjectGridSortable };
export { getProjectGridSortValue, sortProjectGridRows };
