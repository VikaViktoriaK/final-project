"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CvSkillRow from "./cv-skill-row";
import AddSkillDialog from "./add-skill-dialog";
import useCvSkillsPage from "../hooks/use-cv-skills-page";
import { cvsStyles } from "../styles/cvs.styles";

function CvSkillsPage() {
  const page = useCvSkillsPage();

  return (
    <>
      <Box>
        {!page.grouped.length ? (
          <Typography sx={cvsStyles.emptyState}>
            No skills added yet.
          </Typography>
        ) : (
          page.grouped.map((group) => (
            <Box key={group.categoryLabel}>
              <Box component="p" sx={cvsStyles.skillCategoryTitle}>
                {group.categoryLabel}
              </Box>
              {group.skills.map((skill, index) => (
                <CvSkillRow
                  key={skill.name}
                  skill={skill}
                  index={index}
                  removeMode={page.removeMode}
                  checked={page.selected.includes(skill.name)}
                  onToggle={page.toggleSkill}
                />
              ))}
            </Box>
          ))
        )}

        {page.canEdit && (
          <Stack direction="row" spacing={3} sx={cvsStyles.skillActions}>
            <Button
              type="button"
              startIcon={<AddIcon />}
              onClick={page.openAddDialog}
              sx={cvsStyles.textActionMuted}
            >
              Add skill
            </Button>
            {page.removeMode ? (
              <>
                <Button
                  type="button"
                  onClick={page.handleRemove}
                  disabled={!page.selected.length || page.mutating}
                  sx={cvsStyles.textActionPrimary}
                >
                  Confirm remove
                </Button>
                <Button
                  type="button"
                  onClick={page.cancelRemoveMode}
                  sx={cvsStyles.textActionMuted}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="button"
                startIcon={<DeleteOutlineIcon />}
                onClick={page.enableRemoveMode}
                disabled={!page.grouped.length}
                sx={cvsStyles.textActionPrimary}
              >
                Remove skills
              </Button>
            )}
          </Stack>
        )}
      </Box>

      <AddSkillDialog
        open={page.addDialog.open}
        skills={page.addDialog.skills}
        loading={page.addDialog.loading}
        control={page.addDialog.form.control}
        errors={page.addDialog.form.formState.errors}
        onClose={page.addDialog.onClose}
        onSubmit={page.addDialog.onSubmit}
      />
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvSkillsPage;
