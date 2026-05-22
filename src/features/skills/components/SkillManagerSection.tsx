"use client";

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { ReactNode } from "react";
import type {
  SkillManagerGroup,
  SkillManagerItem,
} from "../types/skillManager.types";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";

type SkillManagerSectionProps<TSkill extends SkillManagerItem> = {
  grouped: SkillManagerGroup<TSkill["mastery"]>[];
  isEmpty: boolean;
  canEdit: boolean;
  removeMode: boolean;
  selected: string[];
  mutating: boolean;
  onOpenAdd: () => void;
  onEnableRemove: () => void;
  onCancelRemove: () => void;
  onRemove: () => void;
  renderSkill: (params: {
    skill: TSkill;
    removeMode: boolean;
    editable: boolean;
    selected: boolean;
  }) => ReactNode;
};

function DeleteSkillsButton({
  selectedCount,
  mutating,
  onDelete,
}: {
  selectedCount: number;
  mutating: boolean;
  onDelete: () => void;
}) {
  const hasSelection = selectedCount > 0;

  return (
    <Button
      type="button"
      onClick={onDelete}
      disabled={!hasSelection || mutating}
      sx={[
        cvsStyles.skillRemoveDeleteButton,
        hasSelection && cvsStyles.skillRemoveDeleteButtonActive,
      ]}
    >
      <Box component="span" sx={cvsStyles.skillRemoveDeleteLabel}>
        <Box component="span">Delete</Box>
        <Box
          component="span"
          sx={[
            cvsStyles.skillRemoveDeleteBadge,
            !hasSelection && cvsStyles.skillRemoveDeleteBadgeHidden,
          ]}
          aria-hidden={!hasSelection}
        >
          {selectedCount}
        </Box>
      </Box>
    </Button>
  );
}

function SkillManagerSection<TSkill extends SkillManagerItem>({
  grouped,
  isEmpty,
  canEdit,
  removeMode,
  selected,
  mutating,
  onOpenAdd,
  onEnableRemove,
  onCancelRemove,
  onRemove,
  renderSkill,
}: SkillManagerSectionProps<TSkill>) {
  if (isEmpty) {
    return canEdit ? (
      <Box sx={cvsStyles.skillsSectionEmpty}>
        <Button
          type="button"
          onClick={onOpenAdd}
          sx={cvsStyles.addSkillEmptyButton}
          data-testid="add-skill-button"
        >
          + Add skill
        </Button>
      </Box>
    ) : (
      <Typography sx={cvsStyles.emptyState}>No skills added yet.</Typography>
    );
  }

  return (
    <Box
      sx={[
        cvsStyles.skillsSection,
        removeMode && cvsStyles.skillsSectionRemove,
      ]}
    >
      <Box sx={cvsStyles.skillsList}>
        {grouped.map((group) => (
          <Box key={group.categoryLabel} sx={cvsStyles.skillCategoryBlock}>
            <Box component="p" sx={cvsStyles.skillCategoryTitle}>
              {group.categoryLabel}
            </Box>
            <Box sx={cvsStyles.skillsGrid}>
              {group.skills.map((skill) => (
                <Box
                  component="span"
                  key={skill.name}
                  sx={cvsStyles.skillListItem}
                >
                  {renderSkill({
                    skill: skill as TSkill,
                    removeMode,
                    editable: canEdit && !removeMode,
                    selected: selected.includes(skill.name),
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {canEdit && removeMode && (
        <Box sx={cvsStyles.skillRemoveActions}>
          <Button
            type="button"
            onClick={onCancelRemove}
            disabled={mutating}
            sx={cvsStyles.skillRemoveCancelButton}
          >
            Cancel
          </Button>
          <DeleteSkillsButton
            selectedCount={selected.length}
            mutating={mutating}
            onDelete={onRemove}
          />
        </Box>
      )}

      {canEdit && !removeMode && (
        <Box sx={cvsStyles.skillActions}>
          <Button
            type="button"
            startIcon={<AddIcon />}
            onClick={onOpenAdd}
            sx={cvsStyles.textActionLight}
            data-testid="add-skill-button"
          >
            Add skill
          </Button>
          <Button
            type="button"
            startIcon={<DeleteOutlineIcon />}
            onClick={onEnableRemove}
            sx={cvsStyles.textActionPrimary}
          >
            Remove skills
          </Button>
        </Box>
      )}
    </Box>
  );
}

export type { SkillManagerSectionProps };
export { SkillManagerSection };
