import {
  getCatalogProjectFormDefaults,
  toCreateProjectInput,
  toUpdateProjectInput,
} from "./catalog-project-form";
import type { Project } from "../types";

const project: Project = {
  id: "project-1",
  name: "HRM App",
  internal_name: "hrm",
  domain: "Human Resources",
  description: "Employee management",
  start_date: "2024-01-01",
  end_date: null,
  environment: ["React"],
};

describe("catalog project form utils", () => {
  it("returns empty defaults for create mode and cloned project defaults for edit", () => {
    expect(getCatalogProjectFormDefaults()).toEqual({
      name: "",
      domain: "",
      startDate: "",
      endDate: "",
      description: "",
      environment: [],
    });

    const defaults = getCatalogProjectFormDefaults(project);
    expect(defaults).toEqual({
      name: "HRM App",
      domain: "Human Resources",
      startDate: "2024-01-01",
      endDate: "",
      description: "Employee management",
      environment: ["React"],
    });
    expect(defaults.environment).not.toBe(project.environment);
  });

  it("maps form values to create and update mutation inputs", () => {
    const values = {
      name: " HRM App ",
      domain: " HR ",
      startDate: "2024-01-01",
      endDate: " ",
      description: " Employees ",
      environment: ["React"],
    };

    expect(toCreateProjectInput(values)).toEqual({
      name: "HRM App",
      domain: "HR",
      start_date: "2024-01-01",
      end_date: undefined,
      description: "Employees",
      environment: ["React"],
    });
    expect(toUpdateProjectInput("project-1", values)).toMatchObject({
      projectId: "project-1",
      name: "HRM App",
    });
  });
});
