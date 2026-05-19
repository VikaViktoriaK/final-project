"use client";

import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { CatalogFormDialogActions } from "@/components/catalog-form/CatalogFormDialogActions";
import { CatalogFormDialogTitle } from "@/components/catalog-form/CatalogFormDialogTitle";
import { PROFILE_DIALOG_INPUT_LABEL_SLOT_PROPS } from "@/features/users/constants/profileDialog.constants";
import { CATALOG_FORM_DIALOG_PAPER_SX } from "@/features/users/constants/catalogDialog.constants";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import { useNameCatalogFormDialog } from "@/lib/hooks/useNameCatalogFormDialog";
import {
  POSITION_CREATE_DIALOG,
  POSITION_EDIT_DIALOG,
} from "../constants/positions.constants";
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
  const { labels, name, setName, submitError, confirmDisabled, handleSubmit } =
    useNameCatalogFormDialog({
      mode,
      currentName: position?.name,
      createLabels: POSITION_CREATE_DIALOG,
      editLabels: POSITION_EDIT_DIALOG,
      onClose,
      onSubmit,
    });

  return (
    <>
      <CatalogFormDialogTitle title={labels.title} onClose={onClose} />
      <DialogContent sx={userLanguagesSx.addLanguageDialogContent}>
        <TextField
          variant="outlined"
          label={labels.nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoFocus
          sx={userLanguagesSx.dialogField}
          slotProps={PROFILE_DIALOG_INPUT_LABEL_SLOT_PROPS}
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
