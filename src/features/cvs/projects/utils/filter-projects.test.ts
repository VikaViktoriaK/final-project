import filterProjects from "./filter-projects";
import type { CvProject } from "../../shared/types";

const projects = [
  {
    id: "1",
    name: "HRM App",
    internal_name: "hrm",
    description: "Employee management",
    domain: "Human Resources",
    start_date: "2024-01-01",
    end_date: null,
    environment: [],
    roles: [],
    responsibilities: [],
    project: null,
  },
  {
    id: "2",
    name: "Billing",
    internal_name: "billing",
    description: "Invoices",
    domain: "Finance",
    start_date: "2023-01-01",
    end_date: null,
    environment: [],
    roles: [],
    responsibilities: [],
    project: null,
  },
] satisfies CvProject[];

describe("filterProjects", () => {
  it("returns original list for empty query", () => {
    expect(filterProjects(projects, " ")).toBe(projects);
  });

  it("filters CV projects by visible project fields", () => {
    expect(filterProjects(projects, "hrm")).toEqual([projects[0]]);
    expect(filterProjects(projects, "finance")).toEqual([projects[1]]);
    expect(filterProjects(projects, "employee")).toEqual([projects[0]]);
  });
});
