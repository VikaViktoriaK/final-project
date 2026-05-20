import * as React from "react";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import {
  compareLocaleStrings,
  normalizeSearchText,
  type SortOrder,
} from "@/lib/search";
import { useCrudFormDialog } from "@/lib/hooks/useCrudFormDialog";
import { useDeleteConfirm } from "@/lib/hooks/useDeleteConfirm";
import {
  useCreateLanguageMutation,
  useDeleteLanguageMutation,
  useLanguagesQuery,
  useUpdateLanguageMutation,
} from "../api/languages";
import type { LanguageFormValues } from "../types/languageForm.types";
import type { LanguageRow, LanguagesSortField } from "../types";

export type { LanguageFormValues };

export function useLanguagesPage() {
  const [query, setQuery] = React.useState("");
  const [orderBy, setOrderBy] = React.useState<LanguagesSortField>("name");
  const [order, setOrder] = React.useState<SortOrder>("asc");

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { languages, loading, error, refetch } = useLanguagesQuery();
  const [createLanguage, { loading: creating }] = useCreateLanguageMutation();
  const [updateLanguage, { loading: updating }] = useUpdateLanguageMutation();
  const [deleteLanguage, { loading: deleting }] = useDeleteLanguageMutation();

  const form = useCrudFormDialog<LanguageRow>();
  const deleteDialog = useDeleteConfirm<LanguageRow>();

  const handleSort = React.useCallback(
    (field: LanguagesSortField) => {
      if (field === orderBy) {
        setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setOrderBy(field);
        setOrder("asc");
      }
    },
    [orderBy],
  );

  const processedLanguages = React.useMemo(() => {
    const q = normalizeSearchText(query);
    const result = q
      ? languages.filter(
          (item) =>
            normalizeSearchText(item.name).includes(q) ||
            normalizeSearchText(item.nativeName).includes(q) ||
            normalizeSearchText(item.iso2).includes(q),
        )
      : [...languages];

    result.sort((a, b) => {
      let cmp = compareLocaleStrings(a.name, b.name);
      if (order === "desc") cmp = -cmp;
      return cmp;
    });

    return result;
  }, [languages, order, orderBy, query]);

  return {
    isAdmin,
    loading,
    error,
    query,
    setQuery,
    orderBy,
    order,
    handleSort,
    form,
    deleteDialog,
    processedLanguages,
    saving: creating || updating,
    deleting,
    handleFormSubmit: React.useCallback(
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
    ),
    handleDeleteConfirm: React.useCallback(async () => {
      if (!deleteDialog.target) return;
      await deleteLanguage({
        variables: {
          language: { languageId: deleteDialog.target.id },
        },
      });
      deleteDialog.close();
      deleteDialog.clearTarget();
      await refetch();
    }, [deleteDialog, deleteLanguage, refetch]),
  };
}
