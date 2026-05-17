import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password is too long."),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password is too long."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match.",
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
