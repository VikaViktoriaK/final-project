import { projectFormSchema } from "./project-form.schema";

const validForm = {
  projectId: "project-1",
  startDate: "2022-01-01",
  endDate: "2023-06-01",
  role: "Developer",
  responsibilities: "Built features\nFixed bugs",
};

describe("projectFormSchema", () => {
  it("accepts valid project form values", () => {
    expect(projectFormSchema.safeParse(validForm).success).toBe(true);
  });

  it("accepts empty end date", () => {
    const result = projectFormSchema.safeParse({
      ...validForm,
      endDate: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing responsibilities", () => {
    const result = projectFormSchema.safeParse({
      ...validForm,
      responsibilities: "   \n  ",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (item) => item.path[0] === "responsibilities",
      );
      expect(issue?.message).toBe("Add at least one responsibility");
    }
  });

  it("rejects end date before start date", () => {
    const result = projectFormSchema.safeParse({
      ...validForm,
      startDate: "2023-01-01",
      endDate: "2022-01-01",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (item) => item.path[0] === "endDate",
      );
      expect(issue?.message).toBe("End date must be on or after start date");
    }
  });

  it("rejects end date after today", () => {
    const result = projectFormSchema.safeParse({
      ...validForm,
      endDate: "2099-12-31",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (item) => item.path[0] === "endDate",
      );
      expect(issue?.message).toBe("End date cannot be after today");
    }
  });
});
