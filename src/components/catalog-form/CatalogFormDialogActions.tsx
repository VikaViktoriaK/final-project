"use client";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";

type CatalogFormDialogActionsProps = {
  cancelLabel: string;
  confirmLabel: string;
  saving: boolean;
  confirmDisabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function CatalogFormDialogActions({
  cancelLabel,
  confirmLabel,
  saving,
  confirmDisabled,
  onClose,
  onConfirm,
}: CatalogFormDialogActionsProps) {
  return (
    <DialogActions sx={userLanguagesSx.dialogActions}>
      <Button
        variant="outlined"
        onClick={onClose}
        disabled={saving}
        sx={userLanguagesSx.dialogCancelBtn}
      >
        {cancelLabel}
      </Button>
      <Button
        variant="contained"
        disableElevation
        disabled={confirmDisabled}
        onClick={onConfirm}
        sx={userLanguagesSx.dialogConfirmBtn}
      >
        {confirmLabel}
      </Button>
    </DialogActions>
  );
}
