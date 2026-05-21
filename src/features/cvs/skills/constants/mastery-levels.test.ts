import {
  MASTERY_BAR_COLOR,
  MASTERY_LEVELS,
  MASTERY_PERCENT,
} from "./mastery-levels";

describe("mastery-levels", () => {
  it("defines all mastery levels in order", () => {
    expect(MASTERY_LEVELS).toEqual([
      "Novice",
      "Advanced",
      "Competent",
      "Proficient",
      "Expert",
    ]);
  });

  it("maps mastery to bar fill percentages", () => {
    expect(MASTERY_PERCENT.Novice).toBe(20);
    expect(MASTERY_PERCENT.Expert).toBe(100);
  });

  it("provides bar colors for each mastery level", () => {
    expect(MASTERY_BAR_COLOR.Expert).toBe("var(--color-primary)");
  });
});
