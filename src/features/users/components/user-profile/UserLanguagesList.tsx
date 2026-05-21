import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  isNativeProficiency,
  languageRowKey,
} from "@/features/users/components/user-profile/userLanguages.utils";
import { profileRemoveModeSx } from "./profileRemoveMode.styles";
import { userLanguagesSx } from "./userLanguages.styles";
import {
  CONFIRM_BULK_REMOVE_LANGUAGES_LABELS,
  USER_LANGUAGES_ADD_LABEL,
  USER_LANGUAGES_REMOVE_LABEL,
} from "@/features/users/constants/userLanguages.constants";
import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";

export type UserLanguagesListProps = {
  languages: UserLanguageRow[];
  canManage: boolean;
  removeMode: boolean;
  selectedKeys: Set<string>;
  selectedCount: number;
  onLanguageClick: (lang: UserLanguageRow) => void;
  onAdd: () => void;
  onStartRemove: () => void;
  onExitRemove: () => void;
  onOpenBulkConfirm: () => void;
};

export function UserLanguagesList({
  languages,
  canManage,
  removeMode,
  selectedKeys,
  selectedCount,
  onLanguageClick,
  onAdd,
  onStartRemove,
  onExitRemove,
  onOpenBulkConfirm,
}: UserLanguagesListProps) {
  return (
    <Box sx={userLanguagesSx.mainColumn}>
      <Typography component="h2" sx={userLanguagesSx.sectionTitle}>
        Languages
      </Typography>
      {languages.length === 0 ? (
        <Typography sx={userLanguagesSx.emptyState}>
          No languages listed yet.
        </Typography>
      ) : (
        <Box
          component="ul"
          sx={userLanguagesSx.languagesRow}
          aria-label="User languages"
          aria-multiselectable={removeMode ? true : undefined}
        >
          {languages.map((lang) => (
            <Box
              component="li"
              key={languageRowKey(lang)}
              sx={userLanguagesSx.languageListItem}
            >
              {canManage ? (
                <ButtonBase
                  type="button"
                  focusRipple
                  sx={[
                    profileRemoveModeSx.chip,
                    profileRemoveModeSx.chipEntry,
                    userLanguagesSx.languageEntryClickable,
                    removeMode && selectedKeys.has(languageRowKey(lang))
                      ? profileRemoveModeSx.chipSelected
                      : null,
                  ]}
                  aria-pressed={
                    removeMode
                      ? selectedKeys.has(languageRowKey(lang))
                      : undefined
                  }
                  onClick={() => onLanguageClick(lang)}
                >
                  <LanguageEntryContent lang={lang} />
                </ButtonBase>
              ) : (
                <Box sx={userLanguagesSx.languageEntryStatic}>
                  <LanguageEntryContent lang={lang} />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
      {canManage ? (
        <Box sx={profileRemoveModeSx.toolbarActionsRow}>
          {removeMode ? (
            <>
              <Button
                type="button"
                variant="outlined"
                onClick={onExitRemove}
                sx={profileRemoveModeSx.toolbarCancelBtn}
              >
                {CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.cancel}
              </Button>
              <Button
                type="button"
                variant="contained"
                disableElevation
                disabled={selectedCount === 0}
                onClick={onOpenBulkConfirm}
                sx={profileRemoveModeSx.toolbarDeleteBtn}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1.25,
                  }}
                >
                  <Box component="span">
                    {CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.delete}
                  </Box>
                  <Box
                    component="span"
                    sx={profileRemoveModeSx.toolbarCountBadge}
                  >
                    {selectedCount}
                  </Box>
                </Box>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="text"
                startIcon={<AddIcon />}
                sx={userLanguagesSx.addLanguageBtn}
                onClick={onAdd}
              >
                {USER_LANGUAGES_ADD_LABEL}
              </Button>
              <Button
                type="button"
                variant="text"
                startIcon={<DeleteIcon />}
                sx={userLanguagesSx.removeLanguagesBtn}
                disabled={languages.length === 0}
                onClick={onStartRemove}
              >
                {USER_LANGUAGES_REMOVE_LABEL}
              </Button>
            </>
          )}
        </Box>
      ) : null}
    </Box>
  );
}

function LanguageEntryContent({ lang }: { lang: UserLanguageRow }) {
  const proficiencySx = isNativeProficiency(lang.proficiency)
    ? userLanguagesSx.proficiencyNative
    : userLanguagesSx.proficiencyLearner;

  return (
    <>
      <Typography component="span" sx={proficiencySx}>
        {lang.proficiency}
      </Typography>
      <Typography component="span" sx={userLanguagesSx.languageName}>
        {lang.name}
      </Typography>
    </>
  );
}
