"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserProfileForm } from "@/features/users/components/user-profile/UserProfileForm";
import { UserProfileHeader } from "@/features/users/components/user-profile/UserProfileHeader";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";
import { useUserProfileAvatar } from "@/features/users/hooks/useUserProfileAvatar";
import type { UserRow } from "@/features/users/types";

type UserProfileEditSectionProps = {
  user: UserRow;
  memberSinceText: string;
  canEditProfile: boolean;
  onUserUpdated: () => Promise<unknown>;
};

export function UserProfileEditSection({
  user,
  memberSinceText,
  canEditProfile,
  onUserUpdated,
}: UserProfileEditSectionProps) {
  const {
    avatarUpload,
    avatarActionError,
    isDeletingAvatar,
    canRemoveAvatar,
    removeAvatarButtonLabel,
    handleAvatarSelected,
    handleRemoveAvatar,
    clearAvatarUpload,
  } = useUserProfileAvatar({ user, canEditProfile, onUserUpdated });

  return (
    <>
      <Box sx={userProfileSx.editSection}>
        <UserProfileHeader
          user={user}
          memberSinceText={memberSinceText}
          canEditProfile={canEditProfile}
          avatarPreviewUrl={avatarUpload?.previewUrl}
          onAvatarSelected={handleAvatarSelected}
          onRemoveAvatar={handleRemoveAvatar}
          canRemoveAvatar={canRemoveAvatar}
          removeAvatarButtonLabel={removeAvatarButtonLabel}
          isRemovingAvatar={isDeletingAvatar}
        />
        {avatarActionError ? (
          <Typography
            sx={[userProfileSx.formError, { mt: 1, textAlign: "center" }]}
            role="alert"
          >
            {avatarActionError}
          </Typography>
        ) : null}
      </Box>
      <Box sx={userProfileSx.editSection}>
        <UserProfileForm
          key={`${user.id}:${user.firstName}:${user.lastName}:${user.departmentId ?? ""}:${user.positionId ?? ""}`}
          user={user}
          canEditProfile={canEditProfile}
          avatarUpload={avatarUpload}
          onUpdated={async () => {
            await onUserUpdated();
            clearAvatarUpload();
          }}
        />
      </Box>
    </>
  );
}
