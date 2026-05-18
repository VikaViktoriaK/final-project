"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { formatProfileSubmitError } from "@/features/users/components/user-profile/UserProfileForm";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import {
  SKILL_CREATE_DIALOG,
  SKILL_EDIT_DIALOG,
} from "../constants/skills.constants";
import type { SkillCategoryOption, SkillRow } from "../types";

const dialogInputLabelSlotProps = {
  inputLabel: { shrink: true },
} as const;

const skillDialogPaperSx = [
  userLanguagesSx.languageDialog,
  userLanguagesSx.addLanguageDialog,
] as const;

type SkillFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  skill: SkillRow | null;
  categories: SkillCategoryOption[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; categoryId: string }) => Promise<void>;
};

function SkillFormDialogContent({
  mode,
  skill,
  categories,
  saving,
  onClose,
  onSubmit,
}: Omit<SkillFormDialogProps, "open">) {
  const labels = mode === "create" ? SKILL_CREATE_DIALOG : SKILL_EDIT_DIALOG;
  const [name, setName] = React.useState(() =>
    mode === "edit" && skill ? skill.name : "",
  );
  const [categoryId, setCategoryId] = React.useState(() =>
    mode === "edit" && skill ? skill.categoryId : (categories[0]?.id ?? ""),
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setSubmitError("Enter a skill name.");
      return;
    }
    if (!categoryId) {
      setSubmitError("Select a category.");
      return;
    }
    if (
      mode === "edit" &&
      skill &&
      trimmedName === skill.name &&
      categoryId === skill.categoryId
    ) {
      onClose();
      return;
    }
    setSubmitError(null);
    try {
      await onSubmit({ name: trimmedName, categoryId });
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  };

  const unchanged = Boolean(
    mode === "edit" &&
    skill &&
    name.trim() === skill.name &&
    categoryId === skill.categoryId,
  );

  return (
    <>
      <DialogTitle
        component="div"
        sx={userLanguagesSx.addLanguageDialogTitleRoot}
      >
        <Box sx={userLanguagesSx.dialogTitleRow}>
          <Box component="span" sx={userLanguagesSx.dialogTitleText}>
            {labels.title}
          </Box>
          <IconButton
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            size="small"
            sx={userLanguagesSx.dialogCloseBtn}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={userLanguagesSx.addLanguageDialogContent}>
        <TextField
          variant="outlined"
          label={labels.nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoFocus
          sx={userLanguagesSx.dialogField}
          slotProps={dialogInputLabelSlotProps}
        />
        <TextField
          select
          variant="outlined"
          label={labels.categoryLabel}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          fullWidth
          disabled={categories.length === 0}
          sx={userLanguagesSx.dialogField}
          slotProps={dialogInputLabelSlotProps}
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
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {labels.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          disabled={
            saving ||
            !name.trim() ||
            !categoryId ||
            categories.length === 0 ||
            unchanged
          }
          onClick={() => void handleSubmit()}
          sx={userLanguagesSx.dialogConfirmBtn}
        >
          {labels.confirm}
        </Button>
      </DialogActions>
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
  const formKey = `${mode}-${skill?.id ?? "new"}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={skillDialogPaperSx}
    >
      {open ? (
        <SkillFormDialogContent
          key={formKey}
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
