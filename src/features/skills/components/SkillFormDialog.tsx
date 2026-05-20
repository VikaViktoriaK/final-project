import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { CatalogFormDialogActions } from "@/components/catalog-form/CatalogFormDialogActions";
import { CatalogFormDialogTitle } from "@/components/catalog-form/CatalogFormDialogTitle";
import { FORM_INPUT_LABEL_SLOT_PROPS } from "@/shared/constants/formDialog.constants";
import { CATALOG_FORM_DIALOG_PAPER_SX } from "@/shared/constants/catalogDialog.constants";
import { formDialogSx } from "@/shared/styles/formDialog.styles";
import { useSkillFormDialog } from "@/features/skills/hooks/useSkillFormDialog";
import type { SkillFormValues } from "@/features/skills/types/skillForm.types";
import type { SkillCategoryOption, SkillRow } from "../types";

type SkillFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  skill: SkillRow | null;
  categories: SkillCategoryOption[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: SkillFormValues) => Promise<void>;
};

function SkillFormDialogContent({
  mode,
  skill,
  categories,
  saving,
  onClose,
  onSubmit,
}: Omit<SkillFormDialogProps, "open">) {
  const {
    labels,
    name,
    setName,
    categoryId,
    setCategoryId,
    submitError,
    confirmDisabled,
    handleSubmit,
  } = useSkillFormDialog({
    mode,
    skill,
    categories,
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
        <TextField
          select
          variant="outlined"
          label={labels.categoryLabel}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          fullWidth
          disabled={categories.length === 0}
          sx={formDialogSx.dialogField}
          slotProps={FORM_INPUT_LABEL_SLOT_PROPS}
        >
          {categories.length === 0 ? (
            <MenuItem value="" disabled>
              No categories
            </MenuItem>
          ) : (
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))
          )}
        </TextField>
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

export function SkillFormDialog({
  open,
  mode,
  skill,
  categories,
  saving,
  onClose,
  onSubmit,
}: SkillFormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={CATALOG_FORM_DIALOG_PAPER_SX}
    >
      {open ? (
        <SkillFormDialogContent
          key={`${mode}-${skill?.id ?? "new"}`}
          mode={mode}
          skill={skill}
          categories={categories}
          saving={saving}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      ) : null}
    </Dialog>
  );
}
