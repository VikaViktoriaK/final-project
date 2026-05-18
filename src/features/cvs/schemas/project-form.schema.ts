import { z } from "zod";

export const projectFormSchema = z.object({
  projectId: z.string().min(1, "Select a project"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  responsibilities: z.string(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export type ProjectMutationInput = {
  projectId: string;
  start_date: string;
  end_date?: string;
  roles: string[];
  responsibilities: string[];
};
