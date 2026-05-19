import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteDialogSx } from "@/shared/styles/deleteDialog.styles";

export type ConfirmDeleteDialogProps = {
  open: boolean;
  title: string;
  cancelLabel: string;
  confirmLabel: string;
  deleting: boolean;
  canConfirm: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  children: React.ReactNode;
};

export function ConfirmDeleteDialog({
  open,
  title,
  cancelLabel,
  confirmLabel,
  deleting,
  canConfirm,
  onClose,
  onConfirm,
  children,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} sx={deleteDialogSx.deleteDialogRoot}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={deleteDialogSx.deleteDialogActions}>
        <Button
          onClick={onClose}
          disabled={deleting}
          sx={deleteDialogSx.deleteDialogCancelBtn}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          disabled={!canConfirm || deleting}
          sx={deleteDialogSx.deleteDialogDeleteBtn}
          onClick={() => void onConfirm()}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
