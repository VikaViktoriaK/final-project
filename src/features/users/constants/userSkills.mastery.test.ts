import {
  getSkillMasteryCatalog,
  isSkillMastery,
  masteryToProgressColor,
  masteryToProgressPercent,
  parseSkillMastery,
} from "./userSkills.mastery";

describe("userSkills mastery helpers", () => {
  it("parses mastery labels case-insensitively", () => {
    expect(parseSkillMastery(" expert ")).toBe("Expert");
    expect(isSkillMastery("Novice")).toBe(true);
    expect(parseSkillMastery("Unknown")).toBeNull();
  });

  it("maps mastery to progress percent and color", () => {
    expect(masteryToProgressPercent("Advanced")).toBe(40);
    expect(masteryToProgressColor("Expert")).toBe("#ef5350");
    expect(masteryToProgressColor(80)).toBe("#ffca28");
  });

  it("returns canonical mastery catalog", () => {
    expect(getSkillMasteryCatalog()).toHaveLength(5);
    expect(getSkillMasteryCatalog()[0]).toEqual({
      id: "Novice",
      name: "Novice",
    });
  });
});
