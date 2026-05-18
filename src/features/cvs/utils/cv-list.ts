import type { Cv } from "../types";

export type CvSortField = "name" | "employee";
export type SortDirection = "asc" | "desc";

function filterCvs(cvs: Cv[], search: string): Cv[] {
  const query = search.trim().toLowerCase();
  if (!query) {
    return cvs;
  }
  return cvs.filter((cv) => {
    const employee = cv.user?.email ?? "";
    return (
      cv.name.toLowerCase().includes(query) ||
      cv.description.toLowerCase().includes(query) ||
      employee.toLowerCase().includes(query) ||
      (cv.education ?? "").toLowerCase().includes(query)
    );
  });
}

function sortCvs(
  cvs: Cv[],
  sortField: CvSortField,
  direction: SortDirection,
): Cv[] {
  const sorted = [...cvs].sort((a, b) => {
    const aValue =
      sortField === "name"
        ? a.name.toLowerCase()
        : (a.user?.email ?? "").toLowerCase();
    const bValue =
      sortField === "name"
        ? b.name.toLowerCase()
        : (b.user?.email ?? "").toLowerCase();
    return aValue.localeCompare(bValue);
  });
  return direction === "asc" ? sorted : sorted.reverse();
}

export { filterCvs, sortCvs };
