import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { CatalogFormDialogActions } from "@/components/catalog-form/CatalogFormDialogActions";
import { CatalogFormDialogTitle } from "@/components/catalog-form/CatalogFormDialogTitle";
import { FORM_INPUT_LABEL_SLOT_PROPS } from "@/shared/constants/formDialog.constants";
import { CATALOG_FORM_DIALOG_PAPER_SX } from "@/shared/constants/catalogDialog.constants";
import { formDialogSx } from "@/shared/styles/formDialog.styles";
import { useNameCatalogFormDialog } from "@/lib/hooks/useNameCatalogFormDialog";
import {
  DEPARTMENT_CREATE_DIALOG,
  DEPARTMENT_EDIT_DIALOG,
} from "../constants/departments.constants";
import type { DepartmentRow } from "../types";

type DepartmentFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  department: DepartmentRow | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
};

function DepartmentFormDialogContent({
  mode,
  department,
  saving,
  onClose,
  onSubmit,
}: Omit<DepartmentFormDialogProps, "open">) {
  const { labels, name, setName, submitError, confirmDisabled, handleSubmit } =
    useNameCatalogFormDialog({
      mode,
      currentName: department?.name,
      createLabels: DEPARTMENT_CREATE_DIALOG,
      editLabels: DEPARTMENT_EDIT_DIALOG,
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

export function DepartmentFormDialog({
  open,
  mode,
  department,
  saving,
  onClose,
  onSubmit,
}: DepartmentFormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={CATALOG_FORM_DIALOG_PAPER_SX}
    >
      {open ? (
        <DepartmentFormDialogContent
          key={`${mode}-${department?.id ?? "new"}`}
          mode={mode}
          department={department}
          saving={saving}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      ) : null}
    </Dialog>
  );
}
