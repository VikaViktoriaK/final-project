"use client";

import * as React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import NextLink from "next/link";
import { useParams, usePathname } from "next/navigation";
import { USER_PROFILE_TABS } from "@/features/users/constants/userProfile.constants";
import { userProfileSx } from "./userProfile.styles";

function profileHref(userId: string) {
  return `/users/${userId}/profile`;
}

function languagesHref(userId: string) {
  return `/users/${userId}/languages`;
}

export function UserProfileTabs() {
  const params = useParams<{ userId: string }>();
  const pathname = usePathname();
  const userId = params?.userId ?? "";

  const tabValue = React.useMemo(() => {
    if (!pathname || !userId) return 0;
    if (pathname.includes("/languages")) return 2;
    if (pathname.includes("/skills")) return 1;
    return 0;
  }, [pathname, userId]);

  if (!userId) {
    return (
      <Tabs value={0} sx={userProfileSx.tabs} aria-label="user profile tabs">
        {USER_PROFILE_TABS.map((tabLabel) => (
          <Tab
            key={tabLabel}
            label={tabLabel}
            sx={userProfileSx.tab}
            disabled
          />
        ))}
      </Tabs>
    );
  }

  return (
    <Tabs
      value={tabValue}
      sx={userProfileSx.tabs}
      aria-label="user profile tabs"
    >
      <Tab
        label={USER_PROFILE_TABS[0]}
        sx={userProfileSx.tab}
        component={NextLink}
        href={profileHref(userId)}
        scroll={false}
      />
      <Tab label={USER_PROFILE_TABS[1]} sx={userProfileSx.tab} disabled />
      <Tab
        label={USER_PROFILE_TABS[2]}
        sx={userProfileSx.tab}
        component={NextLink}
        href={languagesHref(userId)}
        scroll={false}
      />
    </Tabs>
  );
}
