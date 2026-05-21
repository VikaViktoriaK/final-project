import { sortProjects } from "./sort-projects";
import { mockCvProject } from "../../test-utils/fixtures";

const earlierProject = {
  ...mockCvProject,
  id: "proj-early",
  name: "Alpha App",
  start_date: "2020-01-01",
};

const laterProject = {
  ...mockCvProject,
  id: "proj-late",
  name: "Zulu App",
  start_date: "2024-01-01",
};

describe("sortProjects", () => {
  it("sorts by name ascending", () => {
    const sorted = sortProjects([laterProject, earlierProject], "name", "asc");
    expect(sorted.map((project) => project.name)).toEqual([
      "Alpha App",
      "Zulu App",
    ]);
  });

  it("sorts by start date descending", () => {
    const sorted = sortProjects(
      [earlierProject, laterProject],
      "startDate",
      "desc",
    );
    expect(sorted[0]?.id).toBe("proj-late");
  });
});
