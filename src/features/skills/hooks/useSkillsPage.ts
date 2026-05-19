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
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useSkillsCatalogQuery,
  useUpdateSkillMutation,
} from "../api/skills";
import type { SkillFormValues } from "../types/skillForm.types";
import type { SkillRow, SkillsSortField } from "../types";

export type { SkillFormValues };

export function useSkillsPage() {
  const [query, setQuery] = React.useState("");
  const [orderBy, setOrderBy] = React.useState<SkillsSortField>("name");
  const [order, setOrder] = React.useState<SortOrder>("asc");

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { skills, categories, loading, error, refetch } =
    useSkillsCatalogQuery();
  const [createSkill, { loading: creating }] = useCreateSkillMutation();
  const [updateSkill, { loading: updating }] = useUpdateSkillMutation();
  const [deleteSkill, { loading: deleting }] = useDeleteSkillMutation();

  const form = useCrudFormDialog<SkillRow>();
  const deleteDialog = useDeleteConfirm<SkillRow>();

  const handleSort = React.useCallback(
    (field: SkillsSortField) => {
      if (field === orderBy) {
        setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setOrderBy(field);
        setOrder("asc");
      }
    },
    [orderBy],
  );

  const processedSkills = React.useMemo(() => {
    const q = normalizeSearchText(query);
    const result = q
      ? skills.filter((item) => normalizeSearchText(item.name).includes(q))
      : [...skills];

    result.sort((a, b) => {
      const compareName = () => compareLocaleStrings(a.name, b.name);
      const compareCategory = () =>
        compareLocaleStrings(a.categoryName, b.categoryName);

      let cmp =
        orderBy === "name" ? compareName() : compareCategory() || compareName();

      if (order === "desc") cmp = -cmp;
      return cmp;
    });

    return result;
  }, [order, orderBy, query, skills]);

  const handleFormSubmit = React.useCallback(
    async (values: SkillFormValues) => {
      if (form.mode === "create") {
        await createSkill({ variables: { skill: values } });
      } else if (form.item) {
        await updateSkill({
          variables: {
            skill: {
              skillId: form.item.id,
              name: values.name,
              categoryId: values.categoryId,
            },
          },
        });
      }
      await refetch();
    },
    [createSkill, form.item, form.mode, refetch, updateSkill],
  );

  const handleDeleteConfirm = React.useCallback(async () => {
    if (!deleteDialog.target) return;
    await deleteSkill({
      variables: { skill: { skillId: deleteDialog.target.id } },
    });
    deleteDialog.close();
    deleteDialog.clearTarget();
    await refetch();
  }, [deleteDialog, deleteSkill, refetch]);

  return {
    isAdmin,
    loading,
    error,
    query,
    setQuery,
    orderBy,
    setOrderBy,
    order,
    setOrder,
    handleSort,
    form,
    deleteDialog,
    categories,
    processedSkills,
    saving: creating || updating,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  };
}
