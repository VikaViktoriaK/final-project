"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCvContext } from "../context/cv-context";
import useActionFeedback from "./shared/use-action-feedback";
import { useUpdateCvMutation } from "./use-cv-mutations";
import { updateCvSchema, type UpdateCvFormValues } from "../schemas";

function useCvDetailsPage() {
  const { cv, cvId, canEdit } = useCvContext();
  const { updateCv, loading: updating } = useUpdateCvMutation(cvId);
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();

  const form = useForm<UpdateCvFormValues>({
    resolver: zodResolver(updateCvSchema),
    defaultValues: { cvId, name: "", education: "", description: "" },
  });

  const { reset, handleSubmit, register, formState } = form;
  const { errors, isSubmitting } = formState;
  const isPending = isSubmitting || updating;

  useEffect(() => {
    if (cv) {
      reset({
        cvId: cv.id,
        name: cv.name,
        education: cv.education ?? "",
        description: cv.description,
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
    onSubmit,
    FeedbackSnackbar,
  };
}

export default useCvDetailsPage;
