"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { userLanguagesSx } from "./userLanguages.styles";

export type ProfileBulkRemoveDialogProps = {
  open: boolean;
  title: string;
  cancelLabel: string;
  deleteLabel: string;
  message: string;
  submitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export function ProfileBulkRemoveDialog({
  open,
  title,
  cancelLabel,
  deleteLabel,
  message,
  submitting,
  errorMessage,
  onClose,
  onConfirm,
}: ProfileBulkRemoveDialogProps) {
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
                {title}
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
              {message}
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
              {cancelLabel}
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => void onConfirm()}
              disabled={submitting}
              sx={userLanguagesSx.dialogRemoveConfirmBtn}
            >
              {deleteLabel}
            </Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
}
