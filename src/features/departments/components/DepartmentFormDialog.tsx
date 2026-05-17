"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { formatProfileSubmitError } from "@/features/users/components/user-profile/UserProfileForm";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import {
  DEPARTMENT_CREATE_DIALOG,
  DEPARTMENT_EDIT_DIALOG,
} from "../constants/departments.constants";
import type { DepartmentRow } from "../types";

const dialogInputLabelSlotProps = {
  inputLabel: { shrink: true },
} as const;

const departmentDialogPaperSx = [
  userLanguagesSx.languageDialog,
  userLanguagesSx.addLanguageDialog,
] as const;

type DepartmentFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  department: DepartmentRow | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
};

type DepartmentFormDialogFieldsProps = {
  title: string;
  nameLabel: string;
  name: string;
  onNameChange: (value: string) => void;
  submitError: string | null;
  onClose: () => void;
};

function DepartmentFormDialogFields({
  title,
  nameLabel,
  name,
  onNameChange,
  submitError,
  onClose,
}: DepartmentFormDialogFieldsProps) {
  return (
    <>
      <DialogTitle
        component="div"
        sx={userLanguagesSx.addLanguageDialogTitleRoot}
      >
        <Box sx={userLanguagesSx.dialogTitleRow}>
          <Box component="span" sx={userLanguagesSx.dialogTitleText}>
            {title}
          </Box>
          <IconButton
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            size="small"
            sx={userLanguagesSx.dialogCloseBtn}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={userLanguagesSx.addLanguageDialogContent}>
        <TextField
          variant="outlined"
          label={nameLabel}
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          fullWidth
          autoFocus
          sx={userLanguagesSx.dialogField}
          slotProps={dialogInputLabelSlotProps}
        />
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
      </DialogContent>
    </>
  );
}

function DepartmentFormDialogContent({
  mode,
  department,
  saving,
  onClose,
  onSubmit,
}: Omit<DepartmentFormDialogProps, "open">) {
  const labels =
    mode === "create" ? DEPARTMENT_CREATE_DIALOG : DEPARTMENT_EDIT_DIALOG;
  const initialName = mode === "edit" && department ? department.name : "";
  const [name, setName] = React.useState(() => initialName);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setSubmitError("Enter a department name.");
      return;
    }
    if (mode === "edit" && department && trimmed === department.name) {
      onClose();
      return;
    }
    setSubmitError(null);
    try {
      await onSubmit(trimmed);
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  };

  const confirmDisabled =
    saving ||
    !name.trim() ||
    (mode === "edit" && department ? name.trim() === department.name : false);

  return (
    <>
      <DepartmentFormDialogFields
        title={labels.title}
        nameLabel={labels.nameLabel}
        name={name}
        onNameChange={setName}
        submitError={submitError}
        onClose={onClose}
      />
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {labels.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          disabled={confirmDisabled}
          onClick={() => void handleSubmit()}
          sx={userLanguagesSx.dialogConfirmBtn}
        >
          {labels.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function DepartmentFormDialog({
  open,
  mode,
  department,
  saving,
  onClose,
  onSubmit,
}: DepartmentFormDialogProps) {
  const formKey = `${mode}-${department?.id ?? "new"}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={departmentDialogPaperSx}
    >
      {open ? (
        <DepartmentFormDialogContent
          key={formKey}
          mode={mode}
          department={department}
          saving={saving}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      ) : null}
    </Dialog>
  );
}
