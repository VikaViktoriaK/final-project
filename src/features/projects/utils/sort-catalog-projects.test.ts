import { sortCatalogProjects } from "./sort-catalog-projects";
import type { Project } from "../types";

const projects: Project[] = [
  {
    id: "1",
    name: "Zulu",
    internal_name: "zulu",
    domain: "HR",
    description: "",
    start_date: "2024-01-01",
    end_date: null,
    environment: [],
  },
  {
    id: "2",
    name: "Alpha",
    internal_name: "alpha",
    domain: "Finance",
    description: "",
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    environment: [],
  },
];

describe("sortCatalogProjects", () => {
  it("sorts by name ascending", () => {
    expect(
      sortCatalogProjects(projects, "name", "asc").map((item) => item.name),
    ).toEqual(["Alpha", "Zulu"]);
  });

  it("sorts by start date descending without mutating input", () => {
    const sorted = sortCatalogProjects(projects, "startDate", "desc");

    expect(sorted.map((item) => item.id)).toEqual(["1", "2"]);
    expect(projects.map((item) => item.id)).toEqual(["1", "2"]);
  });
});
