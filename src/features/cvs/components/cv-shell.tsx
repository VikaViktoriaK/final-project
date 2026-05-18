"use client";

import { Alert, Box, CircularProgress, Tab, Tabs } from "@mui/material";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { CV_TABS } from "../constants/cv-tabs";
import { CvProvider, useCvContext } from "../context/cv-context";
import useCvShellNavigation from "../hooks/use-cv-shell-navigation";
import { cvsStyles } from "../styles/cvs.styles";

type CvShellProps = {
  cvId: string;
  children: ReactNode;
};

function CvShellContent({ cvId, children }: CvShellProps) {
  const { cv, loading, error } = useCvContext();
  const { activeSegment, activeTabLabel, showSectionInBreadcrumb } =
    useCvShellNavigation(cvId);

  if (loading) {
    return <CircularProgress size={28} />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (!cv) {
    return <Alert severity="warning">CV not found.</Alert>;
  }

  return (
    <Box>
      <Box sx={cvsStyles.breadcrumb}>
        <Box component={NextLink} href="/cvs" sx={cvsStyles.breadcrumbLink}>
          CVs
        </Box>
        <Box component="span">&gt;</Box>
        <Box component="span" sx={cvsStyles.breadcrumbActive}>
          {cv.name}
        </Box>
        {showSectionInBreadcrumb && (
          <>
            <Box component="span">&gt;</Box>
            <Box component="span" sx={cvsStyles.breadcrumbActive}>
              {activeTabLabel}
            </Box>
          </>
        )}
      </Box>

      <Tabs value={activeSegment} sx={cvsStyles.tabs}>
        {CV_TABS.map((tab) => (
          <Tab
            key={tab.segment}
            label={tab.label.toUpperCase()}
            value={tab.segment}
            component={NextLink}
            href={`/cvs/${cvId}/${tab.segment}`}
          />
        ))}
      </Tabs>

      {children}
    </Box>
  );
}

function CvShell({ cvId, children }: CvShellProps) {
  return (
    <CvProvider cvId={cvId}>
      <CvShellContent cvId={cvId}>{children}</CvShellContent>
    </CvProvider>
  );
}

export default CvShell;
