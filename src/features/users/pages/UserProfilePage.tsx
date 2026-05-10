"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { PageLoader } from "@/components/PageLoader";
import { useUsersQuery } from "@/features/users/api/getUsers";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { SidebarStub } from "@/features/users/components/SidebarStub";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { UserProfileHeader } from "@/features/users/components/user-profile/UserProfileHeader";
import { UserProfileForm } from "@/features/users/components/user-profile/UserProfileForm";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";

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

export function UserProfilePage() {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { users, loading, error, refetch } = useUsersQuery();
  const { userId: currentUserId, role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const user = users.find((item) => item.id === userId);
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
          <Box sx={userProfileSx.editSection}>
            <UserProfileHeader user={user} memberSinceText={memberSinceText} />
          </Box>
        ) : null}
        {!loading && !error && user ? (
          <Box sx={userProfileSx.editSection}>
            <UserProfileForm
              key={`${user.id}:${user.firstName}:${user.lastName}:${user.departmentId ?? ""}:${user.positionId ?? ""}`}
              user={user}
              canEditProfile={canEditProfile}
              onUpdated={refetch}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
