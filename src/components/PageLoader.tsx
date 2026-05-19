import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export type PageLoaderProps = {
  minHeight?: string | number;
  size?: number;
};

const pageLoaderSx = (minHeight: string | number) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight,
  py: 4,
});

export function PageLoader({
  minHeight = "12rem",
  size = 40,
}: PageLoaderProps) {
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
      sx={pageLoaderSx(minHeight)}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
