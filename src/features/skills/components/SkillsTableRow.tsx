import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { SkillRow } from "../types";
import { skillsTableSx } from "./skillsTable.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

type SkillsTableRowProps = {
  skill: SkillRow;
  onEdit: (skill: SkillRow) => void;
  onDelete: (skill: SkillRow) => void;
  canManage: boolean;
};

export function SkillsTableRow({
  skill,
  onEdit,
  onDelete,
  canManage,
}: SkillsTableRowProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  return (
    <TableRow sx={catalogTableSx.row}>
      <TableCell sx={skillsTableSx.nameCell}>
        <Typography variant="body2">{skill.name}</Typography>
      </TableCell>
      <TableCell sx={skillsTableSx.categoryCell}>
        <Typography variant="body2">{skill.categoryName}</Typography>
      </TableCell>
      <TableCell sx={skillsTableSx.actionsCell}>
        {canManage ? (
          <>
            <IconButton
              size="small"
              sx={catalogTableSx.actionsBtn}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-label={`Actions for ${skill.name}`}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              sx={catalogTableSx.rowMenu}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onEdit(skill);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onDelete(skill);
                }}
                sx={catalogTableSx.rowMenuDeleteItem}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        ) : null}
      </TableCell>
    </TableRow>
  );
}
