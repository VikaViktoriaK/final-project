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
import { SidebarStub } from "@/features/users/components/SidebarStub";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { UserProfileHeader } from "@/features/users/components/user-profile/UserProfileHeader";
import { UserProfileForm } from "@/features/users/components/user-profile/UserProfileForm";
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

  return (
    <>
      <Box sx={userProfileSx.editSection}>
        <UserProfileHeader
          user={user}
          memberSinceText={memberSinceText}
          canEditProfile={canEditProfile}
          avatarPreviewUrl={avatarUpload?.previewUrl}
          onAvatarSelected={setAvatarUpload}
        />
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
    <Box sx={userProfileSx.pageLayout}>
      <SidebarStub />
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
    </Box>
  );
}
