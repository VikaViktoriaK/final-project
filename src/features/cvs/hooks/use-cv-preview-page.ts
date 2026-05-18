"use client";

import { useMemo } from "react";
import { useCvContext } from "../context/cv-context";
import useActionFeedback from "./shared/use-action-feedback";
import { useCvSkillCatalog, useExportPdfMutation } from "./use-cv-mutations";
import getCvDisplayName from "../utils/get-cv-display-name";
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

  const domains = useMemo(() => {
    if (!cv) {
      return "";
    }
    return [
      ...new Set(cv.projects.map((project) => project.domain).filter(Boolean)),
    ].join(", ");
  }, [cv]);

  const displayName = cv ? getCvDisplayName(cv) : "";

  const handleExportPdf = async () => {
    if (!cv) {
      return;
    }
    const result = await exportPdf(cv);
    if (result.ok) {
      showSuccess("PDF exported");
      return;
    }
    showError(result.message);
  };

  return {
    cv,
    groupedSkills,
    domains,
    displayName,
    exporting,
    handleExportPdf,
    FeedbackSnackbar,
  };
}

export default useCvPreviewPage;
