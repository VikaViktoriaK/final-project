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
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddProfileLanguageMutation,
  useDeleteProfileLanguageMutation,
  useLanguageCatalogQuery,
} from "@/features/users/api/userLanguages";
import {
  ADD_LANGUAGE_DIALOG_LABELS,
  LANGUAGE_PROFICIENCY_OPTIONS,
  REMOVE_LANGUAGE_DIALOG_LABELS,
} from "@/features/users/constants/userLanguages.constants";
import { formatProfileSubmitError } from "@/features/users/components/user-profile/UserProfileForm";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";

type AddUserLanguageDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  currentLanguages: UserLanguageRow[];
  onCompleted: () => Promise<unknown> | void;
};

function languageNotOnProfile(
  catalogName: string,
  current: UserLanguageRow[],
): boolean {
  const n = catalogName.trim().toLowerCase();
  return !current.some((row) => row.name.trim().toLowerCase() === n);
}

function AddUserLanguageDialogContent({
  userId,
  currentLanguages,
  onClose,
  onCompleted,
}: Omit<AddUserLanguageDialogProps, "open">) {
  const [languageName, setLanguageName] = React.useState("");
  const [proficiency, setProficiency] = React.useState<string>("A1");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { data: catalogData, loading: catalogLoading } =
    useLanguageCatalogQuery(true);
  const [addLanguage, { loading: saving }] = useAddProfileLanguageMutation();

  const catalog = catalogData?.languages ?? [];
  const addable = catalog.filter((item) =>
    languageNotOnProfile(item.name, currentLanguages),
  );

  const handleSubmit = async () => {
    setSubmitError(null);
    if (!languageName.trim()) {
      setSubmitError("Select a language.");
      return;
    }
    try {
      await addLanguage({
        variables: {
          language: {
            userId,
            name: languageName.trim(),
            proficiency,
          },
        },
      });
      await onCompleted();
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  };

  return (
    <>
      <DialogTitle component="div" sx={{ m: 0, p: 0, px: 3, pt: 2 }}>
        <Box sx={userLanguagesSx.dialogTitleRow}>
          <Box component="span" sx={userLanguagesSx.dialogTitleText}>
            {ADD_LANGUAGE_DIALOG_LABELS.title}
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
      <DialogContent sx={userLanguagesSx.dialogContent}>
        {catalogLoading ? (
          <Alert severity="info">Loading languages…</Alert>
        ) : null}
        {!catalogLoading && addable.length === 0 ? (
          <Alert severity="warning">
            No languages available to add, or the list is empty.
          </Alert>
        ) : null}
        {!catalogLoading && addable.length > 0 ? (
          <>
            <TextField
              select
              variant="outlined"
              label={ADD_LANGUAGE_DIALOG_LABELS.languageField}
              value={languageName}
              onChange={(e) => setLanguageName(e.target.value)}
              fullWidth
              sx={userLanguagesSx.dialogField}
              slotProps={{ select: { displayEmpty: true } }}
            >
              <MenuItem value="">
                <em>Select language</em>
              </MenuItem>
              {addable.map((item) => (
                <MenuItem key={item.id ?? item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              variant="outlined"
              label={ADD_LANGUAGE_DIALOG_LABELS.proficiencyField}
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              fullWidth
              sx={userLanguagesSx.dialogField}
            >
              {LANGUAGE_PROFICIENCY_OPTIONS.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </>
        ) : null}
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
      </DialogContent>
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {ADD_LANGUAGE_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || !languageName || addable.length === 0}
          sx={userLanguagesSx.dialogConfirmBtn}
        >
          {ADD_LANGUAGE_DIALOG_LABELS.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function AddUserLanguageDialog({
  open,
  onClose,
  userId,
  currentLanguages,
  onCompleted,
}: AddUserLanguageDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={userLanguagesSx.languageDialog}
    >
      {open ? (
        <AddUserLanguageDialogContent
          key={userId}
          userId={userId}
          currentLanguages={currentLanguages}
          onClose={onClose}
          onCompleted={onCompleted}
        />
      ) : null}
    </Dialog>
  );
}

type RemoveUserLanguageDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  currentLanguages: UserLanguageRow[];
  onCompleted: () => Promise<unknown> | void;
};

function RemoveUserLanguageDialogContent({
  userId,
  currentLanguages,
  onClose,
  onCompleted,
}: Omit<RemoveUserLanguageDialogProps, "open">) {
  const [languageName, setLanguageName] = React.useState("");
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [deleteLanguage, { loading: deleting }] =
    useDeleteProfileLanguageMutation();

  const handleSubmit = async () => {
    setSubmitError(null);
    if (!languageName.trim()) {
      setSubmitError("Select a language to remove.");
      return;
    }
    try {
      await deleteLanguage({
        variables: {
          language: {
            userId,
            name: languageName.trim(),
          },
        },
      });
      await onCompleted();
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  };

  return (
    <>
      <DialogTitle component="div" sx={{ m: 0, p: 0, px: 3, pt: 2 }}>
        <Box sx={userLanguagesSx.dialogTitleRow}>
          <Box component="span" sx={userLanguagesSx.dialogTitleText}>
            {REMOVE_LANGUAGE_DIALOG_LABELS.title}
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
      <DialogContent sx={userLanguagesSx.dialogContent}>
        {currentLanguages.length === 0 ? (
          <Alert severity="info">There are no languages to remove.</Alert>
        ) : (
          <TextField
            select
            variant="outlined"
            label={ADD_LANGUAGE_DIALOG_LABELS.languageField}
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            fullWidth
            sx={userLanguagesSx.dialogField}
            slotProps={{ select: { displayEmpty: true } }}
          >
            <MenuItem value="">
              <em>Select language</em>
            </MenuItem>
            {currentLanguages.map((row) => (
              <MenuItem key={`${row.name}:${row.proficiency}`} value={row.name}>
                {row.name} ({row.proficiency})
              </MenuItem>
            ))}
          </TextField>
        )}
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
      </DialogContent>
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={deleting}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {REMOVE_LANGUAGE_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={deleting || !languageName || currentLanguages.length === 0}
          sx={userLanguagesSx.dialogRemoveConfirmBtn}
        >
          {REMOVE_LANGUAGE_DIALOG_LABELS.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function RemoveUserLanguageDialog({
  open,
  onClose,
  userId,
  currentLanguages,
  onCompleted,
}: RemoveUserLanguageDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={userLanguagesSx.languageDialog}
    >
      {open ? (
        <RemoveUserLanguageDialogContent
          key={userId}
          userId={userId}
          currentLanguages={currentLanguages}
          onClose={onClose}
          onCompleted={onCompleted}
        />
      ) : null}
    </Dialog>
  );
}
