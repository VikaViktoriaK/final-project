"use client";

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreateCvFormValues } from "../schemas";
import { cvsStyles } from "../styles/cvs.styles";

type CreateCvDialogProps = {
  open: boolean;
  onClose: () => void;
  register: UseFormRegister<CreateCvFormValues>;
  errors: FieldErrors<CreateCvFormValues>;
  isPending: boolean;
  errorMessage?: string;
  onSubmit: () => void;
};

function CreateCvDialog({
  open,
  onClose,
  register,
  errors,
  isPending,
  errorMessage,
  onSubmit,
}: CreateCvDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={cvsStyles.dialog}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={cvsStyles.dialogTitle}>
        Create CV
        <IconButton
          type="button"
          onClick={onClose}
          aria-label="Close"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="create-cv-form"
          spacing={2.5}
          noValidate
          onSubmit={onSubmit}
          sx={cvsStyles.dialogContent}
        >
          <TextField
            label="Name"
            sx={cvsStyles.formField}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField
            label="Education"
            sx={cvsStyles.formField}
            {...register("education")}
            error={!!errors.education}
            helperText={errors.education?.message}
            fullWidth
          />
          <TextField
            label="Description"
            sx={cvsStyles.formField}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            multiline
            minRows={4}
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Stack>
      </DialogContent>

      <DialogActions sx={cvsStyles.dialogActions}>
        <Button
          type="button"
          onClick={onClose}
          sx={cvsStyles.cancelButton}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="create-cv-form"
          sx={cvsStyles.secondaryButton}
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCvDialog;
