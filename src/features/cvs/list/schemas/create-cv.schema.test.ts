import { createCvSchema, EMPTY_CV_FORM_VALUES } from "./create-cv.schema";

const validCv = {
  name: "Jane Developer",
  education: "BS Computer Science",
  description: "Experienced developer with strong communication skills.",
};

describe("createCvSchema", () => {
  it("accepts valid CV fields", () => {
    expect(createCvSchema.safeParse(validCv).success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = createCvSchema.safeParse({
      ...validCv,
      name: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Name is required");
    }
  });

  it("rejects description shorter than 10 characters", () => {
    const result = createCvSchema.safeParse({
      ...validCv,
      description: "short",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Description must be at least 10 characters",
      );
    }
  });

  it("exports empty default values", () => {
    expect(EMPTY_CV_FORM_VALUES).toEqual({
      name: "",
      education: "",
      description: "",
    });
  });
});
