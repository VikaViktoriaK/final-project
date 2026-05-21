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

type SkillsPageMutationHandlers = {
  createSkill: (values: SkillFormValues) => Promise<void>;
  updateSkill: (skill: SkillRow, values: SkillFormValues) => Promise<void>;
  deleteSkill: (skill: SkillRow) => Promise<void>;
};

type UseSkillsPageTemplateParams = {
  skills: SkillRow[];
  categories: ReturnType<typeof useSkillsCatalogQuery>["categories"];
  loading: boolean;
  error: ReturnType<typeof useSkillsCatalogQuery>["error"];
  saving: boolean;
  deleting: boolean;
  mutations: SkillsPageMutationHandlers;
  afterMutation: () => Promise<void>;
};

function useSkillsPageTemplate({
  skills,
  categories,
  loading,
  error,
  saving,
  deleting,
  mutations,
  afterMutation,
}: UseSkillsPageTemplateParams) {
  const [query, setQuery] = React.useState("");
  const [orderBy, setOrderBy] = React.useState<SkillsSortField>("name");
  const [order, setOrder] = React.useState<SortOrder>("asc");

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

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
        await mutations.createSkill(values);
      } else if (form.item) {
        await mutations.updateSkill(form.item, values);
      }
      await afterMutation();
    },
    [afterMutation, form.item, form.mode, mutations],
  );

  const handleDeleteConfirm = React.useCallback(async () => {
    if (!deleteDialog.target) return;
    await mutations.deleteSkill(deleteDialog.target);
    deleteDialog.close();
    deleteDialog.clearTarget();
    await afterMutation();
  }, [afterMutation, deleteDialog, mutations]);

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
    saving,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  };
}

export function useSkillsPage() {
  const { skills, categories, loading, error, refetch } =
    useSkillsCatalogQuery();
  const [createSkill, { loading: creating }] = useCreateSkillMutation();
  const [updateSkill, { loading: updating }] = useUpdateSkillMutation();
  const [deleteSkill, { loading: deleting }] = useDeleteSkillMutation();

  const mutations = React.useMemo<SkillsPageMutationHandlers>(
    () => ({
      createSkill: async (values) => {
        await createSkill({ variables: { skill: values } });
      },
      updateSkill: async (skill, values) => {
        await updateSkill({
          variables: {
            skill: {
              skillId: skill.id,
              name: values.name,
              categoryId: values.categoryId,
            },
          },
        });
      },
      deleteSkill: async (skill) => {
        await deleteSkill({
          variables: { skill: { skillId: skill.id } },
        });
      },
    }),
    [createSkill, deleteSkill, updateSkill],
  );

  return useSkillsPageTemplate({
    skills,
    categories,
    loading,
    error,
    saving: creating || updating,
    deleting,
    mutations,
    afterMutation: refetch,
  });
}
