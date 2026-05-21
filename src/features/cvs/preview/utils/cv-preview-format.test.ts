import {
  buildSkillTableRows,
  formatCvPeriod,
  formatCvPreviewSubtitle,
  formatLanguageLine,
  formatProjectEnvironment,
  formatProjectRoles,
  getCvPreviewDomains,
  masteryToExperienceYears,
} from "./cv-preview-format";
import type { Cv } from "../../shared/types";

const cv: Cv = {
  id: "cv-1",
  created_at: "2024-01-01",
  name: "Frontend CV",
  education: null,
  description: "",
  user: null,
  skills: [],
  languages: [],
  projects: [
    {
      id: "1",
      name: "HRM App",
      internal_name: "hrm",
      description: "",
      domain: "HR",
      start_date: "2024-01-01",
      end_date: null,
      environment: ["React"],
      roles: ["Developer"],
      responsibilities: [],
      project: null,
    },
    {
      id: "2",
      name: "Billing",
      internal_name: "billing",
      description: "",
      domain: "Finance",
      start_date: "2023-01-01",
      end_date: null,
      environment: [],
      roles: [],
      responsibilities: [],
      project: null,
    },
  ],
};

describe("CV preview format utils", () => {
  it("formats periods, language, environment, and roles", () => {
    expect(formatCvPeriod(undefined, undefined)).toBe("—");
    expect(formatCvPeriod("2024-01-01", undefined)).toBe("01.2024 – Till now");
    expect(formatCvPeriod("bad-date", "2024-02-01")).toBe("bad-date – 02.2024");
    expect(formatLanguageLine("English", "C1")).toBe("English — C1");
    expect(formatProjectEnvironment(["React", "GraphQL"])).toBe(
      "React, GraphQL",
    );
    expect(formatProjectEnvironment([])).toBe("—");
    expect(formatProjectRoles(["Developer"])).toBe("Developer");
    expect(formatProjectRoles([])).toBe("—");
  });

  it("maps mastery to experience years and skill table rows", () => {
    expect(masteryToExperienceYears("Expert")).toBe(5);
    expect(
      buildSkillTableRows([
        {
          categoryLabel: "Frontend",
          skills: [{ name: "React", categoryId: "1", mastery: "Advanced" }],
        },
      ]),
    ).toEqual([
      {
        categoryLabel: "Frontend",
        skillName: "React",
        experienceYears: 2,
        lastUsed: String(new Date().getFullYear()),
      },
    ]);
  });

  it("builds preview subtitle and unique domain list", () => {
    expect(formatCvPreviewSubtitle(cv)).toBe("DEVELOPER");
    expect(getCvPreviewDomains(cv)).toBe("HR, Finance");
  });
});
