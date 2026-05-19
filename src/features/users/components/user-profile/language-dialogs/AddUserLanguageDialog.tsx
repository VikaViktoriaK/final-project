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
import { FORM_INPUT_LABEL_SLOT_PROPS } from "@/shared/constants/formDialog.constants";
import {
  ADD_LANGUAGE_DIALOG_LABELS,
  LANGUAGE_PROFICIENCY_OPTIONS,
} from "@/features/users/constants/userLanguages.constants";
import { useAddUserLanguageDialog } from "@/features/users/hooks/useAddUserLanguageDialog";
import { formDialogSx } from "@/shared/styles/formDialog.styles";
import type { AddUserLanguageDialogProps } from "./userLanguageDialogs.types";

function AddUserLanguageDialogContent({
  userId,
  currentLanguages,
  onClose,
  onCompleted,
}: Omit<AddUserLanguageDialogProps, "open">) {
  const {
    languageName,
    setLanguageName,
    proficiency,
    setProficiency,
    submitError,
    catalogLoading,
    addable,
    saving,
    handleSubmit,
  } = useAddUserLanguageDialog({
    userId,
    currentLanguages,
    onClose,
    onCompleted,
  });

  return (
    <>
      <DialogTitle component="div" sx={formDialogSx.addLanguageDialogTitleRoot}>
        <Box sx={formDialogSx.dialogTitleRow}>
          <Box component="span" sx={formDialogSx.dialogTitleText}>
            {ADD_LANGUAGE_DIALOG_LABELS.title}
          </Box>
          <IconButton
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            size="small"
            sx={formDialogSx.dialogCloseBtn}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={formDialogSx.addLanguageDialogContent}>
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
              sx={formDialogSx.dialogField}
              slotProps={{
                ...FORM_INPUT_LABEL_SLOT_PROPS,
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
              sx={formDialogSx.dialogField}
              slotProps={FORM_INPUT_LABEL_SLOT_PROPS}
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
      <DialogActions sx={formDialogSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={formDialogSx.dialogCancelBtn}
        >
          {ADD_LANGUAGE_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || !languageName || addable.length === 0}
          sx={formDialogSx.dialogConfirmBtn}
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
      sx={[formDialogSx.languageDialog, formDialogSx.addLanguageDialog]}
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
