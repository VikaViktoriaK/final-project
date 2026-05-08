import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { SidebarStub } from "@/features/users/components/SidebarStub";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { UserProfileHeader } from "@/features/users/components/user-profile/UserProfileHeader";
import { UserProfileForm } from "@/features/users/components/user-profile/UserProfileForm";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";

export function UserProfilePage() {
  return (
    <Box sx={userProfileSx.pageLayout}>
      <SidebarStub />
      <Box sx={userProfileSx.container}>
        <Breadcrumbs aria-label="breadcrumb" sx={userProfileSx.breadcrumbs}>
          <Typography component="span" sx={userProfileSx.breadcrumbLink}>
            Employees
          </Typography>
          <Typography component="span" sx={userProfileSx.breadcrumbActive}>
            Rostislav Harlanov
          </Typography>
        </Breadcrumbs>
        <UserProfileTabs />
        <UserProfileHeader />
        <UserProfileForm />
      </Box>
    </Box>
  );
}
