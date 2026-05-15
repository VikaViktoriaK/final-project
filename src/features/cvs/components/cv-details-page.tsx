"use client";

import {
  Button,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import useCv from "../hooks/use-cv";
import type { CvDetailsPageProps } from "../types/cv.types";

function CvDetailsPage({ cvId }: CvDetailsPageProps) {
  const { cv, loading, error } = useCv(cvId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!cv) {
    return (
      <Stack spacing={2}>
        <Button
          component={NextLink}
          href="/cvs"
          variant="outlined"
          sx={{ alignSelf: "flex-start" }}
        >
          Back to CVs
        </Button>
        <Typography color="var(--app-text)">CV not found.</Typography>
      </Stack>
    );
  }

  const employee = cv.user?.email ?? "Unassigned";

  return (
    <Stack spacing={3}>
      <Button
        component={NextLink}
        href="/cvs"
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
      >
        Back to CVs
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: "action.hover",
          color: "var(--app-text)",
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <MuiLink
              component={NextLink}
              href={`/cvs/${cv.id}/skills`}
              underline="hover"
              variant="body2"
            >
              Skills
            </MuiLink>
            <MuiLink
              component={NextLink}
              href={`/cvs/${cv.id}/projects`}
              underline="hover"
              variant="body2"
            >
              Projects
            </MuiLink>
            <MuiLink
              component={NextLink}
              href={`/cvs/${cv.id}/preview`}
              underline="hover"
              variant="body2"
            >
              Preview
            </MuiLink>
          </Stack>

          <Typography variant="h4" component="h1">
            {cv.name}
          </Typography>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Education
            </Typography>
            <Typography>{cv.education?.trim() ? cv.education : "—"}</Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Employee
            </Typography>
            <Typography>{employee}</Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>
              {cv.description}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CvDetailsPage;
