import { signupSchema } from "./signup.schema";

describe("signupSchema", () => {
  it("accepts matching passwords", () => {
    const result = signupSchema.safeParse({
      email: "user@example.com",
      password: "password1",
      confirmPassword: "password1",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = signupSchema.safeParse({
      email: "bad",
      password: "password1",
      confirmPassword: "password1",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Please enter a valid email address.",
      );
    }
  });

  it("rejects mismatched passwords", () => {
    const result = signupSchema.safeParse({
      email: "user@example.com",
      password: "password1",
      confirmPassword: "password2",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (item) => item.path[0] === "confirmPassword",
      );
      expect(issue?.message).toBe("Passwords do not match.");
    }
  });

  it("rejects password longer than 20 characters", () => {
    const long = "a".repeat(21);
    const result = signupSchema.safeParse({
      email: "user@example.com",
      password: long,
      confirmPassword: long,
    });

    expect(result.success).toBe(false);
  });
});
