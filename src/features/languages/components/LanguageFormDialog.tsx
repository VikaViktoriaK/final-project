import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { CatalogFormDialogActions } from "@/components/catalog-form/CatalogFormDialogActions";
import { CatalogFormDialogTitle } from "@/components/catalog-form/CatalogFormDialogTitle";
import { FORM_INPUT_LABEL_SLOT_PROPS } from "@/shared/constants/formDialog.constants";
import { CATALOG_FORM_DIALOG_PAPER_SX } from "@/shared/constants/catalogDialog.constants";
import { formDialogSx } from "@/shared/styles/formDialog.styles";
import { useLanguageFormDialog } from "@/features/languages/hooks/useLanguageFormDialog";
import type { LanguageFormValues } from "@/features/languages/types/languageForm.types";
import type { LanguageRow } from "../types";

type LanguageFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  language: LanguageRow | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: LanguageFormValues) => Promise<void>;
};

function LanguageFormDialogContent({
  mode,
  language,
  saving,
  onClose,
  onSubmit,
}: Omit<LanguageFormDialogProps, "open">) {
  const {
    labels,
    name,
    setName,
    nativeName,
    setNativeName,
    iso2,
    setIso2,
    submitError,
    unchanged,
    handleSubmit,
  } = useLanguageFormDialog({ mode, language, onClose, onSubmit });

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
        <TextField
          variant="outlined"
          label={labels.nativeNameLabel}
          value={nativeName}
          onChange={(e) => setNativeName(e.target.value)}
          fullWidth
          sx={formDialogSx.dialogField}
          slotProps={FORM_INPUT_LABEL_SLOT_PROPS}
        />
        <TextField
          variant="outlined"
          label={labels.iso2Label}
          value={iso2}
          onChange={(e) => setIso2(e.target.value.toUpperCase())}
          fullWidth
          sx={formDialogSx.dialogField}
          slotProps={{
            ...FORM_INPUT_LABEL_SLOT_PROPS,
            htmlInput: { maxLength: 2 },
          }}
        />
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
      </DialogContent>
      <CatalogFormDialogActions
        cancelLabel={labels.cancel}
        confirmLabel={labels.confirm}
        saving={saving}
        confirmDisabled={saving || unchanged}
        onClose={onClose}
        onConfirm={() => void handleSubmit()}
      />
    </>
  );
}

export function LanguageFormDialog({
  open,
  mode,
  language,
  saving,
  onClose,
  onSubmit,
}: LanguageFormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={CATALOG_FORM_DIALOG_PAPER_SX}
    >
      {open ? (
        <LanguageFormDialogContent
          key={`${mode}-${language?.id ?? "new"}`}
          mode={mode}
          language={language}
          saving={saving}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      ) : null}
    </Dialog>
  );
}
