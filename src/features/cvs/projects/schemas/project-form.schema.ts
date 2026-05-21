import { z } from "zod";
import {
  getProjectMaxDate,
  isProjectDateInput,
  PROJECT_MIN_DATE,
} from "../utils/project-form-dates";

export const projectFormSchema = z
  .object({
    projectId: z.string().min(1, "Select a project"),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .refine(isProjectDateInput, "Enter a valid date")
      .refine((value) => value >= PROJECT_MIN_DATE, {
        message: "Start date cannot be before year 2000",
      }),
    endDate: z.string().optional(),
    role: z.string().min(1, "Role is required"),
    responsibilities: z.string().refine(
      (value) =>
        value
          .split("\n")
          .map((line) => line.trim())
          .some(Boolean),
      "Add at least one responsibility",
    ),
  })
  .superRefine((data, ctx) => {
    const maxDate = getProjectMaxDate();
    const endDate = data.endDate?.trim();

    if (endDate) {
      if (!isProjectDateInput(endDate)) {
        ctx.addIssue({
          code: "custom",
          message: "Enter a valid date",
          path: ["endDate"],
        });
        return;
      }

      if (endDate > maxDate) {
        ctx.addIssue({
          code: "custom",
          message: "End date cannot be after today",
          path: ["endDate"],
        });
      }

      if (endDate < data.startDate) {
        ctx.addIssue({
          code: "custom",
          message: "End date must be on or after start date",
          path: ["endDate"],
        });
      }
    }
  });

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export type ProjectMutationInput = {
  projectId: string;
  start_date: string;
  end_date?: string;
  roles: string[];
  responsibilities: string[];
};
