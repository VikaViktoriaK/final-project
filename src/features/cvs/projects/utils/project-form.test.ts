import { mockCvProject } from "../../test-utils/fixtures";
import {
  getProjectFormDefaults,
  toInputDate,
  toProjectMutationInput,
} from "./project-form";

describe("project-form utils", () => {
  it("maps ISO dates to input format", () => {
    expect(toInputDate("2023-05-10T12:00:00.000Z")).toBe("2023-05-10");
  });

  it("returns empty defaults for add mode", () => {
    expect(getProjectFormDefaults("add")).toEqual({
      projectId: "",
      startDate: "",
      endDate: "",
      role: "Developer",
      responsibilities: "",
    });
  });

  it("maps CV project to update defaults", () => {
    expect(getProjectFormDefaults("update", mockCvProject)).toEqual({
      projectId: "",
      startDate: "2022-06-01",
      endDate: "2023-12-01",
      role: "Developer",
      responsibilities: "Implemented API layer",
    });
  });

  it("builds mutation input from form values", () => {
    expect(
      toProjectMutationInput({
        projectId: "p1",
        startDate: "2022-01-01",
        endDate: "",
        role: " Lead ",
        responsibilities: " Line one \n\n Line two ",
      }),
    ).toEqual({
      projectId: "p1",
      start_date: "2022-01-01",
      end_date: undefined,
      roles: ["Lead"],
      responsibilities: ["Line one", "Line two"],
    });
  });
});
