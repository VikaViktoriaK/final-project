import { z } from "zod";
import { CATALOG_PROJECT_LIMITS } from "../constants";
import {
  getProjectMaxDate,
  isProjectDateInput,
  PROJECT_MIN_DATE,
} from "@/features/cvs/utils/project-form-dates";

export const catalogProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(CATALOG_PROJECT_LIMITS.name.maxLength),
    domain: z
      .string()
      .trim()
      .min(1, "Domain is required")
      .max(CATALOG_PROJECT_LIMITS.domain.maxLength),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .refine(isProjectDateInput, "Enter a valid date")
      .refine((value) => value >= PROJECT_MIN_DATE, {
        message: "Start date cannot be before year 2000",
      }),
    endDate: z.string().optional(),
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(CATALOG_PROJECT_LIMITS.description.maxLength),
    environment: z
      .array(z.string().trim().min(1))
      .min(1, "Add at least one technology"),
  })
  .superRefine((data, ctx) => {
    const maxDate = getProjectMaxDate();
    const endDate = data.endDate?.trim();

    if (!endDate) {
      return;
    }

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
  });

export type CatalogProjectFormValues = z.infer<typeof catalogProjectSchema>;
