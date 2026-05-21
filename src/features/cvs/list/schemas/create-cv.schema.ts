import { z } from "zod";

export const CV_FIELD_LIMITS = {
  name: { minLength: 2, maxLength: 80, maxWords: 12 },
  education: { minLength: 2, maxLength: 200, maxWords: 30 },
  description: { minLength: 10, maxLength: 2000, maxWords: 250 },
} as const;

function countWords(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) {
    return 0;
  }
  return trimmed.split(/\s+/).length;
}

function limitedTextField(config: {
  label: string;
  minLength: number;
  maxLength: number;
  maxWords: number;
  requiredMessage?: string;
}) {
  const { label, minLength, maxLength, maxWords, requiredMessage } = config;

  return z
    .string()
    .trim()
    .min(1, requiredMessage ?? `${label} is required`)
    .min(minLength, `${label} must be at least ${minLength} characters`)
    .max(maxLength, `${label} must be at most ${maxLength} characters`)
    .refine(
      (value) => countWords(value) <= maxWords,
      `${label} must be at most ${maxWords} words`,
    );
}

export const createCvSchema = z.object({
  name: limitedTextField({
    label: "Name",
    ...CV_FIELD_LIMITS.name,
    requiredMessage: "Name is required",
  }),
  education: limitedTextField({
    label: "Education",
    ...CV_FIELD_LIMITS.education,
    requiredMessage: "Education is required",
  }),
  description: limitedTextField({
    label: "Description",
    ...CV_FIELD_LIMITS.description,
    requiredMessage: "Description is required",
  }),
});

export type CreateCvFormValues = z.infer<typeof createCvSchema>;

export const EMPTY_CV_FORM_VALUES: CreateCvFormValues = {
  name: "",
  education: "",
  description: "",
};
