import type { Project } from "../types";
import type { CatalogProjectSortField } from "../types";
import { sortProjectGridRows } from "@/lib/project-grid-sort";
import type { SortDirection } from "@/lib/sort";

function sortCatalogProjects(
  projects: Project[],
  field: CatalogProjectSortField,
  direction: SortDirection,
): Project[] {
  return sortProjectGridRows(projects, field, direction);
}

export { sortCatalogProjects };
