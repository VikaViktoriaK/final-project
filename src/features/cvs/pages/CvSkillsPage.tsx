"use client";

import CvSkillRow from "../components/skills/CvSkillRow";
import useCvSkillsPage from "../skills/hooks/use-cv-skills-page";
import { MASTERY_LEVELS } from "../skills/constants/mastery-levels";
import type { SkillMastery } from "../types";
import { SkillManagerSection } from "@/features/skills/components/SkillManagerSection";
import { SkillMutationDialogs } from "@/features/skills/components/SkillMutationDialogs";

function CvSkillsPage() {
  const page = useCvSkillsPage();

  return (
    <>
      <SkillManagerSection<SkillMastery>
        grouped={page.grouped}
        isEmpty={page.isEmpty}
        canEdit={page.canEdit}
        removeMode={page.removeMode}
        selected={page.selected}
        mutating={page.mutating}
        onOpenAdd={page.openAddDialog}
        onEnableRemove={page.enableRemoveMode}
        onCancelRemove={page.cancelRemoveMode}
        onRemove={page.handleRemove}
        renderSkill={({ skill, removeMode, editable, selected }) => (
          <CvSkillRow
            key={skill.name}
            skill={skill}
            removeMode={removeMode}
            editable={editable}
            selected={selected}
            onToggle={page.toggleSkill}
            onEdit={page.openEditDialog}
          />
        )}
      />
      <SkillMutationDialogs
        masteryLevels={MASTERY_LEVELS}
        addDialog={page.addDialog}
        editDialog={page.editDialog}
      />
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvSkillsPage;
