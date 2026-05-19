import type { CvProject } from "../types";
import type { SortDirection } from "./cv-list";

type ProjectSortField = "name" | "domain" | "startDate" | "endDate";

function getProjectSortValue(
  project: CvProject,
  field: ProjectSortField,
): string {
  switch (field) {
    case "domain":
      return project.domain ?? "";
    case "startDate":
      return project.start_date ?? "";
    case "endDate":
      return project.end_date ?? "";
    default:
      return project.name ?? "";
  }
}

function sortProjects(
  projects: CvProject[],
  field: ProjectSortField,
  direction: SortDirection,
): CvProject[] {
  const sorted = [...projects].sort((left, right) =>
    getProjectSortValue(left, field).localeCompare(
      getProjectSortValue(right, field),
    ),
  );
  return direction === "asc" ? sorted : sorted.reverse();
}

export type { ProjectSortField };
export { sortProjects };
