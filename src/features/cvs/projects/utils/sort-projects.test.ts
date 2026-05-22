import { sortProjects } from "./sort-projects";
import type { CvProject } from "../../shared/types";

const projects = [
  {
    id: "1",
    name: "Zulu",
    internal_name: "zulu",
    description: "",
    domain: "HR",
    start_date: "2024-01-01",
    end_date: null,
    environment: [],
    roles: [],
    responsibilities: [],
    project: null,
  },
  {
    id: "2",
    name: "Alpha",
    internal_name: "alpha",
    description: "",
    domain: "Finance",
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    environment: [],
    roles: [],
    responsibilities: [],
    project: null,
  },
] satisfies CvProject[];

describe("sortProjects", () => {
  it("sorts CV projects by shared grid fields", () => {
    expect(
      sortProjects(projects, "name", "asc").map((item) => item.name),
    ).toEqual(["Alpha", "Zulu"]);
    expect(
      sortProjects(projects, "startDate", "desc").map((item) => item.id),
    ).toEqual(["1", "2"]);
  });
});
