import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { FORM_INPUT_LABEL_SLOT_PROPS } from "@/shared/constants/formDialog.constants";
import { formDialogSx } from "@/features/users/components/user-profile/userLanguages.styles";

export type SkillFormDialogFieldsProps = {
  title: string;
  skillLabel: string;
  masteryLabel: string;
  skillName: string;
  onSkillNameChange: (value: string) => void;
  skillOptions: { id: string; name: string }[];
  skillSelectDisabled?: boolean;
  mastery: string;
  onMasteryChange: (value: string) => void;
  masteryCatalog: { id: string; name: string }[];
  loading: boolean;
  emptySkillsMessage?: string | null;
  submitError: string | null;
  onClose: () => void;
};

export function SkillFormDialogFields({
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
      <DialogTitle component="div" sx={formDialogSx.addLanguageDialogTitleRoot}>
        <Box sx={formDialogSx.dialogTitleRow}>
          <Box component="span" sx={formDialogSx.dialogTitleText}>
            {title}
          </Box>
          <IconButton
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            size="small"
            sx={formDialogSx.dialogCloseBtn}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={formDialogSx.addLanguageDialogContent}>
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
              sx={formDialogSx.dialogField}
              slotProps={{
                ...FORM_INPUT_LABEL_SLOT_PROPS,
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
              onChange={(e) => onMasteryChange(e.target.value)}
              fullWidth
              sx={formDialogSx.dialogField}
              slotProps={FORM_INPUT_LABEL_SLOT_PROPS}
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
