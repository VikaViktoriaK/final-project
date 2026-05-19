import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useUserQuery } from "@/features/users/api/getUser";
import {
  useDeleteProfileLanguageMutation,
  useProfileWithLanguagesQuery,
} from "@/features/users/api/userLanguages";
import { formatProfileSubmitError } from "@/features/users/components/user-profile/UserProfileForm";
import { languageRowKey } from "@/features/users/components/user-profile/userLanguages.utils";
import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";
import { useBulkSelection } from "@/lib/hooks/useBulkSelection";

export function useUserLanguagesPage() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { userId: authUserId, role } = useAuthSnapshot();

  const [addOpen, setAddOpen] = React.useState(false);
  const [languageToEdit, setLanguageToEdit] =
    React.useState<UserLanguageRow | null>(null);

  const bulk = useBulkSelection<UserLanguageRow>(languageRowKey);
  const [deleteLanguage] = useDeleteProfileLanguageMutation();

  React.useEffect(() => {
    if (authUserId === null) {
      router.replace("/login");
    }
  }, [authUserId, router]);

  const graphQlEnabled = Boolean(userId && authUserId);

  const { user, loading: userLoading, error: userError } = useUserQuery(userId);
  const {
    data,
    loading: languagesLoading,
    error: languagesError,
    refetch,
  } = useProfileWithLanguagesQuery(userId, graphQlEnabled);

  const isAdmin = role === "Admin";
  const canManageLanguages =
    Boolean(authUserId) && (isAdmin || authUserId === userId);

  const breadcrumbName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";

  const languages = React.useMemo(
    () => data?.profile?.languages ?? [],
    [data?.profile?.languages],
  );

  const errorMessage = userError?.message ?? languagesError?.message ?? null;
  const loading = userLoading || (graphQlEnabled && languagesLoading);
  const authPending = authUserId === null;

  const handleBulkRemoveConfirm = React.useCallback(async () => {
    bulk.setError(null);
    bulk.setSubmitting(true);
    try {
      const rows = languages.filter((l) =>
        bulk.selectedKeys.has(languageRowKey(l)),
      );
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
      bulk.exitRemoveMode();
    } catch (err) {
      bulk.setError(formatProfileSubmitError(err));
    } finally {
      bulk.setSubmitting(false);
    }
  }, [bulk, deleteLanguage, languages, refetch, userId]);

  const openAddDialog = React.useCallback(() => {
    setAddOpen(true);
  }, []);

  const closeAddDialog = React.useCallback(() => {
    setAddOpen(false);
  }, []);

  const startRemoveMode = React.useCallback(() => {
    setLanguageToEdit(null);
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

  const handleLanguageClick = React.useCallback(
    (lang: UserLanguageRow) => {
      if (bulk.removeMode) {
        bulk.toggleSelected(lang);
      } else {
        setLanguageToEdit(lang);
      }
    },
    [bulk],
  );

  const closeEditDialog = React.useCallback(() => {
    setLanguageToEdit(null);
  }, []);

  return {
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
  };
}
