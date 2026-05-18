"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useCvContext } from "../context/cv-context";
import useActionFeedback from "./shared/use-action-feedback";
import useDialog from "./shared/use-dialog";
import { useCvSkillCatalog, useCvSkillMutations } from "./use-cv-mutations";
import { addSkillSchema, type AddSkillFormValues } from "../schemas";
import { groupSkillsByCategory } from "../utils/group-skills";

function useCvSkillsPage() {
  const { cv, cvId, canEdit } = useCvContext();
  const { categories, allSkills } = useCvSkillCatalog();
  const {
    addCvSkill,
    removeCvSkills,
    loading: mutating,
  } = useCvSkillMutations(cvId);
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();

  const addDialog = useDialog();
  const [removeMode, setRemoveMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const addForm = useForm<AddSkillFormValues>({
    resolver: zodResolver(addSkillSchema),
    defaultValues: { skillId: "", mastery: "Competent" },
  });

  const grouped = useMemo(
    () => (cv ? groupSkillsByCategory(cv.skills, categories) : []),
    [cv, categories],
  );

  const availableSkills = useMemo(() => {
    const existingNames = new Set(cv?.skills.map((skill) => skill.name) ?? []);
    return allSkills.filter((skill) => !existingNames.has(skill.name));
  }, [allSkills, cv?.skills]);

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
    addForm.reset();
    addDialog.close();
  };

  const submitAddSkill = addForm.handleSubmit(async (values) => {
    const skill = availableSkills.find((item) => item.id === values.skillId);
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

  const addDialogView = {
    open: addDialog.isOpen,
    skills: availableSkills,
    loading: mutating,
    form: addForm,
    onClose: closeAddDialog,
    onSubmit: submitAddSkill,
  };

  return {
    cv,
    grouped,
    canEdit,
    removeMode,
    selected,
    mutating,
    toggleSkill,
    openAddDialog,
    enableRemoveMode,
    cancelRemoveMode,
    handleRemove,
    addDialog: addDialogView,
    FeedbackSnackbar,
  };
}

export default useCvSkillsPage;
