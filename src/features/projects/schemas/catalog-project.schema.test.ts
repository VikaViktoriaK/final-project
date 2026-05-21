import { catalogProjectSchema } from "./catalog-project.schema";

const validProject = {
  name: "HRM App",
  domain: "Human Resources",
  startDate: "2024-01-01",
  endDate: "",
  description: "Employee management platform",
  environment: ["React"],
};

describe("catalogProjectSchema", () => {
  it("accepts valid project form values", () => {
    expect(catalogProjectSchema.safeParse(validProject).success).toBe(true);
  });

  it("requires core fields and at least one technology", () => {
    const result = catalogProjectSchema.safeParse({
      ...validProject,
      name: "",
      environment: [],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.name?.[0]).toBe("Name is required");
      expect(fieldErrors.environment?.[0]).toBe("Add at least one technology");
    }
  });

  it("rejects end dates before start date", () => {
    const result = catalogProjectSchema.safeParse({
      ...validProject,
      endDate: "2023-12-31",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path[0] === "endDate"),
      ).toBe(true);
    }
  });
});
