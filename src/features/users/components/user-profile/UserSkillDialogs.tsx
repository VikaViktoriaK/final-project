"use client";

import * as React from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
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
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddProfileSkillMutation,
  useSkillsCatalogQuery,
  useUpdateProfileSkillMutation,
} from "@/features/users/api/userSkills";
import {
  ADD_SKILL_DIALOG_LABELS,
  CONFIRM_BULK_REMOVE_SKILLS_LABELS,
  UPDATE_SKILL_DIALOG_LABELS,
} from "@/features/users/constants/userSkills.constants";
import {
  SkillMastery,
  getSkillMasteryCatalog,
} from "@/features/users/constants/userSkills.mastery";
import { formatProfileSubmitError } from "@/features/users/components/user-profile/UserProfileForm";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import { skillNotOnProfile } from "@/features/users/components/user-profile/userSkills.utils";
import type {
  ProfileSkillRow,
  UserSkill,
} from "@/features/users/types/userSkills.types";

const dialogInputLabelSlotProps = {
  inputLabel: { shrink: true },
} as const;

const skillDialogPaperSx = [
  userLanguagesSx.languageDialog,
  userLanguagesSx.addLanguageDialog,
] as const;

type SkillFormDialogFieldsProps = {
  title: string;
  skillLabel: string;
  masteryLabel: string;
  skillName: string;
  onSkillNameChange: (value: string) => void;
  skillOptions: { id: string; name: string }[];
  skillSelectDisabled?: boolean;
  mastery: string;
  onMasteryChange: (event: SelectChangeEvent<string>) => void;
  masteryCatalog: { id: string; name: string }[];
  loading: boolean;
  emptySkillsMessage?: string | null;
  submitError: string | null;
  onClose: () => void;
};

function SkillFormDialogFields({
  title,
  skillLabel,
  masteryLabel,
  skillName,
  onSkillNameChange,
  skillOptions,
  skillSelectDisabled = false,
  mastery,
  onMasteryChange,
  masteryCatalog,
  loading,
  emptySkillsMessage,
  submitError,
  onClose,
}: SkillFormDialogFieldsProps) {
  return (
    <>
      <DialogTitle
        component="div"
        sx={userLanguagesSx.addLanguageDialogTitleRoot}
      >
        <Box sx={userLanguagesSx.dialogTitleRow}>
          <Box component="span" sx={userLanguagesSx.dialogTitleText}>
            {title}
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
        {loading ? <Alert severity="info">Loading…</Alert> : null}
        {!loading && emptySkillsMessage ? (
          <Alert severity="warning">{emptySkillsMessage}</Alert>
        ) : null}
        {!loading && !emptySkillsMessage ? (
          <>
            <TextField
              select
              variant="outlined"
              label={skillLabel}
              value={skillName}
              onChange={(e) => onSkillNameChange(e.target.value)}
              fullWidth
              disabled={skillSelectDisabled}
              sx={userLanguagesSx.dialogField}
              slotProps={{
                ...dialogInputLabelSlotProps,
                select: { displayEmpty: !skillSelectDisabled },
              }}
            >
              {!skillSelectDisabled ? (
                <MenuItem value="">
                  <em>Select skill</em>
                </MenuItem>
              ) : null}
              {skillOptions.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              variant="outlined"
              label={masteryLabel}
              value={mastery}
              onChange={onMasteryChange}
              fullWidth
              sx={userLanguagesSx.dialogField}
              slotProps={dialogInputLabelSlotProps}
            >
              {masteryCatalog.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </>
        ) : null}
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
      </DialogContent>
    </>
  );
}

type AddUserSkillDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  currentSkills: ProfileSkillRow[];
  onCompleted: () => Promise<unknown> | void;
};

function AddUserSkillDialogContent({
  userId,
  currentSkills,
  onClose,
  onCompleted,
}: Omit<AddUserSkillDialogProps, "open">) {
  const [skillName, setSkillName] = React.useState("");
  const [mastery, setMastery] = React.useState<string>(SkillMastery.Novice);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { catalog: skillsCatalog, loading: skillsLoading } =
    useSkillsCatalogQuery(true);
  const masteryCatalog = React.useMemo(() => getSkillMasteryCatalog(), []);
  const [addSkill, { loading: saving }] = useAddProfileSkillMutation();

  const addable = skillsCatalog.filter((item) =>
    skillNotOnProfile(item.name, currentSkills),
  );

  const selectedCatalogItem = skillsCatalog.find(
    (item) => item.name === skillName,
  );

  const handleMasteryChange = (event: SelectChangeEvent<string>) => {
    setMastery(event.target.value);
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    if (!skillName.trim() || !selectedCatalogItem) {
      setSubmitError("Select a skill.");
      return;
    }
    try {
      await addSkill({
        variables: {
          skill: {
            userId,
            name: selectedCatalogItem.name,
            categoryId: selectedCatalogItem.categoryId,
            mastery,
          },
        },
      });
      await onCompleted();
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  };

  const loading = skillsLoading;

  return (
    <>
      <SkillFormDialogFields
        title={ADD_SKILL_DIALOG_LABELS.title}
        skillLabel={ADD_SKILL_DIALOG_LABELS.skillField}
        masteryLabel={ADD_SKILL_DIALOG_LABELS.masteryField}
        skillName={skillName}
        onSkillNameChange={setSkillName}
        skillOptions={addable.map((item) => ({
          id: item.id,
          name: item.name,
        }))}
        mastery={mastery}
        onMasteryChange={handleMasteryChange}
        masteryCatalog={masteryCatalog}
        loading={loading}
        emptySkillsMessage={
          !loading && addable.length === 0
            ? "No skills available to add, or the list is empty."
            : null
        }
        submitError={submitError}
        onClose={onClose}
      />
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {ADD_SKILL_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || !skillName || addable.length === 0}
          sx={userLanguagesSx.dialogConfirmBtn}
        >
          {ADD_SKILL_DIALOG_LABELS.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function AddUserSkillDialog({
  open,
  onClose,
  userId,
  currentSkills,
  onCompleted,
}: AddUserSkillDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={skillDialogPaperSx}
    >
      {open ? (
        <AddUserSkillDialogContent
          key={userId}
          userId={userId}
          currentSkills={currentSkills}
          onClose={onClose}
          onCompleted={onCompleted}
        />
      ) : null}
    </Dialog>
  );
}

type UpdateUserSkillDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  skill: UserSkill | null;
  onCompleted: () => Promise<unknown> | void;
};

function UpdateUserSkillDialogContent({
  userId,
  skill,
  onClose,
  onCompleted,
}: {
  userId: string;
  skill: UserSkill;
  onClose: () => void;
  onCompleted: () => Promise<unknown> | void;
}) {
  const [skillName] = React.useState(skill.name);
  const [mastery, setMastery] = React.useState(skill.mastery);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const masteryCatalog = React.useMemo(() => getSkillMasteryCatalog(), []);
  const [updateSkill, { loading: saving }] = useUpdateProfileSkillMutation();

  const handleMasteryChange = (event: SelectChangeEvent<string>) => {
    setMastery(event.target.value);
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    if (mastery === skill.mastery) {
      onClose();
      return;
    }
    try {
      await updateSkill({
        variables: {
          skill: {
            userId,
            name: skill.name,
            categoryId: skill.categoryId,
            mastery,
          },
        },
      });
      await onCompleted();
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  };

  return (
    <>
      <SkillFormDialogFields
        title={UPDATE_SKILL_DIALOG_LABELS.title}
        skillLabel={UPDATE_SKILL_DIALOG_LABELS.skillField}
        masteryLabel={UPDATE_SKILL_DIALOG_LABELS.masteryField}
        skillName={skillName}
        onSkillNameChange={() => undefined}
        skillOptions={[{ id: skill.id, name: skill.name }]}
        skillSelectDisabled
        mastery={mastery}
        onMasteryChange={handleMasteryChange}
        masteryCatalog={masteryCatalog}
        loading={false}
        submitError={submitError}
        onClose={onClose}
      />
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {UPDATE_SKILL_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || mastery === skill.mastery}
          sx={userLanguagesSx.dialogConfirmBtn}
        >
          {UPDATE_SKILL_DIALOG_LABELS.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function UpdateUserSkillDialog({
  open,
  onClose,
  userId,
  skill,
  onCompleted,
}: UpdateUserSkillDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={skillDialogPaperSx}
    >
      {open && skill ? (
        <UpdateUserSkillDialogContent
          key={`${skill.name}:${skill.mastery}`}
          userId={userId}
          skill={skill}
          onClose={onClose}
          onCompleted={onCompleted}
        />
      ) : null}
    </Dialog>
  );
}

type ConfirmBulkRemoveSkillsDialogProps = {
  open: boolean;
  selectedCount: number;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  submitting: boolean;
  errorMessage: string | null;
};

export function ConfirmBulkRemoveSkillsDialog({
  open,
  selectedCount,
  onClose,
  onConfirm,
  submitting,
  errorMessage,
}: ConfirmBulkRemoveSkillsDialogProps) {
  const handleClose = () => {
    if (!submitting) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={userLanguagesSx.languageDialog}
    >
      {open ? (
        <>
          <DialogTitle component="div" sx={userLanguagesSx.dialogTitleRoot}>
            <Box sx={userLanguagesSx.dialogTitleRow}>
              <Box component="span" sx={userLanguagesSx.dialogTitleText}>
                {CONFIRM_BULK_REMOVE_SKILLS_LABELS.title}
              </Box>
              <IconButton
                type="button"
                aria-label="Close dialog"
                onClick={handleClose}
                size="small"
                disabled={submitting}
                sx={userLanguagesSx.dialogCloseBtn}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={userLanguagesSx.dialogContent}>
            <Typography
              sx={{
                color: "var(--app-text-muted)",
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              {selectedCount === 1
                ? "Remove this skill from the profile? This cannot be undone."
                : `Remove ${selectedCount} skills from the profile? This cannot be undone.`}
            </Typography>
            {errorMessage ? (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errorMessage}
              </Alert>
            ) : null}
          </DialogContent>
          <DialogActions sx={userLanguagesSx.dialogActions}>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={submitting}
              sx={userLanguagesSx.dialogCancelBtn}
            >
              {CONFIRM_BULK_REMOVE_SKILLS_LABELS.cancel}
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => void onConfirm()}
              disabled={submitting}
              sx={userLanguagesSx.dialogRemoveConfirmBtn}
            >
              {CONFIRM_BULK_REMOVE_SKILLS_LABELS.delete}
            </Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
}
