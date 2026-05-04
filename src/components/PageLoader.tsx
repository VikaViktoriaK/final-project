"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export type PageLoaderProps = {
  /** Min height of the loader area (e.g. `"50vh"` or `"100%"`). */
  minHeight?: string | number;
  /** MUI CircularProgress size. */
  size?: number;
};

/**
 * Centered full-width loader for page sections or whole pages.
 * Reuse anywhere you need a single consistent loading state.
 */
export function PageLoader({ minHeight = "40vh", size = 40 }: PageLoaderProps) {
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight,
        py: 4,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
