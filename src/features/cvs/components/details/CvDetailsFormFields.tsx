"use client";

import { Stack, TextField } from "@mui/material";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  CV_FIELD_LIMITS,
  type CreateCvFormValues,
} from "../../list/schemas/create-cv.schema";
import { cvsStyles } from "../../styles/cvs.styles";

type CvDetailsFormFieldsProps = {
  register: UseFormRegister<CreateCvFormValues>;
  errors: FieldErrors<CreateCvFormValues>;
  disabled?: boolean;
  autoFocusName?: boolean;
  reserveHelperSpace?: boolean;
  compact?: boolean;
};

function fieldHelper(
  message: string | undefined,
  reserve: boolean,
): string | undefined {
  if (message) {
    return message;
  }
  return reserve ? " " : undefined;
}

function CvDetailsFormFields({
  register,
  errors,
  disabled = false,
  autoFocusName = false,
  reserveHelperSpace = false,
  compact = false,
}: CvDetailsFormFieldsProps) {
  return (
    <Stack
      sx={
        compact ? cvsStyles.detailsFormStackCompact : cvsStyles.detailsFormStack
      }
    >
      <TextField
        label="Name"
        autoFocus={autoFocusName}
        sx={[cvsStyles.formField, compact && cvsStyles.formFieldCompact]}
        {...register("name")}
        error={!!errors.name}
        helperText={fieldHelper(errors.name?.message, reserveHelperSpace)}
        disabled={disabled}
        slotProps={{
          htmlInput: { maxLength: CV_FIELD_LIMITS.name.maxLength },
        }}
        fullWidth
      />
      <TextField
        label="Education"
        sx={[cvsStyles.formField, compact && cvsStyles.formFieldCompact]}
        {...register("education")}
        error={!!errors.education}
        helperText={fieldHelper(errors.education?.message, reserveHelperSpace)}
        disabled={disabled}
        slotProps={{
          htmlInput: { maxLength: CV_FIELD_LIMITS.education.maxLength },
        }}
        fullWidth
      />
      <TextField
        label="Description"
        sx={[
          cvsStyles.formField,
          cvsStyles.formFieldMultiline,
          compact && cvsStyles.formFieldCompact,
        ]}
        {...register("description")}
        error={!!errors.description}
        helperText={fieldHelper(
          errors.description?.message,
          reserveHelperSpace,
        )}
        disabled={disabled}
        slotProps={{
          htmlInput: { maxLength: CV_FIELD_LIMITS.description.maxLength },
        }}
        fullWidth
        multiline
        minRows={compact ? 5 : 6}
      />
    </Stack>
  );
}

export default CvDetailsFormFields;
