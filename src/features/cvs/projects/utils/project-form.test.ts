import {
  getProjectFormDefaults,
  toInputDate,
  toProjectMutationInput,
} from "./project-form";
import type { CvProject } from "../../shared/types";

const cvProject: CvProject = {
  id: "cv-project-1",
  name: "HRM App",
  internal_name: "hrm",
  description: "Employee management",
  domain: "Human Resources",
  start_date: "2024-01-01T00:00:00.000Z",
  end_date: null,
  environment: ["React"],
  roles: ["Developer"],
  responsibilities: ["Build UI", "Write tests"],
  project: {
    id: "project-1",
    name: "HRM App",
    internal_name: "hrm",
    domain: "Human Resources",
    description: "Employee management",
    start_date: "2024-01-01",
    end_date: null,
    environment: ["React"],
  },
};

describe("CV project form utils", () => {
  it("converts dates to input format", () => {
    expect(toInputDate("2024-01-02T10:00:00.000Z")).toBe("2024-01-02");
    expect(toInputDate("not-a-date-value")).toBe("not-a-date");
    expect(toInputDate(null)).toBe("");
  });

  it("returns add and update defaults", () => {
    expect(getProjectFormDefaults("add")).toEqual({
      projectId: "",
      startDate: "",
      endDate: "",
      role: "Developer",
      responsibilities: "",
    });

    expect(getProjectFormDefaults("update", cvProject)).toEqual({
      projectId: "project-1",
      startDate: "2024-01-01",
      endDate: "",
      role: "Developer",
      responsibilities: "Build UI\nWrite tests",
    });
  });

  it("maps form values to mutation input", () => {
    expect(
      toProjectMutationInput({
        projectId: "project-1",
        startDate: "2024-01-01",
        endDate: " ",
        role: " Lead ",
        responsibilities: " Build UI \n\n Write tests ",
      }),
    ).toEqual({
      projectId: "project-1",
      start_date: "2024-01-01",
      end_date: undefined,
      roles: ["Lead"],
      responsibilities: ["Build UI", "Write tests"],
    });
  });
});
