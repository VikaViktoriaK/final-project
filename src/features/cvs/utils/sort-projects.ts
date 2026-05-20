import type { CvProject } from "../types";
import {
  sortProjectGridRows,
  type ProjectGridSortField,
} from "@/lib/project-grid-sort";
import type { SortDirection } from "@/lib/sort";

type ProjectSortField = ProjectGridSortField;

function sortProjects(
  projects: CvProject[],
  field: ProjectSortField,
  direction: SortDirection,
): CvProject[] {
  return sortProjectGridRows(projects, field, direction);
}

export type { ProjectSortField };
export { sortProjects };
