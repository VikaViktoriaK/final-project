"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { USER_PROFILE_TABS } from "@/features/users/constants/userProfile.constants";
import { userProfileSx } from "./userProfile.styles";

export function UserProfileTabs() {
  return (
    <Tabs value={0} sx={userProfileSx.tabs} aria-label="user profile tabs">
      {USER_PROFILE_TABS.map((tabLabel) => (
        <Tab key={tabLabel} label={tabLabel} sx={userProfileSx.tab} />
      ))}
    </Tabs>
  );
}
