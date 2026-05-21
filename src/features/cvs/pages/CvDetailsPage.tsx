"use client";

import { Alert, Box, Button, CircularProgress } from "@mui/material";
import useCvDetailsPage from "../details/hooks/use-cv-details-page";
import type { CreateCvFormValues } from "../schemas";
import CvDetailsFormFields from "../components/details/CvDetailsFormFields";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
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
        <CvDetailsFormFields
          register={
            page.register as unknown as UseFormRegister<CreateCvFormValues>
          }
          errors={page.errors as unknown as FieldErrors<CreateCvFormValues>}
          disabled={!page.canEdit}
          autoFocusName={page.canEdit}
        />

        {!page.canEdit && (
          <Alert severity="info" sx={cvsStyles.detailsFormAlert}>
            You can view this CV but cannot edit it.
          </Alert>
        )}

        {page.canEdit && (
          <Button
            type="submit"
            sx={[
              cvsStyles.updateButton,
              page.hasChanges
                ? cvsStyles.updateButtonActive
                : cvsStyles.updateButtonMuted,
            ]}
            disabled={!page.canUpdate}
          >
            {page.isPending ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              "Update"
            )}
          </Button>
        )}
      </Box>
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvDetailsPage;
