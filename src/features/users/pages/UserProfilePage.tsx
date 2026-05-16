"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { PageLoader } from "@/components/PageLoader";
import { useUserQuery } from "@/features/users/api/getUser";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { UserProfileHeader } from "@/features/users/components/user-profile/UserProfileHeader";
import {
  UserProfileForm,
  formatProfileSubmitError,
} from "@/features/users/components/user-profile/UserProfileForm";
import { useDeleteAvatarMutation } from "@/features/users/api/updateUser";
import {
  USER_PROFILE_DISCARD_AVATAR_SELECTION,
  USER_PROFILE_REMOVE_PROFILE_PHOTO,
} from "@/features/users/constants/userProfile.constants";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";
import type { UserRow } from "@/features/users/types";

function formatMemberSince(createdAt?: string) {
  if (!createdAt) return "A memmer sinse -";
  const timestamp = Number(createdAt);
  const date = Number.isNaN(timestamp)
    ? new Date(createdAt)
    : new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "A memmer sinse -";
  return `A memmer sinse ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })}`;
}

type AvatarUploadState = {
  previewUrl: string;
  base64: string;
  size: number;
  type: string;
};

function UserProfileEditSection({
  user,
  memberSinceText,
  canEditProfile,
  onUserUpdated,
}: {
  user: UserRow;
  memberSinceText: string;
  canEditProfile: boolean;
  onUserUpdated: () => Promise<unknown>;
}) {
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

  const handleRemoveAvatar = async () => {
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
      setAvatarActionError(formatProfileSubmitError(error));
    }
  };

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
            setAvatarUpload(undefined);
          }}
        />
      </Box>
    </>
  );
}

export function UserProfilePage() {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { user, loading, error, refetch } = useUserQuery(userId);
  const { userId: currentUserId, role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const breadcrumbName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";
  const memberSinceText = formatMemberSince(user?.createdAt);
  const canEditProfile = Boolean(
    user && (isAdmin || currentUserId === user.id),
  );

  return (
    <Box sx={userProfileSx.container}>
      <Breadcrumbs aria-label="breadcrumb" sx={userProfileSx.breadcrumbs}>
        <Link
          component={NextLink}
          href="/users"
          underline="hover"
          sx={userProfileSx.breadcrumbLink}
        >
          Employees
        </Link>
        <Typography component="span" sx={userProfileSx.breadcrumbActive}>
          {breadcrumbName}
        </Typography>
      </Breadcrumbs>
      <UserProfileTabs />
      {loading ? <PageLoader /> : null}
      {!loading && error ? (
        <Typography color="error.main">Failed to load user data.</Typography>
      ) : null}
      {!loading && !error && !user ? (
        <Typography sx={userProfileSx.email}>User not found.</Typography>
      ) : null}
      {!loading && !error && user ? (
        <UserProfileEditSection
          key={`${user.id}:${user.avatarUrl ?? ""}`}
          user={user}
          memberSinceText={memberSinceText}
          canEditProfile={canEditProfile}
          onUserUpdated={refetch}
        />
      ) : null}
    </Box>
  );
}
