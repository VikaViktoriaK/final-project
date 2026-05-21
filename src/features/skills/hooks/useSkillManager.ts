"use client";

import { useMemo, useState } from "react";
import useActionFeedback from "@/hooks/use-action-feedback";
import useDialog from "@/hooks/use-dialog";
import type {
  SkillManagerCatalogSkill,
  SkillManagerCategory,
  SkillManagerGroup,
  SkillManagerItem,
  SkillManagerMutations,
} from "../types/skillManager.types";

type SkillManagerMessages = {
  addSuccess?: string;
  updateSuccess?: string;
  removeSuccess?: string;
  unavailableSkill?: string;
};

type UseSkillManagerParams<TMastery extends string> = {
  currentSkills: SkillManagerItem<TMastery>[];
  catalogSkills: SkillManagerCatalogSkill[];
  categories: SkillManagerCategory[];
  canEdit: boolean;
  loading: boolean;
  defaultMastery: TMastery;
  mutations: SkillManagerMutations<TMastery>;
  messages?: SkillManagerMessages;
};

function groupSkillsByCategory<TMastery extends string>(
  skills: SkillManagerItem<TMastery>[],
  categories: SkillManagerCategory[],
): SkillManagerGroup<TMastery>[] {
  const categoryMap = new Map<string, string>();
  for (const category of categories) {
    if (!category?.id) {
      continue;
    }
    const categoryLabel = category.parent?.name ?? category.name ?? "Other";
    categoryMap.set(category.id, categoryLabel);
    for (const child of category.children ?? []) {
      if (!child?.id) {
        continue;
      }
      categoryMap.set(child.id, category.name ?? categoryLabel);
    }
  }

  const groups = new Map<string, SkillManagerItem<TMastery>[]>();
  for (const skill of skills) {
    if (!skill?.name) {
      continue;
    }
    const label = skill.categoryId
      ? (categoryMap.get(skill.categoryId) ?? "Other")
      : "Other";
    groups.set(label, [...(groups.get(label) ?? []), skill]);
  }

  return Array.from(groups.entries()).map(([categoryLabel, items]) => ({
    categoryLabel,
    skills: items,
  }));
}

function useSkillManager<TMastery extends string>({
  currentSkills,
  catalogSkills,
  categories,
  canEdit,
  loading,
  defaultMastery,
  mutations,
  messages,
}: UseSkillManagerParams<TMastery>) {
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();
  const addDialog = useDialog();
  const editDialog = useDialog();
  const [editingSkill, setEditingSkill] =
    useState<SkillManagerItem<TMastery> | null>(null);
  const [removeMode, setRemoveMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [addSkillId, setAddSkillId] = useState("");
  const [addMastery, setAddMastery] = useState<TMastery>(defaultMastery);
  const [editMastery, setEditMastery] = useState<TMastery>(defaultMastery);

  const grouped = useMemo(
    () => groupSkillsByCategory(currentSkills, categories),
    [categories, currentSkills],
  );

  const availableSkills = useMemo(() => {
    const existingNames = new Set(
      currentSkills
        .map((skill) => skill?.name)
        .filter((name): name is string => Boolean(name)),
    );
    return catalogSkills.filter(
      (skill) => skill?.name && !existingNames.has(skill.name),
    );
  }, [catalogSkills, currentSkills]);

  const openAddDialog = () => {
    setAddSkillId("");
    setAddMastery(defaultMastery);
    addDialog.open();
  };

  const closeAddDialog = () => {
    setAddSkillId("");
    setAddMastery(defaultMastery);
    addDialog.close();
  };

  const openEditDialog = (skill: SkillManagerItem<TMastery>) => {
    setRemoveMode(false);
    setSelected([]);
    setEditingSkill(skill);
    setEditMastery(skill.mastery);
    editDialog.open();
  };

  const closeEditDialog = () => {
    setEditingSkill(null);
    setEditMastery(defaultMastery);
    editDialog.close();
  };

  const toggleSkill = (name: string) => {
    setSelected((previous) =>
      previous.includes(name)
        ? previous.filter((skillName) => skillName !== name)
        : [...previous, name],
    );
  };

  const enableRemoveMode = () => {
    setRemoveMode(true);
  };

  const cancelRemoveMode = () => {
    setRemoveMode(false);
    setSelected([]);
  };

  const submitAddSkill = async () => {
    const skill = availableSkills.find((item) => item.id === addSkillId);
    if (!skill) {
      showError(
        messages?.unavailableSkill ?? "Selected skill is no longer available",
      );
      return;
    }

    const result = await mutations.addSkill({
      name: skill.name,
      categoryId: skill.category?.id,
      mastery: addMastery,
    });

    if (result.ok) {
      showSuccess(messages?.addSuccess ?? "Skill added");
      closeAddDialog();
      return;
    }
    showError(result.message);
  };

  const submitUpdateSkill = async () => {
    if (!editingSkill) {
      return;
    }
    const result = await mutations.updateSkill({
      name: editingSkill.name,
      categoryId: editingSkill.categoryId,
      mastery: editMastery,
    });

    if (result.ok) {
      showSuccess(messages?.updateSuccess ?? "Skill updated");
      closeEditDialog();
      return;
    }
    showError(result.message);
  };

  const handleRemove = async () => {
    if (!selected.length) {
      return;
    }
    const result = await mutations.removeSkills(selected);
    if (result.ok) {
      showSuccess(messages?.removeSuccess ?? "Skills removed");
      setSelected([]);
      setRemoveMode(false);
      return;
    }
    showError(result.message);
  };

  return {
    grouped,
    isEmpty: currentSkills.length === 0,
    canEdit,
    removeMode,
    selected,
    mutating: loading,
    toggleSkill,
    openAddDialog,
    openEditDialog,
    enableRemoveMode,
    cancelRemoveMode,
    handleRemove,
    addDialog: {
      open: addDialog.isOpen,
      skills: availableSkills,
      loading,
      canSubmit: Boolean(addSkillId && addMastery),
      skillId: addSkillId,
      mastery: addMastery,
      onSkillChange: setAddSkillId,
      onMasteryChange: setAddMastery,
      onClose: closeAddDialog,
      onSubmit: submitAddSkill,
    },
    editDialog: {
      open: editDialog.isOpen,
      skillName: editingSkill?.name ?? "",
      loading,
      canSubmit: Boolean(editingSkill && editMastery !== editingSkill.mastery),
      mastery: editMastery,
      onMasteryChange: setEditMastery,
      onClose: closeEditDialog,
      onSubmit: submitUpdateSkill,
    },
    FeedbackSnackbar,
  };
}

export default useSkillManager;
