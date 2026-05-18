import { z } from "zod";
import { MASTERY_LEVELS } from "../constants/mastery-levels";

export const addSkillSchema = z.object({
  skillId: z.string().min(1, "Select a skill"),
  mastery: z.enum(MASTERY_LEVELS),
});

export type AddSkillFormValues = z.infer<typeof addSkillSchema>;
