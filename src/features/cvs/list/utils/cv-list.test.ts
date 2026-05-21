import { filterCvs, sortCvs } from "./cv-list";
import type { Cv } from "../../shared/types";

const baseCv = {
  created_at: "2024-01-01",
  skills: [],
  languages: [],
  projects: [],
};

const cvs: Cv[] = [
  {
    ...baseCv,
    id: "2",
    name: "Frontend CV",
    education: "BS Computer Science",
    description: "React engineer",
    user: { id: "user-2", email: "front@example.com" },
  },
  {
    ...baseCv,
    id: "1",
    name: "Backend CV",
    education: null,
    description: "Node engineer",
    user: { id: "user-1", email: "back@example.com" },
  },
];

describe("cv-list utils", () => {
  it("filters out invalid rows before filtering or sorting", () => {
    const invalid = { ...cvs[0], id: "", name: "" };

    expect(filterCvs([invalid, ...cvs], "")).toEqual(cvs);
    expect(sortCvs([invalid, ...cvs], "name", "asc")).toEqual([cvs[1], cvs[0]]);
  });

  it("filters CVs by name, description, education, or employee email", () => {
    expect(filterCvs(cvs, "react")).toEqual([cvs[0]]);
    expect(filterCvs(cvs, "back@example")).toEqual([cvs[1]]);
    expect(filterCvs(cvs, "science")).toEqual([cvs[0]]);
  });

  it("sorts CVs by selected field and direction", () => {
    expect(sortCvs(cvs, "employee", "asc").map((cv) => cv.user?.email)).toEqual(
      ["back@example.com", "front@example.com"],
    );
    expect(sortCvs(cvs, "name", "desc").map((cv) => cv.name)).toEqual([
      "Frontend CV",
      "Backend CV",
    ]);
  });
});
