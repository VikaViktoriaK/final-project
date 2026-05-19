import { z } from "zod";
import { MASTERY_LEVELS } from "../constants/mastery-levels";

export const updateSkillSchema = z.object({
  mastery: z.enum(MASTERY_LEVELS),
});

export type UpdateSkillFormValues = z.infer<typeof updateSkillSchema>;
