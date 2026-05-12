import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdateUserMutation,
  useUserEditOptionsQuery,
} from "@/features/users/api/updateUser";
import {
  USER_PROFILE_AVATAR_MAX_BYTES,
  USER_PROFILE_AVATAR_SIZE_ERROR,
  USER_PROFILE_FORM_LABELS,
} from "@/features/users/constants/userProfile.constants";
import type { UserRow } from "@/features/users/types";
import { userProfileSx } from "./userProfile.styles";

type UserProfileFormProps = {
  user: UserRow;
  canEditProfile: boolean;
  avatarUpload?: {
    previewUrl: string;
    base64: string;
    size: number;
    type: string;
  };
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

const MSG_AVATAR_UPLOAD_UNAVAILABLE =
  "We couldn’t save your photo. Please try again in a moment or use a smaller image. If this keeps happening, contact support.";

const MSG_AVATAR_CLOUDINARY =
  "Photo upload isn’t configured correctly on the server (missing or invalid cloud storage keys). Ask your administrator to set real API keys in the API environment, not placeholders like API_KEY.";

function firstGraphQLErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const e = error as {
    graphQLErrors?: ReadonlyArray<{ message?: string }>;
    networkError?: {
      result?: { errors?: ReadonlyArray<{ message?: string }> };
    };
  };
  const gql = e.graphQLErrors?.[0]?.message;
  if (typeof gql === "string" && gql.trim()) return gql.trim();
  const net = e.networkError?.result?.errors?.[0]?.message;
  if (typeof net === "string" && net.trim()) return net.trim();
  return null;
}

export function formatProfileSubmitError(error: unknown): string {
  const blob =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : error && typeof error === "object"
          ? (() => {
              try {
                return JSON.stringify(error);
              } catch {
                return String(error);
              }
            })()
          : String(error);

  if (
    blob.includes("ENAMETOOLONG") ||
    blob.includes('"errno":-36') ||
    blob.includes('"errno": -36') ||
    (blob.includes('"code":"ENAMETOOLONG"') && blob.includes('"path"'))
  ) {
    return MSG_AVATAR_UPLOAD_UNAVAILABLE;
  }

  if (
    blob.includes("Must supply api_key") ||
    blob.includes("cloudinary") ||
    blob.includes("Unknown API key") ||
    (blob.includes("http_code") &&
      blob.includes("401") &&
      blob.includes("API_KEY"))
  ) {
    return MSG_AVATAR_CLOUDINARY;
  }

  const gqlMsg = firstGraphQLErrorMessage(error);
  if (gqlMsg) {
    return gqlMsg;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  if (blob.trim() && blob.length < 500) {
    return blob;
  }
  return "Failed to update profile.";
}

export function UserProfileForm({
  user,
  canEditProfile,
  avatarUpload,
  onUpdated,
}: UserProfileFormProps) {
  const initialForm = React.useMemo(() => toFormState(user), [user]);
  const [form, setForm] = React.useState<ProfileFormState>(initialForm);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [updateProfile, { loading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [uploadAvatar, { loading: isUploadingAvatar }] =
    useUploadAvatarMutation();
  const [updateUser, { loading: isUpdatingUser }] = useUpdateUserMutation();
  const { data: optionsData } = useUserEditOptionsQuery();

  const isDirty =
    form.firstName !== initialForm.firstName ||
    form.lastName !== initialForm.lastName ||
    form.departmentId !== initialForm.departmentId ||
    form.positionId !== initialForm.positionId ||
    Boolean(avatarUpload && avatarUpload.previewUrl !== user.avatarUrl);

  const isSubmitting = isUpdatingProfile || isUpdatingUser || isUploadingAvatar;
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
      const avatarChanged = Boolean(
        avatarUpload && avatarUpload.previewUrl !== user.avatarUrl,
      );
      if (
        avatarChanged &&
        avatarUpload &&
        avatarUpload.size > USER_PROFILE_AVATAR_MAX_BYTES
      ) {
        setSubmitError(USER_PROFILE_AVATAR_SIZE_ERROR);
        return;
      }

      if (profileChanged || avatarChanged) {
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

      if (canEditProfile && avatarChanged && avatarUpload) {
        await uploadAvatar({
          variables: {
            avatar: {
              userId: user.id,
              base64: avatarUpload.base64,
              size: avatarUpload.size,
              type: avatarUpload.type,
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
      setSubmitError(formatProfileSubmitError(error));
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
