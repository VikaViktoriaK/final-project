import filterProjects from "./filter-projects";
import { mockCvProject } from "../../test-utils/fixtures";

const betaProject = {
  ...mockCvProject,
  id: "proj-2",
  name: "Beta Billing",
  domain: "Healthcare",
};

describe("filterProjects", () => {
  it("returns all projects when search is empty", () => {
    expect(filterProjects([mockCvProject, betaProject], "")).toHaveLength(2);
  });

  it("filters by name, domain, and description", () => {
    expect(filterProjects([mockCvProject, betaProject], "billing")).toEqual([
      betaProject,
    ]);
    expect(filterProjects([mockCvProject, betaProject], "fintech")).toEqual([
      mockCvProject,
    ]);
  });
});
