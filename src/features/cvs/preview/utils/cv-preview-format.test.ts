import { mockCv, mockCvProject } from "../../test-utils/fixtures";
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
import { groupSkillsByCategory } from "../../shared/utils/group-skills";

describe("cv-preview-format", () => {
  it("maps mastery levels to experience years", () => {
    expect(masteryToExperienceYears("Novice")).toBe(1);
    expect(masteryToExperienceYears("Expert")).toBe(5);
  });

  it("formats CV period with open end date", () => {
    expect(formatCvPeriod("2022-06-01", null)).toBe("06.2022 – Till now");
  });

  it("formats language line", () => {
    expect(formatLanguageLine("English", "C1")).toBe("English — C1");
  });

  it("formats project metadata helpers", () => {
    expect(formatProjectEnvironment(["React", "Node"])).toBe("React, Node");
    expect(formatProjectRoles([])).toBe("—");
  });

  it("builds preview subtitle from first project role", () => {
    const cv = {
      ...mockCv,
      projects: [{ ...mockCvProject, roles: ["Senior Developer"] }],
    };
    expect(formatCvPreviewSubtitle(cv)).toBe("SENIOR DEVELOPER");
  });

  it("collects unique project domains", () => {
    const cv = {
      ...mockCv,
      projects: [
        { ...mockCvProject, domain: "FinTech" },
        { ...mockCvProject, id: "p2", domain: "FinTech" },
        { ...mockCvProject, id: "p3", domain: "Health" },
      ],
    };
    expect(getCvPreviewDomains(cv)).toBe("FinTech, Health");
  });

  it("builds skill table rows from grouped skills", () => {
    const grouped = groupSkillsByCategory(mockCv.skills, []);
    const rows = buildSkillTableRows(grouped);

    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({
      skillName: expect.any(String),
      experienceYears: expect.any(Number),
      lastUsed: String(new Date().getFullYear()),
    });
  });
});
