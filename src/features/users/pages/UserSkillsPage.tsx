"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { PageLoader } from "@/components/PageLoader";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { UserSkillsCategories } from "@/features/users/components/user-profile/UserSkillsCategories";
import {
  AddUserSkillDialog,
  ConfirmBulkRemoveSkillsDialog,
  UpdateUserSkillDialog,
} from "@/features/users/components/user-profile/UserSkillDialogs";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";
import { useUserSkillsPage } from "@/features/users/hooks/useUserSkillsPage";

export function UserSkillsPage() {
  const {
    userId,
    user,
    breadcrumbName,
    categories,
    profileSkills,
    hasSkills,
    loading,
    errorMessage,
    canManageSkills,
    addOpen,
    openAddDialog,
    closeAddDialog,
    skillToEdit,
    closeEditDialog,
    handleSkillClick,
    refetchSkills,
    bulk,
    startRemoveMode,
    openBulkConfirm,
    closeBulkConfirm,
    handleBulkRemoveConfirm,
  } = useUserSkillsPage();

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
      {!loading && errorMessage ? (
        <Typography color="error.main">{errorMessage}</Typography>
      ) : null}
      {!loading && !errorMessage && !user ? (
        <Typography sx={userProfileSx.email}>User not found.</Typography>
      ) : null}
      {!loading && !errorMessage && user ? (
        <UserSkillsCategories
          categories={categories}
          canManage={canManageSkills}
          hasSkills={hasSkills}
          removeMode={bulk.removeMode}
          selectedKeys={bulk.selectedKeys}
          selectedCount={bulk.selectedCount}
          onSkillClick={handleSkillClick}
          onAdd={openAddDialog}
          onStartRemove={startRemoveMode}
          onExitRemove={bulk.exitRemoveMode}
          onOpenBulkConfirm={openBulkConfirm}
        />
      ) : null}
      {canManageSkills ? (
        <>
          <AddUserSkillDialog
            open={addOpen}
            onClose={closeAddDialog}
            userId={userId}
            currentSkills={profileSkills}
            onCompleted={() => refetchSkills()}
          />
          <UpdateUserSkillDialog
            open={skillToEdit !== null && !bulk.removeMode}
            onClose={closeEditDialog}
            userId={userId}
            skill={skillToEdit}
            onCompleted={() => refetchSkills()}
          />
          <ConfirmBulkRemoveSkillsDialog
            open={bulk.confirmOpen}
            selectedCount={bulk.selectedCount}
            onClose={closeBulkConfirm}
            onConfirm={handleBulkRemoveConfirm}
            submitting={bulk.submitting}
            errorMessage={bulk.error}
          />
        </>
      ) : null}
    </Box>
  );
}
