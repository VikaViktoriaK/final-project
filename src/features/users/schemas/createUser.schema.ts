import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password is too long."),
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters long."),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters long."),
});

export type CreateUserFieldErrors = Partial<
  Record<keyof z.infer<typeof createUserSchema>, string>
>;
