import * as React from "react";
import { useParams } from "next/navigation";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useUserQuery } from "@/features/users/api/getUser";
import {
  useDeleteProfileSkillMutation,
  useProfileWithSkillsQuery,
  useSkillCategoriesQuery,
} from "@/features/users/api/userSkills";
import { formatMutationError } from "@/shared/utils/formatMutationError";
import {
  groupSkillsByCategory,
  skillRowKey,
} from "@/features/users/components/user-profile/userSkills.utils";
import type { UserSkill } from "@/features/users/types/userSkills.types";
import { useBulkSelection } from "@/lib/hooks/useBulkSelection";

export function useUserSkillsPage() {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { user, loading: userLoading, error: userError } = useUserQuery(userId);
  const { userId: currentUserId, role } = useAuthSnapshot();

  const [addOpen, setAddOpen] = React.useState(false);
  const [skillToEdit, setSkillToEdit] = React.useState<UserSkill | null>(null);

  const bulk = useBulkSelection<UserSkill>(skillRowKey);
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

  const isAdmin = role === "Admin";
  const canManageSkills =
    Boolean(user) &&
    Boolean(currentUserId) &&
    (isAdmin || currentUserId === userId);

  const profileSkills = React.useMemo(
    () => skillsData?.profile?.skills ?? [],
    [skillsData?.profile?.skills],
  );

  const categories = React.useMemo(
    () => groupSkillsByCategory(profileSkills, skillCategories),
    [profileSkills, skillCategories],
  );

  const breadcrumbName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";

  const hasSkills = categories.some((category) => category.skills.length > 0);
  const loading = userLoading || skillsLoading || categoriesLoading;
  const errorMessage = userError?.message ?? skillsQueryError?.message ?? null;

  const handleBulkRemoveConfirm = React.useCallback(async () => {
    bulk.setError(null);
    bulk.setSubmitting(true);
    try {
      const names = profileSkills
        .filter((row) => bulk.selectedKeys.has(skillRowKey(row)))
        .map((row) => row.name);
      if (names.length === 0) {
        bulk.exitRemoveMode();
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
      bulk.exitRemoveMode();
    } catch (err) {
      bulk.setError(formatMutationError(err));
    } finally {
      bulk.setSubmitting(false);
    }
  }, [bulk, deleteSkill, profileSkills, refetchSkills, userId]);

  const openAddDialog = React.useCallback(() => {
    setAddOpen(true);
  }, []);

  const closeAddDialog = React.useCallback(() => {
    setAddOpen(false);
  }, []);

  const startRemoveMode = React.useCallback(() => {
    setSkillToEdit(null);
    bulk.startRemoveMode();
  }, [bulk]);

  const openBulkConfirm = React.useCallback(() => {
    bulk.setError(null);
    bulk.setConfirmOpen(true);
  }, [bulk]);

  const closeBulkConfirm = React.useCallback(() => {
    bulk.setConfirmOpen(false);
    bulk.setError(null);
  }, [bulk]);

  const handleSkillClick = React.useCallback(
    (skill: UserSkill) => {
      if (bulk.removeMode) {
        bulk.toggleSelected(skill);
      } else {
        setSkillToEdit(skill);
      }
    },
    [bulk],
  );

  const closeEditDialog = React.useCallback(() => {
    setSkillToEdit(null);
  }, []);

  return {
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
  };
}
