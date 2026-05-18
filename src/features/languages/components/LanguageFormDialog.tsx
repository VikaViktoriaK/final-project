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
  LANGUAGE_CREATE_DIALOG,
  LANGUAGE_EDIT_DIALOG,
} from "../constants/languages.constants";
import type { LanguageRow } from "../types";

const dialogInputLabelSlotProps = {
  inputLabel: { shrink: true },
} as const;

const languageDialogPaperSx = [
  userLanguagesSx.languageDialog,
  userLanguagesSx.addLanguageDialog,
] as const;

type LanguageFormValues = {
  name: string;
  nativeName: string;
  iso2: string;
};

type LanguageFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  language: LanguageRow | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: LanguageFormValues) => Promise<void>;
};

function LanguageFormDialogContent({
  mode,
  language,
  saving,
  onClose,
  onSubmit,
}: Omit<LanguageFormDialogProps, "open">) {
  const labels =
    mode === "create" ? LANGUAGE_CREATE_DIALOG : LANGUAGE_EDIT_DIALOG;
  const [name, setName] = React.useState(() =>
    mode === "edit" && language ? language.name : "",
  );
  const [nativeName, setNativeName] = React.useState(() =>
    mode === "edit" && language ? language.nativeName : "",
  );
  const [iso2, setIso2] = React.useState(() =>
    mode === "edit" && language ? language.iso2 : "",
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedNative = nativeName.trim();
    const trimmedIso2 = iso2.trim().toUpperCase();

    if (!trimmedName) {
      setSubmitError("Enter a language name.");
      return;
    }
    if (!trimmedNative) {
      setSubmitError("Enter a native name.");
      return;
    }
    if (!trimmedIso2) {
      setSubmitError("Enter an ISO2 code.");
      return;
    }
    if (trimmedIso2.length !== 2) {
      setSubmitError("ISO2 code must be exactly 2 characters.");
      return;
    }

    if (
      mode === "edit" &&
      language &&
      trimmedName === language.name &&
      trimmedNative === language.nativeName &&
      trimmedIso2 === language.iso2.toUpperCase()
    ) {
      onClose();
      return;
    }

    setSubmitError(null);
    try {
      await onSubmit({
        name: trimmedName,
        nativeName: trimmedNative,
        iso2: trimmedIso2,
      });
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  };

  const unchanged = Boolean(
    mode === "edit" &&
    language &&
    name.trim() === language.name &&
    nativeName.trim() === language.nativeName &&
    iso2.trim().toUpperCase() === language.iso2.toUpperCase(),
  );

  return (
    <>
      <DialogTitle
        component="div"
        sx={userLanguagesSx.addLanguageDialogTitleRoot}
      >
        <Box sx={userLanguagesSx.dialogTitleRow}>
          <Box component="span" sx={userLanguagesSx.dialogTitleText}>
            {labels.title}
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
          label={labels.nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoFocus
          sx={userLanguagesSx.dialogField}
          slotProps={dialogInputLabelSlotProps}
        />
        <TextField
          variant="outlined"
          label={labels.nativeNameLabel}
          value={nativeName}
          onChange={(e) => setNativeName(e.target.value)}
          fullWidth
          sx={userLanguagesSx.dialogField}
          slotProps={dialogInputLabelSlotProps}
        />
        <TextField
          variant="outlined"
          label={labels.iso2Label}
          value={iso2}
          onChange={(e) => setIso2(e.target.value.toUpperCase())}
          fullWidth
          sx={userLanguagesSx.dialogField}
          slotProps={{
            ...dialogInputLabelSlotProps,
            htmlInput: { maxLength: 2 },
          }}
        />
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
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
          disabled={saving || unchanged}
          onClick={() => void handleSubmit()}
          sx={userLanguagesSx.dialogConfirmBtn}
        >
          {labels.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function LanguageFormDialog({
  open,
  mode,
  language,
  saving,
  onClose,
  onSubmit,
}: LanguageFormDialogProps) {
  const formKey = `${mode}-${language?.id ?? "new"}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={languageDialogPaperSx}
    >
      {open ? (
        <LanguageFormDialogContent
          key={formKey}
          mode={mode}
          language={language}
          saving={saving}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      ) : null}
    </Dialog>
  );
}
