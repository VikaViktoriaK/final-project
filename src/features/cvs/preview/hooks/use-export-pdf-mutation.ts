"use client";

import { useMutation } from "@apollo/client/react";
import { runMutation, type MutationResult } from "@/lib/mutation-result";
import { useCvSkillCatalog } from "../../skills/hooks/use-cv-skill-mutations";
import type { Cv } from "../../shared/types";
import { groupSkillsByCategory } from "../../shared/utils/group-skills";
import { EXPORT_PDF_MUTATION } from "../graphql/export-pdf.mutation";
import buildCvPreviewHtml from "../utils/build-cv-preview-html";
import {
  downloadPdfPayload,
  isServerPdfUnavailable,
} from "../utils/download-pdf-payload";
import exportCvPdfClient, {
  exportCvPdfFromElement,
} from "../utils/export-cv-pdf-client";

function useExportPdfMutation() {
  const { categories } = useCvSkillCatalog();
  const [exportPdfMutation, { loading }] = useMutation<{ exportPdf: string }>(
    EXPORT_PDF_MUTATION,
  );

  const exportPdf = async (
    cv: Cv,
    previewElement?: HTMLElement | null,
  ): Promise<MutationResult> => {
    const grouped = groupSkillsByCategory(cv.skills, categories);
    const html = buildCvPreviewHtml(cv, grouped);
    const fileName = `${cv.name.replace(/\s+/g, "-")}.pdf`;

    const serverResult = await runMutation(async () => {
      const result = await exportPdfMutation({
        variables: { pdf: { html } },
      });
      const payload = result.data?.exportPdf;
      if (!payload) {
        throw new Error("PDF export failed");
      }
      downloadPdfPayload(payload, fileName);
    }, "");

    if (serverResult.ok) {
      return serverResult;
    }

    if (!isServerPdfUnavailable(serverResult.message)) {
      return {
        ok: false,
        message: serverResult.message || "Failed to export PDF",
      };
    }

    if (previewElement) {
      return runMutation(
        () => exportCvPdfFromElement({ element: previewElement, fileName }),
        "Failed to export PDF",
      );
    }

    return runMutation(
      () => exportCvPdfClient({ html, fileName }),
      "Failed to export PDF",
    );
  };

  return { exportPdf, loading };
}

export default useExportPdfMutation;
