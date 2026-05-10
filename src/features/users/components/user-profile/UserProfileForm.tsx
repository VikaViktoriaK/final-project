import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useUserEditOptionsQuery,
} from "@/features/users/api/updateUser";
import { USER_PROFILE_FORM_LABELS } from "@/features/users/constants/userProfile.constants";
import type { UserRow } from "@/features/users/types";
import { userProfileSx } from "./userProfile.styles";

type UserProfileFormProps = {
  user: UserRow;
  canEditProfile: boolean;
  onUpdated: () => Promise<unknown> | void;
};

type ProfileFormState = {
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
};

function toFormState(user: UserRow): ProfileFormState {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    departmentId: user.departmentId ?? "",
    positionId: user.positionId ?? "",
  };
}

export function UserProfileForm({
  user,
  canEditProfile,
  onUpdated,
}: UserProfileFormProps) {
  const initialForm = React.useMemo(() => toFormState(user), [user]);
  const [form, setForm] = React.useState<ProfileFormState>(initialForm);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [updateProfile, { loading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [updateUser, { loading: isUpdatingUser }] = useUpdateUserMutation();
  const { data: optionsData } = useUserEditOptionsQuery();

  const isDirty =
    form.firstName !== initialForm.firstName ||
    form.lastName !== initialForm.lastName ||
    form.departmentId !== initialForm.departmentId ||
    form.positionId !== initialForm.positionId;

  const isSubmitting = isUpdatingProfile || isUpdatingUser;
  const canSubmit = canEditProfile && isDirty && !isSubmitting;

  const handleFieldChange =
    (field: keyof ProfileFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (submitError) setSubmitError(null);
    };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      const trimmedFirstName = form.firstName.trim();
      const trimmedLastName = form.lastName.trim();
      const profileChanged =
        trimmedFirstName !== initialForm.firstName.trim() ||
        trimmedLastName !== initialForm.lastName.trim();
      const adminPartChanged =
        form.departmentId !== initialForm.departmentId ||
        form.positionId !== initialForm.positionId;

      if (profileChanged) {
        await updateProfile({
          variables: {
            profile: {
              userId: user.id,
              first_name: trimmedFirstName || user.firstName,
              last_name: trimmedLastName || user.lastName,
            },
          },
        });
      }

      if (canEditProfile && adminPartChanged) {
        await updateUser({
          variables: {
            user: {
              userId: user.id,
              departmentId: form.departmentId || undefined,
              positionId: form.positionId || undefined,
            },
          },
        });
      }

      await onUpdated();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to update profile.",
      );
    }
  };

  const departmentOptions = optionsData?.departments ?? [];
  const positionOptions = optionsData?.positions ?? [];

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
            !canEditProfile ? userProfileSx.fieldReadOnly : undefined,
          ]}
        />
        <TextField
          label={USER_PROFILE_FORM_LABELS.lastName}
          value={form.lastName}
          onChange={handleFieldChange("lastName")}
          slotProps={{ htmlInput: { readOnly: !canEditProfile } }}
          sx={[
            userProfileSx.field,
            !canEditProfile ? userProfileSx.fieldReadOnly : undefined,
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
