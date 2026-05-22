import {
  getProjectMaxDate,
  isProjectDateInput,
  PROJECT_MIN_DATE,
} from "./project-form-dates";

describe("project-form-dates", () => {
  it("formats max date from reference date", () => {
    expect(getProjectMaxDate(new Date(2026, 4, 20))).toBe("2026-05-20");
  });

  it("validates correct date input", () => {
    expect(isProjectDateInput("2024-03-15")).toBe(true);
  });

  it("rejects invalid calendar dates", () => {
    expect(isProjectDateInput("2024-02-30")).toBe(false);
  });

  it("rejects malformed date strings", () => {
    expect(isProjectDateInput("24-03-15")).toBe(false);
  });

  it("exposes minimum project date constant", () => {
    expect(PROJECT_MIN_DATE).toBe("2000-01-01");
  });
});
