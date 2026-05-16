"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { PageLoader } from "@/components/PageLoader";
import { useUserQuery } from "@/features/users/api/getUser";
import {
  useDeleteProfileSkillMutation,
  useProfileWithSkillsQuery,
  useSkillCategoriesQuery,
} from "@/features/users/api/userSkills";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { UserProfileTabs } from "@/features/users/components/user-profile/UserProfileTabs";
import { UserSkillCard } from "@/features/users/components/user-profile/UserSkillCard";
import {
  AddUserSkillDialog,
  ConfirmBulkRemoveSkillsDialog,
  UpdateUserSkillDialog,
} from "@/features/users/components/user-profile/UserSkillDialogs";
import {
  groupSkillsByCategory,
  skillRowKey,
} from "@/features/users/components/user-profile/userSkills.utils";
import { formatProfileSubmitError } from "@/features/users/components/user-profile/UserProfileForm";
import { userProfileSx } from "@/features/users/components/user-profile/userProfile.styles";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import { userSkillsSx } from "@/features/users/components/user-profile/userSkills.styles";
import {
  CONFIRM_BULK_REMOVE_SKILLS_LABELS,
  MOCK_USER_SKILL_CATEGORIES,
  USER_SKILLS_ADD_LABEL,
  USER_SKILLS_REMOVE_LABEL,
} from "@/features/users/constants/userSkills.constants";
import type { UserSkill } from "@/features/users/types/userSkills.types";

export function UserSkillsPage() {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { user, loading: userLoading, error: userError } = useUserQuery(userId);
  const { userId: currentUserId, role } = useAuthSnapshot();
  const isAdmin = role === "Admin";
  const canManageSkills =
    Boolean(user) &&
    Boolean(currentUserId) &&
    (isAdmin || currentUserId === userId);

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
  const [skillToEdit, setSkillToEdit] = React.useState<UserSkill | null>(null);

  const graphQlEnabled = Boolean(userId && currentUserId);

  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsQueryError,
    refetch: refetchSkills,
  } = useProfileWithSkillsQuery(userId, graphQlEnabled);

  const { categories: skillCategories, loading: categoriesLoading } =
    useSkillCategoriesQuery(graphQlEnabled);
  const [deleteSkill] = useDeleteProfileSkillMutation();

  const profileSkills = React.useMemo(
    () => skillsData?.profile?.skills ?? [],
    [skillsData?.profile?.skills],
  );

  const categories = React.useMemo(() => {
    if (profileSkills.length > 0) {
      return groupSkillsByCategory(profileSkills, skillCategories);
    }
    if (skillsQueryError) {
      return MOCK_USER_SKILL_CATEGORIES;
    }
    return [];
  }, [profileSkills, skillCategories, skillsQueryError]);

  const breadcrumbName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";

  const hasSkills = categories.some((category) => category.skills.length > 0);
  const loading = userLoading || skillsLoading || categoriesLoading;
  const errorMessage = userError?.message ?? null;

  const exitRemoveMode = React.useCallback(() => {
    setRemoveMode(false);
    setSelectedKeys(new Set());
    setConfirmBulkRemoveOpen(false);
    setBulkRemoveError(null);
  }, []);

  const toggleSelected = React.useCallback((skill: UserSkill) => {
    const key = skillRowKey(skill);
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
      const names = profileSkills
        .filter((row) => selectedKeys.has(skillRowKey(row)))
        .map((row) => row.name);
      if (names.length === 0) {
        exitRemoveMode();
        return;
      }
      await deleteSkill({
        variables: {
          skill: {
            userId,
            name: names,
          },
        },
      });
      await refetchSkills();
      exitRemoveMode();
    } catch (err) {
      setBulkRemoveError(formatProfileSubmitError(err));
    } finally {
      setBulkRemoveSubmitting(false);
    }
  }, [
    deleteSkill,
    exitRemoveMode,
    profileSkills,
    refetchSkills,
    selectedKeys,
    userId,
  ]);

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
        <Box sx={userSkillsSx.mainColumn}>
          <Box sx={userSkillsSx.categoriesStack}>
            {categories.length === 0 ? (
              <Typography sx={userSkillsSx.emptyState}>
                No skills listed yet.
              </Typography>
            ) : (
              categories.map((category) => (
                <Box
                  key={category.id}
                  component="section"
                  aria-labelledby={`skill-category-${category.id}`}
                  sx={userSkillsSx.categoryBlock}
                >
                  <Typography
                    id={`skill-category-${category.id}`}
                    component="h2"
                    sx={userSkillsSx.categoryTitle}
                  >
                    {category.title}
                  </Typography>
                  <Box
                    component="ul"
                    sx={userSkillsSx.skillsGrid}
                    aria-label={category.title}
                    aria-multiselectable={removeMode ? true : undefined}
                  >
                    {category.skills.map((skill) => (
                      <Box
                        component="li"
                        key={skill.id}
                        sx={userSkillsSx.skillListItem}
                      >
                        <UserSkillCard
                          skill={skill}
                          disabled={!canManageSkills}
                          selected={
                            removeMode && selectedKeys.has(skillRowKey(skill))
                          }
                          onClick={
                            canManageSkills
                              ? () => {
                                  if (removeMode) {
                                    toggleSelected(skill);
                                  } else {
                                    setSkillToEdit(skill);
                                  }
                                }
                              : undefined
                          }
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))
            )}
          </Box>
          {canManageSkills ? (
            <Box sx={userSkillsSx.actionsRow}>
              {removeMode ? (
                <>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={exitRemoveMode}
                    sx={userLanguagesSx.dialogCancelBtn}
                  >
                    {CONFIRM_BULK_REMOVE_SKILLS_LABELS.cancel}
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
                    sx={userSkillsSx.bulkDeleteToolbarBtn}
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
                        {CONFIRM_BULK_REMOVE_SKILLS_LABELS.delete}
                      </Box>
                      <Box
                        component="span"
                        sx={userSkillsSx.bulkDeleteCountBadge}
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
                    sx={userSkillsSx.addSkillBtn}
                    onClick={() => setAddOpen(true)}
                  >
                    {USER_SKILLS_ADD_LABEL}
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    sx={userSkillsSx.removeSkillsBtn}
                    disabled={!hasSkills}
                    onClick={() => {
                      setSkillToEdit(null);
                      setRemoveMode(true);
                      setSelectedKeys(new Set());
                    }}
                  >
                    {USER_SKILLS_REMOVE_LABEL}
                  </Button>
                </>
              )}
            </Box>
          ) : null}
        </Box>
      ) : null}
      {canManageSkills ? (
        <>
          <AddUserSkillDialog
            open={addOpen}
            onClose={() => setAddOpen(false)}
            userId={userId}
            currentSkills={profileSkills}
            onCompleted={() => refetchSkills()}
          />
          <UpdateUserSkillDialog
            open={skillToEdit !== null && !removeMode}
            onClose={() => setSkillToEdit(null)}
            userId={userId}
            skill={skillToEdit}
            onCompleted={() => refetchSkills()}
          />
          <ConfirmBulkRemoveSkillsDialog
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
        </>
      ) : null}
    </Box>
  );
}
