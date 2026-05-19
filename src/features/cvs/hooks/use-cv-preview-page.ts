"use client";

import { useMemo } from "react";
import { useCvContext } from "../context/cv-context";
import useActionFeedback from "./shared/use-action-feedback";
import { useCvSkillCatalog, useExportPdfMutation } from "./use-cv-mutations";
import { groupSkillsByCategory } from "../utils/group-skills";

function useCvPreviewPage() {
  const { cv } = useCvContext();
  const { categories } = useCvSkillCatalog();
  const { exportPdf, loading: exporting } = useExportPdfMutation();
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();

  const groupedSkills = useMemo(
    () => (cv ? groupSkillsByCategory(cv.skills, categories) : []),
    [cv, categories],
  );

  const handleExportPdf = async (previewElement?: HTMLElement | null) => {
    if (!cv) {
      return;
    }
    const result = await exportPdf(cv, previewElement);
    if (result.ok) {
      showSuccess("PDF exported");
      return;
    }
    showError(result.message);
  };

  return {
    cv,
    groupedSkills,
    exporting,
    handleExportPdf,
    FeedbackSnackbar,
  };
}

export default useCvPreviewPage;
