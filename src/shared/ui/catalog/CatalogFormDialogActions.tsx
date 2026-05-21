import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { formDialogSx } from "@/shared/styles/formDialog.styles";

export type CatalogFormDialogActionsProps = {
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
    <DialogActions sx={formDialogSx.dialogActions}>
      <Button
        variant="outlined"
        onClick={onClose}
        disabled={saving}
        sx={formDialogSx.dialogCancelBtn}
      >
        {cancelLabel}
      </Button>
      <Button
        variant="contained"
        disableElevation
        disabled={confirmDisabled}
        onClick={onConfirm}
        sx={formDialogSx.dialogConfirmBtn}
      >
        {confirmLabel}
      </Button>
    </DialogActions>
  );
}
