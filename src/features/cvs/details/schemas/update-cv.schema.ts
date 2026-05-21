import { z } from "zod";
import { createCvSchema } from "../../list/schemas/create-cv.schema";

export const updateCvSchema = createCvSchema.extend({
  cvId: z.string().min(1),
});

export type UpdateCvFormValues = z.infer<typeof updateCvSchema>;
