"use client";

import { Button, CircularProgress, Stack } from "@mui/material";
import { useRef } from "react";
import useCvPreviewPage from "../hooks/use-cv-preview-page";
import CvPreviewDocument from "./cv-preview-document";
import { cvsStyles } from "../styles/cvs.styles";

function CvPreviewPage() {
  const page = useCvPreviewPage();
  const previewRef = useRef<HTMLDivElement>(null);

  if (!page.cv) {
    return null;
  }

  const handleExport = () => {
    if (previewRef.current) {
      page.handleExportPdf(previewRef.current);
    }
  };

  return (
    <>
      <Stack direction="row" sx={cvsStyles.previewToolbar}>
        <Button
          type="button"
          variant="outlined"
          sx={cvsStyles.exportButton}
          disabled={page.exporting}
          onClick={handleExport}
        >
          {page.exporting ? <CircularProgress size={16} /> : "Export PDF"}
        </Button>
      </Stack>

      <CvPreviewDocument
        cv={page.cv}
        groupedSkills={page.groupedSkills}
        documentRef={previewRef}
      />
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvPreviewPage;
