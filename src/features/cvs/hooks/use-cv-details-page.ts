"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCvContext } from "../context/cv-context";
import useActionFeedback from "@/hooks/use-action-feedback";
import { useUpdateCvMutation } from "./use-cv-mutations";
import { updateCvSchema, type UpdateCvFormValues } from "../schemas";

function useCvDetailsPage() {
  const { cv, cvId, canEdit } = useCvContext();
  const { updateCv, loading: updating } = useUpdateCvMutation(cvId);
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();

  const form = useForm<UpdateCvFormValues>({
    resolver: zodResolver(updateCvSchema),
    mode: "onChange",
    defaultValues: { cvId, name: "", education: "", description: "" },
  });

  const { reset, handleSubmit, register, formState } = form;
  const { errors, isSubmitting, isDirty, isValid } = formState;
  const isPending = isSubmitting || updating;
  const hasChanges = isDirty && isValid;
  const canUpdate = hasChanges && !isPending;

  useEffect(() => {
    if (cv) {
      reset({
        cvId: cv.id,
        name: cv.name ?? "",
        education: cv.education ?? "",
        description: cv.description ?? "",
      });
    }
  }, [cv, reset]);

  const onSubmit = handleSubmit(async (values) => {
    const result = await updateCv({
      name: values.name,
      education: values.education,
      description: values.description,
    });

    if (result.ok) {
      reset(values);
      showSuccess("CV updated successfully");
      return;
    }
    showError(result.message);
  });

  return {
    cv,
    canEdit,
    register,
    errors,
    isPending,
    canUpdate,
    hasChanges,
    onSubmit,
    FeedbackSnackbar,
  };
}

export default useCvDetailsPage;
