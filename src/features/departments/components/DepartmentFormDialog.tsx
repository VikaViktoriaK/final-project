"use client";

import * as React from "react";
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

type DepartmentFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  department: DepartmentRow | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
};

function DepartmentFormDialogContent({
  mode,
  department,
  saving,
  onClose,
  onSubmit,
}: Omit<DepartmentFormDialogProps, "open">) {
  const labels =
    mode === "create" ? DEPARTMENT_CREATE_DIALOG : DEPARTMENT_EDIT_DIALOG;
  const [name, setName] = React.useState(() =>
    mode === "edit" && department ? department.name : "",
  );
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a department name.");
      return;
    }
    setError(null);
    try {
      await onSubmit(trimmed);
      onClose();
    } catch (err) {
      setError(formatProfileSubmitError(err));
    }
  };

  return (
    <>
      <DialogTitle sx={dialogTitleSx}>
        <Box component="span">{labels.title}</Box>
        <IconButton
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          size="small"
          sx={dialogCloseBtnSx}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TextField
          label={labels.nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoFocus
          variant="outlined"
          sx={userLanguagesSx.dialogField}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {error ? (
          <Box sx={{ mt: 2, color: "error.main", fontSize: 14 }}>{error}</Box>
        ) : null}
      </DialogContent>
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
          disabled={saving}
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
      maxWidth="sm"
      sx={userLanguagesSx.languageDialog}
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

const dialogTitleSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  pr: 1,
} as const;

const dialogCloseBtnSx = {
  color: "var(--app-text-muted)",
} as const;
