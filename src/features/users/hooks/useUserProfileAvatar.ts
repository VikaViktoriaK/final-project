import * as React from "react";
import { useDeleteAvatarMutation } from "@/features/users/api/updateUser";
import {
  USER_PROFILE_DISCARD_AVATAR_SELECTION,
  USER_PROFILE_REMOVE_PROFILE_PHOTO,
} from "@/features/users/constants/userProfile.constants";
import type { UserRow } from "@/features/users/types";
import type { AvatarUploadState } from "@/features/users/types/userProfile.types";
import { formatMutationError } from "@/shared/utils/formatMutationError";

type UseUserProfileAvatarParams = {
  user: UserRow;
  canEditProfile: boolean;
  onUserUpdated: () => Promise<unknown>;
};

export function useUserProfileAvatar({
  user,
  canEditProfile,
  onUserUpdated,
}: UseUserProfileAvatarParams) {
  const [avatarUpload, setAvatarUpload] = React.useState<
    AvatarUploadState | undefined
  >(undefined);
  const [avatarActionError, setAvatarActionError] = React.useState<
    string | null
  >(null);
  const [deleteAvatar, { loading: isDeletingAvatar }] =
    useDeleteAvatarMutation();

  const handleAvatarSelected = React.useCallback((next: AvatarUploadState) => {
    setAvatarActionError(null);
    setAvatarUpload(next);
  }, []);

  const hasServerAvatar = Boolean(user.avatarUrl);
  const hasPendingAvatar = Boolean(avatarUpload);
  const canRemoveAvatar =
    canEditProfile && (hasPendingAvatar || hasServerAvatar);

  const removeAvatarButtonLabel = avatarUpload
    ? USER_PROFILE_DISCARD_AVATAR_SELECTION
    : USER_PROFILE_REMOVE_PROFILE_PHOTO;

  const handleRemoveAvatar = React.useCallback(async () => {
    setAvatarActionError(null);
    try {
      if (avatarUpload) {
        setAvatarUpload(undefined);
        return;
      }
      if (user.avatarUrl) {
        await deleteAvatar({
          variables: { avatar: { userId: user.id } },
        });
        await onUserUpdated();
      }
    } catch (error) {
      setAvatarActionError(formatMutationError(error));
    }
  }, [avatarUpload, deleteAvatar, onUserUpdated, user.avatarUrl, user.id]);

  const clearAvatarUpload = React.useCallback(() => {
    setAvatarUpload(undefined);
  }, []);

  return {
    avatarUpload,
    avatarActionError,
    isDeletingAvatar,
    canRemoveAvatar,
    removeAvatarButtonLabel,
    handleAvatarSelected,
    handleRemoveAvatar,
    clearAvatarUpload,
  };
}
