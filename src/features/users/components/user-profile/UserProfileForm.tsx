"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { USER_PROFILE_FORM_LABELS } from "@/features/users/constants/userProfile.constants";
import { useUserProfileForm } from "@/features/users/hooks/useUserProfileForm";
import type { UserRow } from "@/features/users/types";
import type { AvatarUploadState } from "@/features/users/types/userProfile.types";
import { userProfileSx } from "./userProfile.styles";

export { formatProfileSubmitError } from "@/features/users/utils/graphqlErrors";

type UserProfileFormProps = {
  user: UserRow;
  canEditProfile: boolean;
  avatarUpload?: AvatarUploadState;
  onUpdated: () => Promise<unknown> | void;
};

export function UserProfileForm({
  user,
  canEditProfile,
  avatarUpload,
  onUpdated,
}: UserProfileFormProps) {
  const {
    form,
    submitError,
    canSubmit,
    departmentOptions,
    positionOptions,
    handleFieldChange,
    handleSubmit,
  } = useUserProfileForm({ user, canEditProfile, avatarUpload, onUpdated });

  return (
    <>
      <Box sx={userProfileSx.formGrid}>
        <TextField
          label={USER_PROFILE_FORM_LABELS.firstName}
          value={form.firstName}
          onChange={handleFieldChange("firstName")}
          slotProps={{ htmlInput: { readOnly: !canEditProfile } }}
          sx={[
            userProfileSx.field,
            !canEditProfile ? userProfileSx.fieldReadOnly : {},
          ]}
        />
        <TextField
          label={USER_PROFILE_FORM_LABELS.lastName}
          value={form.lastName}
          onChange={handleFieldChange("lastName")}
          slotProps={{ htmlInput: { readOnly: !canEditProfile } }}
          sx={[
            userProfileSx.field,
            !canEditProfile ? userProfileSx.fieldReadOnly : {},
          ]}
        />
        {canEditProfile ? (
          <TextField
            select
            label={USER_PROFILE_FORM_LABELS.department}
            value={form.departmentId}
            onChange={handleFieldChange("departmentId")}
            sx={userProfileSx.field}
          >
            {departmentOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            label={USER_PROFILE_FORM_LABELS.department}
            value={user.department}
            slotProps={{ htmlInput: { readOnly: true } }}
            sx={[userProfileSx.field, userProfileSx.fieldReadOnly]}
          />
        )}
        {canEditProfile ? (
          <TextField
            select
            label={USER_PROFILE_FORM_LABELS.position}
            value={form.positionId}
            onChange={handleFieldChange("positionId")}
            sx={userProfileSx.field}
          >
            {positionOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            label={USER_PROFILE_FORM_LABELS.position}
            value={user.position}
            slotProps={{ htmlInput: { readOnly: true } }}
            sx={[userProfileSx.field, userProfileSx.fieldReadOnly]}
          />
        )}
      </Box>
      {submitError ? (
        <Typography sx={userProfileSx.formError}>{submitError}</Typography>
      ) : null}
      <Box sx={userProfileSx.updateBtnWrap}>
        <Button
          variant="contained"
          disabled={!canSubmit}
          onClick={() => void handleSubmit()}
          sx={[
            userProfileSx.updateBtn,
            canSubmit
              ? userProfileSx.updateBtnActive
              : userProfileSx.updateBtnDisabled,
          ]}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
