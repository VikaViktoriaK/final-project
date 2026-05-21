import { createUserSchema } from "./createUser.schema";

describe("createUserSchema", () => {
  it("accepts valid create-user payload", () => {
    expect(
      createUserSchema.safeParse({
        email: "ada@example.com",
        password: "password1",
        firstName: "Ada",
        lastName: "Lovelace",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid email, short password, and short names", () => {
    const result = createUserSchema.safeParse({
      email: "not-an-email",
      password: "short",
      firstName: "A",
      lastName: "L",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email?.[0]).toBe(
        "Invalid email format.",
      );
      expect(result.error.flatten().fieldErrors.password?.[0]).toBe(
        "Password must be at least 8 characters long.",
      );
      expect(result.error.flatten().fieldErrors.firstName?.[0]).toBe(
        "First name must be at least 2 characters long.",
      );
    }
  });
});
