"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useCvContext } from "../context/cv-context";
import useActionFeedback from "./shared/use-action-feedback";
import useDialog from "./shared/use-dialog";
import { useCvSkillCatalog, useCvSkillMutations } from "./use-cv-mutations";
import {
  addSkillSchema,
  updateSkillSchema,
  type AddSkillFormValues,
  type UpdateSkillFormValues,
} from "../schemas";
import type { SkillMastery } from "../types";
import { groupSkillsByCategory } from "../utils/group-skills";

function useCvSkillsPage() {
  const { cv, cvId, canEdit } = useCvContext();
  const { categories, allSkills } = useCvSkillCatalog();
  const {
    addCvSkill,
    updateCvSkill,
    removeCvSkills,
    loading: mutating,
  } = useCvSkillMutations(cvId);
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();

  const addDialog = useDialog();
  const editDialog = useDialog();
  const [editingSkill, setEditingSkill] = useState<SkillMastery | null>(null);
  const [removeMode, setRemoveMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const addForm = useForm<AddSkillFormValues>({
    resolver: zodResolver(addSkillSchema),
    mode: "onChange",
    defaultValues: { skillId: "", mastery: "Competent" },
  });

  const editForm = useForm<UpdateSkillFormValues>({
    resolver: zodResolver(updateSkillSchema),
    mode: "onChange",
    defaultValues: { mastery: "Competent" },
  });

  const grouped = useMemo(
    () => (cv ? groupSkillsByCategory(cv.skills, categories) : []),
    [cv, categories],
  );

  const isEmpty = !(cv?.skills?.length ?? 0);

  const availableSkills = useMemo(() => {
    const existingNames = new Set(
      (cv?.skills ?? [])
        .map((skill) => skill?.name)
        .filter((name): name is string => Boolean(name)),
    );
    return allSkills.filter(
      (skill) => skill?.name && !existingNames.has(skill.name),
    );
  }, [allSkills, cv?.skills]);

  const selectedSkillId = useWatch({
    control: addForm.control,
    name: "skillId",
  });

  useEffect(() => {
    if (!addDialog.isOpen || !selectedSkillId) {
      return;
    }
    const allowedIds = new Set(availableSkills.map((skill) => skill.id));
    if (!allowedIds.has(String(selectedSkillId))) {
      addForm.setValue("skillId", "", { shouldValidate: true });
    }
  }, [addDialog.isOpen, availableSkills, selectedSkillId, addForm]);

  const toggleSkill = (name: string) => {
    setSelected((previous) =>
      previous.includes(name)
        ? previous.filter((skillName) => skillName !== name)
        : [...previous, name],
    );
  };

  const openAddDialog = () => {
    addForm.reset({ skillId: "", mastery: "Competent" });
    addDialog.open();
  };

  const closeAddDialog = () => {
    addForm.reset({ skillId: "", mastery: "Competent" });
    addDialog.close();
  };

  const openEditDialog = (skill: SkillMastery) => {
    setRemoveMode(false);
    setSelected([]);
    setEditingSkill(skill);
    editForm.reset({ mastery: skill.mastery });
    editDialog.open();
  };

  const closeEditDialog = () => {
    setEditingSkill(null);
    editForm.reset({ mastery: "Competent" });
    editDialog.close();
  };

  const submitAddSkill = addForm.handleSubmit(async (values) => {
    const skill = availableSkills.find(
      (item) => item.id === String(values.skillId),
    );
    if (!skill) {
      showError("Selected skill is no longer available");
      return;
    }

    const result = await addCvSkill({
      name: skill.name,
      categoryId: skill.category?.id,
      mastery: values.mastery,
    });

    if (result.ok) {
      showSuccess("Skill added");
      closeAddDialog();
      return;
    }
    showError(result.message);
  });

  const submitUpdateSkill = editForm.handleSubmit(async (values) => {
    if (!editingSkill) {
      return;
    }

    const result = await updateCvSkill({
      name: editingSkill.name,
      categoryId: editingSkill.categoryId,
      mastery: values.mastery,
    });

    if (result.ok) {
      showSuccess("Skill updated");
      closeEditDialog();
      return;
    }
    showError(result.message);
  });

  const enableRemoveMode = () => {
    setRemoveMode(true);
  };

  const cancelRemoveMode = () => {
    setRemoveMode(false);
    setSelected([]);
  };

  const handleRemove = async () => {
    if (!selected.length) {
      return;
    }
    const result = await removeCvSkills(selected);
    if (result.ok) {
      showSuccess("Skills removed");
      setSelected([]);
      setRemoveMode(false);
      return;
    }
    showError(result.message);
  };

  const addCanSubmit = addForm.formState.isValid;
  const editCanSubmit =
    editForm.formState.isDirty && editForm.formState.isValid;

  return {
    cv,
    grouped,
    isEmpty,
    canEdit,
    removeMode,
    selected,
    mutating,
    toggleSkill,
    openAddDialog,
    openEditDialog,
    enableRemoveMode,
    cancelRemoveMode,
    handleRemove,
    addDialog: {
      open: addDialog.isOpen,
      skills: availableSkills,
      loading: mutating,
      canSubmit: addCanSubmit,
      form: addForm,
      onClose: closeAddDialog,
      onSubmit: submitAddSkill,
    },
    editDialog: {
      open: editDialog.isOpen,
      skillName: editingSkill?.name ?? "",
      loading: mutating,
      canSubmit: editCanSubmit,
      form: editForm,
      onClose: closeEditDialog,
      onSubmit: submitUpdateSkill,
    },
    FeedbackSnackbar,
  };
}

export default useCvSkillsPage;
