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
import { useMemo, useRef, useState, type MouseEvent, type Ref } from "react";
import type { Skill } from "../types";
import { cvsStyles } from "../styles/cvs.styles";
import { groupCatalogSkills } from "@/lib/group-catalog-skills";

type SkillSelectFieldProps = {
  skills: Skill[];
  value: string;
  onChange: (skillId: string) => void;
  onBlur: () => void;
  name: string;
  inputRef: Ref<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
};

const SKILL_LABEL_ID = "add-skill-skill-label";

function SkillSelectField({
  skills,
  value,
  onChange,
  onBlur,
  name,
  inputRef,
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
        name={name}
        inputRef={inputRef}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
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
