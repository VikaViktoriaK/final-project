import { z } from "zod";

export const createCvSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  education: z.string().trim().min(1, "Education is required"),
  description: z.string().trim().min(1, "Description is required"),
});

export type CreateCvFormValues = z.infer<typeof createCvSchema>;
