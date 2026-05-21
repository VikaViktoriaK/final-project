import { resetPasswordSchema } from "./reset-password.schema";

describe("resetPasswordSchema", () => {
  it("accepts matching new passwords", () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: "newpassword1",
      confirmNewPassword: "newpassword1",
    });

    expect(result.success).toBe(true);
  });

  it("rejects password shorter than 8 characters", () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: "short",
      confirmNewPassword: "short",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Password must be at least 8 characters long.",
      );
    }
  });

  it("rejects mismatched passwords", () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: "newpassword1",
      confirmNewPassword: "newpassword2",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (item) => item.path[0] === "confirmNewPassword",
      );
      expect(issue?.message).toBe("Passwords do not match.");
    }
  });
});
