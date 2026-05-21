"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { useMemo, useRef, useState, type MouseEvent } from "react";
import type { SkillManagerCatalogSkill } from "../types/skillManager.types";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";

type SkillSelectFieldProps = {
  skills: SkillManagerCatalogSkill[];
  value: string;
  onChange: (skillId: string) => void;
  error?: boolean;
  helperText?: string;
};

type CatalogSkillGroup = {
  categoryLabel: string;
  skills: SkillManagerCatalogSkill[];
};

const SKILL_LABEL_ID = "add-skill-skill-label";

function getSkillCatalogGroupLabel(skill: SkillManagerCatalogSkill): string {
  const category = skill.category;
  if (!category) {
    return "Other";
  }
  return category.parent?.name ?? category.name ?? "Other";
}

function groupCatalogSkills(
  skills: SkillManagerCatalogSkill[],
): CatalogSkillGroup[] {
  const sorted = [...skills].sort((left, right) => {
    const groupCompare = getSkillCatalogGroupLabel(left).localeCompare(
      getSkillCatalogGroupLabel(right),
    );
    return groupCompare || left.name.localeCompare(right.name);
  });

  const groups: CatalogSkillGroup[] = [];
  for (const skill of sorted) {
    const categoryLabel = getSkillCatalogGroupLabel(skill);
    const last = groups[groups.length - 1];
    if (last?.categoryLabel === categoryLabel) {
      last.skills.push(skill);
      continue;
    }
    groups.push({ categoryLabel, skills: [skill] });
  }
  return groups;
}

function SkillSelectField({
  skills,
  value,
  onChange,
  error,
  helperText,
}: SkillSelectFieldProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [menuMinWidth, setMenuMinWidth] = useState<number | undefined>();
  const groups = useMemo(() => groupCatalogSkills(skills), [skills]);
  const selectedName = skills.find((skill) => skill.id === value)?.name ?? "";

  const handleOpen = () => {
    const width = formRef.current?.getBoundingClientRect().width ?? 0;
    setMenuMinWidth(Math.max(width, 420));
  };

  const handleClear = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onChange("");
  };

  return (
    <FormControl
      ref={formRef}
      fullWidth
      sx={[cvsStyles.formField, cvsStyles.skillSelectField]}
      error={error}
    >
      <InputLabel id={SKILL_LABEL_ID} shrink>
        Skill
      </InputLabel>
      <Select
        labelId={SKILL_LABEL_ID}
        label="Skill"
        displayEmpty
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onOpen={handleOpen}
        renderValue={() => selectedName}
        sx={cvsStyles.skillSelectControl}
        MenuProps={{
          autoFocus: false,
          disableAutoFocusItem: true,
          anchorOrigin: { vertical: "bottom", horizontal: "left" },
          transformOrigin: { vertical: "top", horizontal: "left" },
          slotProps: {
            paper: {
              sx: [
                cvsStyles.skillSelectMenuPaper,
                menuMinWidth ? { minWidth: menuMinWidth } : null,
              ],
            },
          },
        }}
      >
        {groups.map((group) => [
          <ListSubheader
            key={`header-${group.categoryLabel}`}
            sx={cvsStyles.skillSelectGroupLabel}
            disableSticky
          >
            {group.categoryLabel}
          </ListSubheader>,
          ...group.skills.map((skill) => (
            <MenuItem
              key={skill.id}
              value={skill.id}
              sx={cvsStyles.skillSelectOption}
            >
              {skill.name}
            </MenuItem>
          )),
        ])}
      </Select>
      {value ? (
        <IconButton
          type="button"
          size="small"
          aria-label="Clear skill"
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleClear}
          sx={cvsStyles.skillSelectClear}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ) : null}
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
}

export default SkillSelectField;
