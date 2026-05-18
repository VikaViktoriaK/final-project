"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import useCvDetailsPage from "../hooks/use-cv-details-page";
import { cvsStyles } from "../styles/cvs.styles";

function CvDetailsPage() {
  const page = useCvDetailsPage();

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={page.onSubmit}
        sx={cvsStyles.detailsForm}
      >
        <Stack spacing={2.5}>
          <TextField
            label="Name"
            sx={cvsStyles.formField}
            {...page.register("name")}
            error={!!page.errors.name}
            helperText={page.errors.name?.message}
            disabled={!page.canEdit}
            fullWidth
          />
          <TextField
            label="Education"
            sx={cvsStyles.formField}
            {...page.register("education")}
            error={!!page.errors.education}
            helperText={page.errors.education?.message}
            disabled={!page.canEdit}
            fullWidth
          />
          <TextField
            label="Description"
            sx={cvsStyles.formField}
            {...page.register("description")}
            error={!!page.errors.description}
            helperText={page.errors.description?.message}
            disabled={!page.canEdit}
            fullWidth
            multiline
            minRows={6}
          />
          {!page.canEdit && (
            <Alert severity="info">
              You can view this CV but cannot edit it.
            </Alert>
          )}
          {page.canEdit && (
            <Button
              type="submit"
              sx={cvsStyles.updateButton}
              disabled={page.isPending}
            >
              {page.isPending ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                "Update"
              )}
            </Button>
          )}
        </Stack>
      </Box>
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvDetailsPage;
