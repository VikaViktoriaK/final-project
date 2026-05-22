import { updateCvSchema } from "./update-cv.schema";

describe("updateCvSchema", () => {
  it("requires cvId and valid CV fields", () => {
    const result = updateCvSchema.safeParse({
      cvId: "cv-1",
      name: "Jane Developer",
      education: "BS Computer Science",
      description: "Experienced developer with strong communication skills.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing cvId", () => {
    const result = updateCvSchema.safeParse({
      cvId: "",
      name: "Jane Developer",
      education: "BS Computer Science",
      description: "Experienced developer with strong communication skills.",
    });

    expect(result.success).toBe(false);
  });
});
