"use client";

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CvSkillRow from "./cv-skill-row";
import { AddSkillDialog, UpdateSkillDialog } from "./add-skill-dialog";
import useCvSkillsPage from "../hooks/use-cv-skills-page";
import { cvsStyles } from "../styles/cvs.styles";

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

function CvSkillsPage() {
  const page = useCvSkillsPage();

  if (page.isEmpty) {
    return (
      <>
        {page.canEdit ? (
          <Box sx={cvsStyles.skillsSectionEmpty}>
            <Button
              type="button"
              onClick={page.openAddDialog}
              sx={cvsStyles.addSkillEmptyButton}
            >
              + Add skill
            </Button>
          </Box>
        ) : (
          <Typography sx={cvsStyles.emptyState}>
            No skills added yet.
          </Typography>
        )}
        <AddSkillDialog
          open={page.addDialog.open}
          skills={page.addDialog.skills}
          loading={page.addDialog.loading}
          canSubmit={page.addDialog.canSubmit}
          control={page.addDialog.form.control}
          errors={page.addDialog.form.formState.errors}
          onClose={page.addDialog.onClose}
          onSubmit={page.addDialog.onSubmit}
        />
        <UpdateSkillDialog
          open={page.editDialog.open}
          skillName={page.editDialog.skillName}
          loading={page.editDialog.loading}
          canSubmit={page.editDialog.canSubmit}
          control={page.editDialog.form.control}
          errors={page.editDialog.form.formState.errors}
          onClose={page.editDialog.onClose}
          onSubmit={page.editDialog.onSubmit}
        />
        {page.FeedbackSnackbar}
      </>
    );
  }

  return (
    <>
      <Box
        sx={[
          cvsStyles.skillsSection,
          page.removeMode && cvsStyles.skillsSectionRemove,
        ]}
      >
        <Box sx={cvsStyles.skillsList}>
          {page.grouped.map((group) => (
            <Box key={group.categoryLabel}>
              <Box component="p" sx={cvsStyles.skillCategoryTitle}>
                {group.categoryLabel}
              </Box>
              <Box sx={cvsStyles.skillsGrid}>
                {group.skills.map((skill) => (
                  <CvSkillRow
                    key={skill.name}
                    skill={skill}
                    removeMode={page.removeMode}
                    editable={page.canEdit && !page.removeMode}
                    selected={page.selected.includes(skill.name)}
                    onToggle={page.toggleSkill}
                    onEdit={page.openEditDialog}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {page.canEdit && page.removeMode && (
          <Box sx={cvsStyles.skillRemoveActions}>
            <Button
              type="button"
              onClick={page.cancelRemoveMode}
              disabled={page.mutating}
              sx={cvsStyles.skillRemoveCancelButton}
            >
              Cancel
            </Button>
            <DeleteSkillsButton
              selectedCount={page.selected.length}
              mutating={page.mutating}
              onDelete={page.handleRemove}
            />
          </Box>
        )}

        {page.canEdit && !page.removeMode && (
          <Box sx={cvsStyles.skillActions}>
            <Button
              type="button"
              startIcon={<AddIcon />}
              onClick={page.openAddDialog}
              sx={cvsStyles.textActionLight}
            >
              Add skill
            </Button>
            <Button
              type="button"
              startIcon={<DeleteOutlineIcon />}
              onClick={page.enableRemoveMode}
              sx={cvsStyles.textActionPrimary}
            >
              Remove skills
            </Button>
          </Box>
        )}
      </Box>

      <AddSkillDialog
        open={page.addDialog.open}
        skills={page.addDialog.skills}
        loading={page.addDialog.loading}
        canSubmit={page.addDialog.canSubmit}
        control={page.addDialog.form.control}
        errors={page.addDialog.form.formState.errors}
        onClose={page.addDialog.onClose}
        onSubmit={page.addDialog.onSubmit}
      />
      <UpdateSkillDialog
        open={page.editDialog.open}
        skillName={page.editDialog.skillName}
        loading={page.editDialog.loading}
        canSubmit={page.editDialog.canSubmit}
        control={page.editDialog.form.control}
        errors={page.editDialog.form.formState.errors}
        onClose={page.editDialog.onClose}
        onSubmit={page.editDialog.onSubmit}
      />
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvSkillsPage;
