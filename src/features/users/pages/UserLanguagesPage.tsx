"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
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
import { useProfileWithLanguagesQuery } from "@/features/users/api/userLanguages";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { isNativeProficiency } from "@/features/users/components/user-profile/userLanguages.utils";

const SNACKBAR_NOT_IMPLEMENTED = "This action is not available yet.";

export function UserLanguagesPage() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { userId: authUserId } = useAuthSnapshot();

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    if (authUserId === null) {
      router.replace("/login");
    }
  }, [authUserId, router]);

  const graphQlEnabled = Boolean(userId && authUserId);

  const { data, loading, error } = useProfileWithLanguagesQuery(
    userId,
    graphQlEnabled,
  );

  const displayName = React.useMemo(() => {
    const p = data?.profile;
    if (!p) return "User";
    const full = `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim();
    return full || "User";
  }, [data?.profile]);

  const languages = data?.profile?.languages ?? [];
  const errorMessage = error?.message ?? null;

  const handleAddLanguage = () => {
    setSnackbarOpen(true);
  };

  const handleRemoveLanguages = () => {
    setSnackbarOpen(true);
  };

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
                  >
                    {languages.map((lang) => (
                      <Box
                        component="li"
                        key={`${lang.name}:${lang.proficiency}`}
                        sx={userLanguagesSx.languageEntry}
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
                      </Box>
                    ))}
                  </Box>
                )}
                <Box sx={userLanguagesSx.actionsRow}>
                  <Button
                    type="button"
                    variant="text"
                    startIcon={<AddIcon />}
                    sx={userLanguagesSx.addLanguageBtn}
                    onClick={handleAddLanguage}
                  >
                    Add language
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    sx={userLanguagesSx.removeLanguagesBtn}
                    onClick={handleRemoveLanguages}
                  >
                    Remove languages
                  </Button>
                </Box>
              </Box>
            ) : null}
          </>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={SNACKBAR_NOT_IMPLEMENTED}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
