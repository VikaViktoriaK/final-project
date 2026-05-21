import type { SortDirection } from "@/lib/sort";
import type { Cv } from "../../shared/types";

export type CvSortField = "name" | "education" | "employee";
export type { SortDirection };

function filterCvs(cvs: Cv[], search: string): Cv[] {
  const query = search.trim().toLowerCase();
  const validCvs = cvs.filter((cv): cv is Cv => Boolean(cv?.id && cv?.name));
  if (!query) {
    return validCvs;
  }
  return validCvs.filter((cv) => {
    const employee = cv.user?.email ?? "";
    return (
      cv.name.toLowerCase().includes(query) ||
      cv.description.toLowerCase().includes(query) ||
      employee.toLowerCase().includes(query) ||
      (cv.education ?? "").toLowerCase().includes(query)
    );
  });
}

function getSortValue(cv: Cv, sortField: CvSortField): string {
  if (sortField === "name") {
    return cv.name.toLowerCase();
  }
  if (sortField === "education") {
    return (cv.education ?? "").toLowerCase();
  }
  return (cv.user?.email ?? "").toLowerCase();
}

function sortCvs(
  cvs: Cv[],
  sortField: CvSortField,
  direction: SortDirection,
): Cv[] {
  const validCvs = cvs.filter((cv): cv is Cv => Boolean(cv?.id && cv?.name));
  const sorted = [...validCvs].sort((a, b) =>
    getSortValue(a, sortField).localeCompare(getSortValue(b, sortField)),
  );
  return direction === "asc" ? sorted : sorted.reverse();
}

export { filterCvs, sortCvs };
