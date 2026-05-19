import * as React from "react";
import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdateUserMutation,
  useUserEditOptionsQuery,
} from "@/features/users/api/updateUser";
import {
  USER_PROFILE_AVATAR_MAX_BYTES,
  USER_PROFILE_AVATAR_SIZE_ERROR,
} from "@/features/users/constants/userProfile.constants";
import type { UserRow } from "@/features/users/types";
import {
  toProfileFormState,
  type AvatarUploadState,
  type ProfileFormState,
} from "@/features/users/types/userProfile.types";
import { formatMutationError } from "@/shared/utils/formatMutationError";

type UseUserProfileFormParams = {
  user: UserRow;
  canEditProfile: boolean;
  avatarUpload?: AvatarUploadState;
  onUpdated: () => Promise<unknown> | void;
};

export function useUserProfileForm({
  user,
  canEditProfile,
  avatarUpload,
  onUpdated,
}: UseUserProfileFormParams) {
  const initialForm = React.useMemo(() => toProfileFormState(user), [user]);
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

  const handleSubmit = React.useCallback(async () => {
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
      setSubmitError(formatMutationError(error));
    }
  }, [
    avatarUpload,
    canEditProfile,
    canSubmit,
    form.departmentId,
    form.firstName,
    form.lastName,
    form.positionId,
    initialForm.departmentId,
    initialForm.firstName,
    initialForm.lastName,
    initialForm.positionId,
    onUpdated,
    updateProfile,
    updateUser,
    uploadAvatar,
    user.avatarUrl,
    user.firstName,
    user.id,
    user.lastName,
  ]);

  return {
    form,
    submitError,
    canSubmit,
    isSubmitting,
    departmentOptions: optionsData?.departments ?? [],
    positionOptions: optionsData?.positions ?? [],
    handleFieldChange,
    handleSubmit,
  };
}
