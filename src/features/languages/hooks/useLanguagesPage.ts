import * as React from "react";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useCrudFormDialog } from "@/lib/hooks/useCrudFormDialog";
import { useDeleteConfirm } from "@/lib/hooks/useDeleteConfirm";
import { useSearchSort } from "@/lib/hooks/useSearchSort";
import {
  useCreateLanguageMutation,
  useDeleteLanguageMutation,
  useLanguagesQuery,
  useUpdateLanguageMutation,
} from "../api/languages";
import type { LanguageFormValues } from "../types/languageForm.types";
import type { LanguageRow } from "../types";

export type { LanguageFormValues };

export function useLanguagesPage() {
  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { languages, loading, error, refetch } = useLanguagesQuery();
  const [createLanguage, { loading: creating }] = useCreateLanguageMutation();
  const [updateLanguage, { loading: updating }] = useUpdateLanguageMutation();
  const [deleteLanguage, { loading: deleting }] = useDeleteLanguageMutation();

  const form = useCrudFormDialog<LanguageRow>();
  const deleteDialog = useDeleteConfirm<LanguageRow>();
  const search = useSearchSort(languages, (item) => item.name);

  const handleFormSubmit = React.useCallback(
    async (values: LanguageFormValues) => {
      const payload = {
        name: values.name,
        native_name: values.nativeName,
        iso2: values.iso2,
      };

      if (form.mode === "create") {
        await createLanguage({ variables: { language: payload } });
      } else if (form.item) {
        await updateLanguage({
          variables: {
            language: { languageId: form.item.id, ...payload },
          },
        });
      }
      await refetch();
    },
    [createLanguage, form.item, form.mode, refetch, updateLanguage],
  );

  const handleDeleteConfirm = React.useCallback(async () => {
    if (!deleteDialog.target) return;
    await deleteLanguage({
      variables: {
        language: { languageId: deleteDialog.target.id },
      },
    });
    deleteDialog.close();
    deleteDialog.clearTarget();
    await refetch();
  }, [deleteDialog, deleteLanguage, refetch]);

  return {
    isAdmin,
    loading,
    error,
    search,
    form,
    deleteDialog,
    processedLanguages: search.processed,
    saving: creating || updating,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  };
}
