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
import Typography from "@mui/material/Typography";
import {
  useAddProfileLanguageMutation,
  useLanguageCatalogQuery,
  useUpdateProfileLanguageMutation,
} from "@/features/users/api/userLanguages";
import {
  ADD_LANGUAGE_DIALOG_LABELS,
  CONFIRM_BULK_REMOVE_LANGUAGES_LABELS,
  LANGUAGE_PROFICIENCY_OPTIONS,
  UPDATE_LANGUAGE_DIALOG_LABELS,
} from "@/features/users/constants/userLanguages.constants";
import { formatProfileSubmitError } from "@/features/users/components/user-profile/UserProfileForm";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";

const dialogInputLabelSlotProps = {
  inputLabel: { shrink: true },
} as const;

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
      <DialogTitle
        component="div"
        sx={userLanguagesSx.addLanguageDialogTitleRoot}
      >
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
      <DialogContent sx={userLanguagesSx.addLanguageDialogContent}>
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
              slotProps={{
                ...dialogInputLabelSlotProps,
                select: { displayEmpty: true },
              }}
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
              slotProps={dialogInputLabelSlotProps}
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
      maxWidth={false}
      sx={[userLanguagesSx.languageDialog, userLanguagesSx.addLanguageDialog]}
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

type ConfirmBulkRemoveLanguagesDialogProps = {
  open: boolean;
  selectedCount: number;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  submitting: boolean;
  errorMessage: string | null;
};

export function ConfirmBulkRemoveLanguagesDialog({
  open,
  selectedCount,
  onClose,
  onConfirm,
  submitting,
  errorMessage,
}: ConfirmBulkRemoveLanguagesDialogProps) {
  const handleClose = () => {
    if (!submitting) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={userLanguagesSx.languageDialog}
    >
      {open ? (
        <>
          <DialogTitle component="div" sx={userLanguagesSx.dialogTitleRoot}>
            <Box sx={userLanguagesSx.dialogTitleRow}>
              <Box component="span" sx={userLanguagesSx.dialogTitleText}>
                {CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.title}
              </Box>
              <IconButton
                type="button"
                aria-label="Close dialog"
                onClick={handleClose}
                size="small"
                disabled={submitting}
                sx={userLanguagesSx.dialogCloseBtn}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={userLanguagesSx.dialogContent}>
            <Typography
              sx={{
                color: "var(--app-text-muted)",
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              {selectedCount === 1
                ? "Remove this language from the profile? This cannot be undone."
                : `Remove ${selectedCount} languages from the profile? This cannot be undone.`}
            </Typography>
            {errorMessage ? (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errorMessage}
              </Alert>
            ) : null}
          </DialogContent>
          <DialogActions sx={userLanguagesSx.dialogActions}>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={submitting}
              sx={userLanguagesSx.dialogCancelBtn}
            >
              {CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.cancel}
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => void onConfirm()}
              disabled={submitting}
              sx={userLanguagesSx.dialogRemoveConfirmBtn}
            >
              {CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.delete}
            </Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
}

type UpdateUserLanguageDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  language: UserLanguageRow | null;
  onCompleted: () => Promise<unknown> | void;
};

function UpdateUserLanguageDialogContent({
  userId,
  language,
  onClose,
  onCompleted,
}: {
  userId: string;
  language: UserLanguageRow;
  onClose: () => void;
  onCompleted: () => Promise<unknown> | void;
}) {
  const [proficiency, setProficiency] = React.useState(language.proficiency);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [updateLanguage, { loading: saving }] =
    useUpdateProfileLanguageMutation();

  const handleSubmit = async () => {
    setSubmitError(null);
    if (proficiency === language.proficiency) {
      return;
    }
    try {
      await updateLanguage({
        variables: {
          language: {
            userId,
            name: language.name,
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
      <DialogTitle component="div" sx={userLanguagesSx.dialogTitleRoot}>
        <Box sx={userLanguagesSx.dialogTitleRow}>
          <Box component="span" sx={userLanguagesSx.dialogTitleText}>
            {UPDATE_LANGUAGE_DIALOG_LABELS.title}
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
        <TextField
          variant="outlined"
          label={UPDATE_LANGUAGE_DIALOG_LABELS.languageField}
          value={language.name}
          fullWidth
          sx={userLanguagesSx.dialogField}
          slotProps={{
            input: { readOnly: true },
            inputLabel: { shrink: true },
          }}
        />
        <TextField
          select
          variant="outlined"
          label={UPDATE_LANGUAGE_DIALOG_LABELS.proficiencyField}
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          fullWidth
          sx={userLanguagesSx.dialogField}
          slotProps={dialogInputLabelSlotProps}
        >
          {LANGUAGE_PROFICIENCY_OPTIONS.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
      </DialogContent>
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {UPDATE_LANGUAGE_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || proficiency === language.proficiency}
          sx={userLanguagesSx.dialogConfirmBtn}
        >
          {UPDATE_LANGUAGE_DIALOG_LABELS.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function UpdateUserLanguageDialog({
  open,
  onClose,
  userId,
  language,
  onCompleted,
}: UpdateUserLanguageDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={userLanguagesSx.languageDialog}
    >
      {open && language ? (
        <UpdateUserLanguageDialogContent
          key={language.name}
          userId={userId}
          language={language}
          onClose={onClose}
          onCompleted={onCompleted}
        />
      ) : null}
    </Dialog>
  );
}
