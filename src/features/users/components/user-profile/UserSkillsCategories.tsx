"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserSkillCard } from "@/features/users/components/user-profile/UserSkillCard";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";
import { userSkillsSx } from "@/features/users/components/user-profile/userSkills.styles";
import {
  CONFIRM_BULK_REMOVE_SKILLS_LABELS,
  USER_SKILLS_ADD_LABEL,
  USER_SKILLS_REMOVE_LABEL,
} from "@/features/users/constants/userSkills.constants";
import type {
  UserSkill,
  UserSkillCategory,
} from "@/features/users/types/userSkills.types";
import { skillRowKey } from "@/features/users/components/user-profile/userSkills.utils";

export type UserSkillsCategoriesProps = {
  categories: UserSkillCategory[];
  canManage: boolean;
  hasSkills: boolean;
  removeMode: boolean;
  selectedKeys: Set<string>;
  selectedCount: number;
  onSkillClick: (skill: UserSkill) => void;
  onAdd: () => void;
  onStartRemove: () => void;
  onExitRemove: () => void;
  onOpenBulkConfirm: () => void;
};

export function UserSkillsCategories({
  categories,
  canManage,
  hasSkills,
  removeMode,
  selectedKeys,
  selectedCount,
  onSkillClick,
  onAdd,
  onStartRemove,
  onExitRemove,
  onOpenBulkConfirm,
}: UserSkillsCategoriesProps) {
  return (
    <Box sx={userSkillsSx.mainColumn}>
      <Box sx={userSkillsSx.categoriesStack}>
        {categories.length === 0 ? (
          <Typography sx={userSkillsSx.emptyState}>
            No skills listed yet.
          </Typography>
        ) : (
          categories.map((category) => (
            <Box
              key={category.id}
              component="section"
              aria-labelledby={`skill-category-${category.id}`}
              sx={userSkillsSx.categoryBlock}
            >
              <Typography
                id={`skill-category-${category.id}`}
                component="h2"
                sx={userSkillsSx.categoryTitle}
              >
                {category.title}
              </Typography>
              <Box
                component="ul"
                sx={userSkillsSx.skillsGrid}
                aria-label={category.title}
                aria-multiselectable={removeMode ? true : undefined}
              >
                {category.skills.map((skill) => (
                  <Box
                    component="li"
                    key={skill.id}
                    sx={userSkillsSx.skillListItem}
                  >
                    <UserSkillCard
                      skill={skill}
                      disabled={!canManage}
                      selected={
                        removeMode && selectedKeys.has(skillRowKey(skill))
                      }
                      onClick={
                        canManage ? () => onSkillClick(skill) : undefined
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          ))
        )}
      </Box>
      {canManage ? (
        <Box sx={userSkillsSx.actionsRow}>
          {removeMode ? (
            <>
              <Button
                type="button"
                variant="outlined"
                onClick={onExitRemove}
                sx={userLanguagesSx.dialogCancelBtn}
              >
                {CONFIRM_BULK_REMOVE_SKILLS_LABELS.cancel}
              </Button>
              <Button
                type="button"
                variant="contained"
                disableElevation
                disabled={selectedCount === 0}
                onClick={onOpenBulkConfirm}
                sx={userSkillsSx.bulkDeleteToolbarBtn}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1.25,
                  }}
                >
                  <Box component="span">
                    {CONFIRM_BULK_REMOVE_SKILLS_LABELS.delete}
                  </Box>
                  <Box component="span" sx={userSkillsSx.bulkDeleteCountBadge}>
                    {selectedCount}
                  </Box>
                </Box>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="text"
                startIcon={<AddIcon />}
                sx={userSkillsSx.addSkillBtn}
                onClick={onAdd}
              >
                {USER_SKILLS_ADD_LABEL}
              </Button>
              <Button
                type="button"
                variant="text"
                startIcon={<DeleteIcon />}
                sx={userSkillsSx.removeSkillsBtn}
                disabled={!hasSkills}
                onClick={onStartRemove}
              >
                {USER_SKILLS_REMOVE_LABEL}
              </Button>
            </>
          )}
        </Box>
      ) : null}
    </Box>
  );
}
