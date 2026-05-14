"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { PageLoader } from "@/components/PageLoader";
import { SidebarStub } from "@/features/users/components/SidebarStub";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import {
  useDeleteProfileLanguageMutation,
  useProfileWithLanguagesQuery,
} from "@/features/users/api/userLanguages";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import {
  isNativeProficiency,
  languageRowKey,
} from "@/features/users/components/user-profile/userLanguages.utils";
import {
  AddUserLanguageDialog,
  ConfirmBulkRemoveLanguagesDialog,
  UpdateUserLanguageDialog,
} from "@/features/users/components/user-profile/UserLanguageDialogs";
import { formatProfileSubmitError } from "@/features/users/components/user-profile/UserProfileForm";
import { CONFIRM_BULK_REMOVE_LANGUAGES_LABELS } from "@/features/users/constants/userLanguages.constants";
import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";

export function UserLanguagesPage() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { userId: authUserId, role } = useAuthSnapshot();

  const [addOpen, setAddOpen] = React.useState(false);
  const [removeMode, setRemoveMode] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(
    () => new Set<string>(),
  );
  const [confirmBulkRemoveOpen, setConfirmBulkRemoveOpen] =
    React.useState(false);
  const [bulkRemoveError, setBulkRemoveError] = React.useState<string | null>(
    null,
  );
  const [bulkRemoveSubmitting, setBulkRemoveSubmitting] = React.useState(false);
  const [languageToEdit, setLanguageToEdit] =
    React.useState<UserLanguageRow | null>(null);

  const [deleteLanguage] = useDeleteProfileLanguageMutation();

  React.useEffect(() => {
    if (authUserId === null) {
      router.replace("/login");
    }
  }, [authUserId, router]);

  const graphQlEnabled = Boolean(userId && authUserId);

  const { data, loading, error, refetch } = useProfileWithLanguagesQuery(
    userId,
    graphQlEnabled,
  );

  const isAdmin = role === "Admin";
  const canManageLanguages =
    Boolean(authUserId) && (isAdmin || authUserId === userId);

  const displayName = React.useMemo(() => {
    const p = data?.profile;
    if (!p) return "User";
    const full = `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim();
    return full || "User";
  }, [data?.profile]);

  const languages = data?.profile?.languages ?? [];
  const errorMessage = error?.message ?? null;

  const exitRemoveMode = React.useCallback(() => {
    setRemoveMode(false);
    setSelectedKeys(new Set());
    setConfirmBulkRemoveOpen(false);
    setBulkRemoveError(null);
  }, []);

  const toggleSelected = React.useCallback((lang: UserLanguageRow) => {
    const key = languageRowKey(lang);
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const selectedCount = selectedKeys.size;

  const handleBulkRemoveConfirm = React.useCallback(async () => {
    setBulkRemoveError(null);
    setBulkRemoveSubmitting(true);
    try {
      const rows = languages.filter((l) => selectedKeys.has(languageRowKey(l)));
      const uniqueNames = [...new Set(rows.map((r) => r.name))];
      for (const name of uniqueNames) {
        await deleteLanguage({
          variables: {
            language: {
              userId,
              name,
            },
          },
        });
      }
      await refetch();
      exitRemoveMode();
    } catch (err) {
      setBulkRemoveError(formatProfileSubmitError(err));
    } finally {
      setBulkRemoveSubmitting(false);
    }
  }, [
    deleteLanguage,
    exitRemoveMode,
    languages,
    refetch,
    selectedKeys,
    userId,
  ]);

  return (
    <Box sx={userProfileSx.pageLayout}>
      <SidebarStub />
      <Box sx={userProfileSx.container}>
        {authUserId === null ? (
          <PageLoader />
        ) : (
          <>
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
                {displayName}
              </Typography>
            </Breadcrumbs>
            <UserProfileTabs />
            {loading ? <PageLoader /> : null}
            {!loading && errorMessage ? (
              <Typography sx={userLanguagesSx.errorText}>
                {errorMessage}
              </Typography>
            ) : null}
            {!loading && !errorMessage ? (
              <Box sx={userLanguagesSx.mainColumn}>
                <Typography component="h2" sx={userLanguagesSx.sectionTitle}>
                  Languages
                </Typography>
                {languages.length === 0 ? (
                  <Typography sx={userLanguagesSx.emptyState}>
                    No languages listed yet.
                  </Typography>
                ) : (
                  <Box
                    component="ul"
                    sx={userLanguagesSx.languagesRow}
                    aria-label="User languages"
                    aria-multiselectable={removeMode ? true : undefined}
                  >
                    {languages.map((lang) => (
                      <Box
                        component="li"
                        key={languageRowKey(lang)}
                        sx={userLanguagesSx.languageListItem}
                      >
                        {canManageLanguages ? (
                          <ButtonBase
                            type="button"
                            focusRipple
                            sx={[
                              userLanguagesSx.languageEntryClickable,
                              removeMode &&
                              selectedKeys.has(languageRowKey(lang))
                                ? userLanguagesSx.languageEntryClickableSelected
                                : null,
                            ]}
                            aria-pressed={
                              removeMode
                                ? selectedKeys.has(languageRowKey(lang))
                                : undefined
                            }
                            onClick={() => {
                              if (removeMode) {
                                toggleSelected(lang);
                              } else {
                                setLanguageToEdit(lang);
                              }
                            }}
                          >
                            <Typography
                              component="span"
                              sx={
                                isNativeProficiency(lang.proficiency)
                                  ? userLanguagesSx.proficiencyNative
                                  : userLanguagesSx.proficiencyLearner
                              }
                            >
                              {lang.proficiency}
                            </Typography>
                            <Typography
                              component="span"
                              sx={userLanguagesSx.languageName}
                            >
                              {lang.name}
                            </Typography>
                          </ButtonBase>
                        ) : (
                          <Box sx={userLanguagesSx.languageEntryStatic}>
                            <Typography
                              component="span"
                              sx={
                                isNativeProficiency(lang.proficiency)
                                  ? userLanguagesSx.proficiencyNative
                                  : userLanguagesSx.proficiencyLearner
                              }
                            >
                              {lang.proficiency}
                            </Typography>
                            <Typography
                              component="span"
                              sx={userLanguagesSx.languageName}
                            >
                              {lang.name}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
                {canManageLanguages ? (
                  <Box sx={userLanguagesSx.actionsRow}>
                    {removeMode ? (
                      <>
                        <Button
                          type="button"
                          variant="outlined"
                          onClick={exitRemoveMode}
                          sx={userLanguagesSx.dialogCancelBtn}
                        >
                          {CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.cancel}
                        </Button>
                        <Button
                          type="button"
                          variant="contained"
                          disableElevation
                          disabled={selectedCount === 0}
                          onClick={() => {
                            setBulkRemoveError(null);
                            setConfirmBulkRemoveOpen(true);
                          }}
                          sx={userLanguagesSx.bulkDeleteToolbarBtn}
                        >
                          <Box
                            component="span"
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 1.25,
                            }}
                          >
                            <Box component="span">
                              {CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.delete}
                            </Box>
                            <Box
                              component="span"
                              sx={userLanguagesSx.bulkDeleteCountBadge}
                            >
                              {selectedCount}
                            </Box>
                          </Box>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="button"
                          variant="text"
                          startIcon={<AddIcon />}
                          sx={userLanguagesSx.addLanguageBtn}
                          onClick={() => {
                            setAddOpen(true);
                          }}
                        >
                          Add language
                        </Button>
                        <Button
                          type="button"
                          variant="text"
                          startIcon={<DeleteIcon />}
                          sx={userLanguagesSx.removeLanguagesBtn}
                          disabled={languages.length === 0}
                          onClick={() => {
                            setLanguageToEdit(null);
                            setRemoveMode(true);
                            setSelectedKeys(new Set());
                          }}
                        >
                          Remove languages
                        </Button>
                      </>
                    )}
                  </Box>
                ) : null}
              </Box>
            ) : null}
          </>
        )}
      </Box>
      {canManageLanguages ? (
        <>
          <AddUserLanguageDialog
            open={addOpen}
            onClose={() => setAddOpen(false)}
            userId={userId}
            currentLanguages={languages}
            onCompleted={() => refetch()}
          />
          <ConfirmBulkRemoveLanguagesDialog
            open={confirmBulkRemoveOpen}
            selectedCount={selectedCount}
            onClose={() => {
              setConfirmBulkRemoveOpen(false);
              setBulkRemoveError(null);
            }}
            onConfirm={handleBulkRemoveConfirm}
            submitting={bulkRemoveSubmitting}
            errorMessage={bulkRemoveError}
          />
          <UpdateUserLanguageDialog
            open={languageToEdit !== null && !removeMode}
            onClose={() => setLanguageToEdit(null)}
            userId={userId}
            language={languageToEdit}
            onCompleted={() => refetch()}
          />
        </>
      ) : null}
    </Box>
  );
}
