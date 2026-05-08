"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { PageLoader } from "@/components/PageLoader";
import { useUsersQuery } from "@/features/users/api/getUsers";
import { SidebarStub } from "@/features/users/components/SidebarStub";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { UserProfileHeader } from "@/features/users/components/user-profile/UserProfileHeader";
import { UserProfileForm } from "@/features/users/components/user-profile/UserProfileForm";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";

export function UserProfilePage() {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { users, loading, error } = useUsersQuery();

  const user = users.find((item) => item.id === userId);
  const breadcrumbName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";

  return (
    <Box sx={userProfileSx.pageLayout}>
      <SidebarStub />
      <Box sx={userProfileSx.container}>
        <Breadcrumbs aria-label="breadcrumb" sx={userProfileSx.breadcrumbs}>
          <Typography component="span" sx={userProfileSx.breadcrumbLink}>
            Employees
          </Typography>
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
        {!loading && !error && user ? <UserProfileHeader user={user} /> : null}
        {!loading && !error && user ? <UserProfileForm user={user} /> : null}
      </Box>
    </Box>
  );
}
