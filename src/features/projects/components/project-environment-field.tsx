"use client";

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, type ControllerRenderProps } from "react-hook-form";
import { groupCatalogSkills } from "@/lib/group-catalog-skills";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";
import { ENVIRONMENT_FIELD_LABEL_ID } from "../constants";
import type { CatalogProjectFormValues } from "../schemas";
import type {
  EnvironmentFieldContentProps,
  ProjectEnvironmentFieldProps,
} from "../types";
import { projectsStyles } from "../styles/projects.styles";
import EnvironmentSkillChip from "./environment-skill-chip";

function EnvironmentAddSkillPlaceholder() {
  return (
    <Box component="span" sx={projectsStyles.environmentAddLabel}>
      Add skill
    </Box>
  );
}

function EnvironmentFieldContent({
  field,
  skills,
  disabled,
  message,
}: EnvironmentFieldContentProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [menuMinWidth, setMenuMinWidth] = useState<number | undefined>();
  const selected = field.value;

  const availableSkills = useMemo(() => {
    const chosen = selected ?? [];
    return skills.filter((skill) => skill.name && !chosen.includes(skill.name));
  }, [skills, selected]);

  const groups = useMemo(
    () => groupCatalogSkills(availableSkills),
    [availableSkills],
  );

  const handleAdd = (name: string) => {
    const chosen = selected ?? [];
    if (!name || chosen.includes(name)) {
      return;
    }
    field.onChange([...chosen, name]);
  };

  const handleRemove = (name: string) => {
    const chosen = selected ?? [];
    field.onChange(chosen.filter((item) => item !== name));
  };

  const handleOpen = () => {
    const width = formRef.current?.getBoundingClientRect().width ?? 0;
    setMenuMinWidth(Math.max(width, 420));
  };

  const handleSkillSelectChange = (event: SelectChangeEvent<string>) => {
    handleAdd(event.target.value);
  };

  return (
    <FormControl
      ref={formRef}
      fullWidth
      error={!!message}
      disabled={disabled}
      sx={[cvsStyles.formField, cvsStyles.skillSelectField]}
    >
      <InputLabel id={ENVIRONMENT_FIELD_LABEL_ID} shrink>
        Environment
      </InputLabel>
      <Box sx={projectsStyles.environmentBox}>
        {(selected ?? []).map((name) => (
          <EnvironmentSkillChip
            key={name}
            name={name}
            disabled={disabled}
            onRemove={handleRemove}
          />
        ))}
        <Select
          labelId={ENVIRONMENT_FIELD_LABEL_ID}
          label="Environment"
          displayEmpty
          value=""
          onChange={handleSkillSelectChange}
          onOpen={handleOpen}
          disabled={disabled || availableSkills.length === 0}
          renderValue={EnvironmentAddSkillPlaceholder}
          sx={[cvsStyles.skillSelectControl, projectsStyles.environmentSelect]}
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
                value={skill.name}
                sx={cvsStyles.skillSelectOption}
              >
                {skill.name}
              </MenuItem>
            )),
          ])}
        </Select>
      </Box>
      {message ? <FormHelperText>{message}</FormHelperText> : null}
    </FormControl>
  );
}

function ProjectEnvironmentField({
  control,
  errors,
  skills,
  disabled = false,
}: ProjectEnvironmentFieldProps) {
  const message = errors.environment?.message;

  const renderEnvironmentField = useCallback(
    ({
      field,
    }: {
      field: ControllerRenderProps<CatalogProjectFormValues, "environment">;
    }) => (
      <EnvironmentFieldContent
        field={field}
        skills={skills}
        disabled={disabled}
        message={message}
      />
    ),
    [skills, disabled, message],
  );

  return (
    <Controller
      name="environment"
      control={control}
      render={renderEnvironmentField}
    />
  );
}

export default ProjectEnvironmentField;
