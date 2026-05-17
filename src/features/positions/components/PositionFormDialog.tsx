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
  POSITION_CREATE_DIALOG,
  POSITION_EDIT_DIALOG,
} from "../constants/positions.constants";
import type { PositionRow } from "../types";

const dialogInputLabelSlotProps = {
  inputLabel: { shrink: true },
} as const;

const positionDialogPaperSx = [
  userLanguagesSx.languageDialog,
  userLanguagesSx.addLanguageDialog,
] as const;

type PositionFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  position: PositionRow | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
};

type PositionFormDialogFieldsProps = {
  title: string;
  nameLabel: string;
  name: string;
  onNameChange: (value: string) => void;
  submitError: string | null;
  onClose: () => void;
};

function PositionFormDialogFields({
  title,
  nameLabel,
  name,
  onNameChange,
  submitError,
  onClose,
}: PositionFormDialogFieldsProps) {
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

function PositionFormDialogContent({
  mode,
  position,
  saving,
  onClose,
  onSubmit,
}: Omit<PositionFormDialogProps, "open">) {
  const labels =
    mode === "create" ? POSITION_CREATE_DIALOG : POSITION_EDIT_DIALOG;
  const initialName = mode === "edit" && position ? position.name : "";
  const [name, setName] = React.useState(() => initialName);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setSubmitError("Enter a position name.");
      return;
    }
    if (mode === "edit" && position && trimmed === position.name) {
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
    (mode === "edit" && position ? name.trim() === position.name : false);

  return (
    <>
      <PositionFormDialogFields
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

export function PositionFormDialog({
  open,
  mode,
  position,
  saving,
  onClose,
  onSubmit,
}: PositionFormDialogProps) {
  const formKey = `${mode}-${position?.id ?? "new"}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={positionDialogPaperSx}
    >
      {open ? (
        <PositionFormDialogContent
          key={formKey}
          mode={mode}
          position={position}
          saving={saving}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      ) : null}
    </Dialog>
  );
}
