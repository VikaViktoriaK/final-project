import filterCatalogProjects from "./filter-catalog-projects";
import type { Project } from "../types";

const projects: Project[] = [
  {
    id: "1",
    name: "HRM App",
    internal_name: "hrm",
    domain: "Human Resources",
    description: "Employee management",
    start_date: "2024-01-01",
    end_date: null,
    environment: ["React", "GraphQL"],
  },
  {
    id: "2",
    name: "Billing",
    internal_name: "billing",
    domain: "Finance",
    description: "Invoices",
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    environment: ["Node"],
  },
];

describe("filterCatalogProjects", () => {
  it("returns original list for empty search", () => {
    expect(filterCatalogProjects(projects, "   ")).toBe(projects);
  });

  it("filters by name, domain, description, or environment", () => {
    expect(filterCatalogProjects(projects, "hrm")).toEqual([projects[0]]);
    expect(filterCatalogProjects(projects, "finance")).toEqual([projects[1]]);
    expect(filterCatalogProjects(projects, "graphql")).toEqual([projects[0]]);
  });
});
