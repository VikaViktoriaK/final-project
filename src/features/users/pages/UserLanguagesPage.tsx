"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { PageLoader } from "@/components/PageLoader";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { UserLanguagesList } from "@/features/users/components/user-profile/UserLanguagesList";
import {
  AddUserLanguageDialog,
  ConfirmBulkRemoveLanguagesDialog,
  UpdateUserLanguageDialog,
} from "@/features/users/components/user-profile/UserLanguageDialogs";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";
import { userProfileLanguagesSx } from "@/features/users/components/user-profile/userProfileLanguages.styles";
import { useUserLanguagesPage } from "@/features/users/hooks/useUserLanguagesPage";

export function UserLanguagesPage() {
  const {
    userId,
    authPending,
    user,
    breadcrumbName,
    languages,
    loading,
    errorMessage,
    canManageLanguages,
    addOpen,
    openAddDialog,
    closeAddDialog,
    languageToEdit,
    closeEditDialog,
    handleLanguageClick,
    refetch,
    bulk,
    startRemoveMode,
    openBulkConfirm,
    closeBulkConfirm,
    handleBulkRemoveConfirm,
  } = useUserLanguagesPage();

  if (authPending) {
    return <PageLoader />;
  }

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
        <Typography sx={userProfileLanguagesSx.errorText}>
          {errorMessage}
        </Typography>
      ) : null}
      {!loading && !errorMessage && !user ? (
        <Typography sx={userProfileSx.email}>User not found.</Typography>
      ) : null}
      {!loading && !errorMessage && user ? (
        <UserLanguagesList
          languages={languages}
          canManage={canManageLanguages}
          removeMode={bulk.removeMode}
          selectedKeys={bulk.selectedKeys}
          selectedCount={bulk.selectedCount}
          onLanguageClick={handleLanguageClick}
          onAdd={openAddDialog}
          onStartRemove={startRemoveMode}
          onExitRemove={bulk.exitRemoveMode}
          onOpenBulkConfirm={openBulkConfirm}
        />
      ) : null}
      {canManageLanguages ? (
        <>
          <AddUserLanguageDialog
            open={addOpen}
            onClose={closeAddDialog}
            userId={userId}
            currentLanguages={languages}
            onCompleted={() => refetch()}
          />
          <ConfirmBulkRemoveLanguagesDialog
            open={bulk.confirmOpen}
            selectedCount={bulk.selectedCount}
            onClose={closeBulkConfirm}
            onConfirm={handleBulkRemoveConfirm}
            submitting={bulk.submitting}
            errorMessage={bulk.error}
          />
          <UpdateUserLanguageDialog
            open={languageToEdit !== null && !bulk.removeMode}
            onClose={closeEditDialog}
            userId={userId}
            language={languageToEdit}
            onCompleted={() => refetch()}
          />
        </>
      ) : null}
    </Box>
  );
}
