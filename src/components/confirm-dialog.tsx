"use client";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";
import type { ConfirmDialogProps } from "./types";

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  loading = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} sx={cvsStyles.dialog}>
      <DialogTitle sx={cvsStyles.dialogTitle}>
        {title}
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
        <Typography sx={cvsStyles.dialogMessage}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={cvsStyles.dialogActions}>
        <Button
          type="button"
          onClick={onClose}
          sx={cvsStyles.cancelButton}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          sx={loading ? cvsStyles.primaryButtonMuted : cvsStyles.primaryButton}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            confirmLabel
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
