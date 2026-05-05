import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password is too long."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password is too long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
