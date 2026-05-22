import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { CatalogFormDialogActions } from "@/components/catalog-form/CatalogFormDialogActions";
import { CatalogFormDialogTitle } from "@/components/catalog-form/CatalogFormDialogTitle";
import { FORM_INPUT_LABEL_SLOT_PROPS } from "@/shared/constants/formDialog.constants";
import { CATALOG_FORM_DIALOG_PAPER_SX } from "@/shared/constants/catalogDialog.constants";
import { formDialogSx } from "@/shared/styles/formDialog.styles";
import { useNameCatalogDialogLabels } from "@/i18n/hooks/use-name-catalog-dialog-labels";
import { useNameCatalogFormDialog } from "@/lib/hooks/useNameCatalogFormDialog";
import type { PositionRow } from "../types";

type PositionFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  position: PositionRow | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
};

function PositionFormDialogContent({
  mode,
  position,
  saving,
  onClose,
  onSubmit,
}: Omit<PositionFormDialogProps, "open">) {
  const dialogLabels = useNameCatalogDialogLabels(
    "positions.dialog.createTitle",
    "positions.dialog.editTitle",
  );
  const { labels, name, setName, submitError, confirmDisabled, handleSubmit } =
    useNameCatalogFormDialog({
      mode,
      currentName: position?.name,
      createLabels: dialogLabels.create,
      editLabels: dialogLabels.edit,
      onClose,
      onSubmit,
    });

  return (
    <>
      <CatalogFormDialogTitle title={labels.title} onClose={onClose} />
      <DialogContent sx={formDialogSx.addLanguageDialogContent}>
        <TextField
          variant="outlined"
          label={labels.nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoFocus
          sx={formDialogSx.dialogField}
          slotProps={FORM_INPUT_LABEL_SLOT_PROPS}
        />
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
      </DialogContent>
      <CatalogFormDialogActions
        cancelLabel={labels.cancel}
        confirmLabel={labels.confirm}
        saving={saving}
        confirmDisabled={saving || confirmDisabled}
        onClose={onClose}
        onConfirm={() => void handleSubmit()}
      />
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
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={CATALOG_FORM_DIALOG_PAPER_SX}
    >
      {open ? (
        <PositionFormDialogContent
          key={`${mode}-${position?.id ?? "new"}`}
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
