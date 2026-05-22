import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CatalogRowActionsMenu } from "@/shared/ui/catalog/CatalogRowActionsMenu";
import type { DepartmentRow } from "../types";
import { departmentsTableSx } from "./departmentsTable.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

type DepartmentsTableRowProps = {
  department: DepartmentRow;
  onEdit: (department: DepartmentRow) => void;
  onDelete: (department: DepartmentRow) => void;
  canManage: boolean;
};

export function DepartmentsTableRow({
  department,
  onEdit,
  onDelete,
  canManage,
}: DepartmentsTableRowProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <TableRow sx={catalogTableSx.row}>
      <TableCell sx={departmentsTableSx.nameCell}>
        <Typography variant="body2">{department.name}</Typography>
      </TableCell>
      <TableCell sx={departmentsTableSx.actionsCell}>
        {canManage ? (
          <>
            <IconButton
              size="small"
              sx={catalogTableSx.catalogActionsMenuButton}
              onClick={handleMenuOpen}
              aria-label={`Actions for ${department.name}`}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <CatalogRowActionsMenu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              onEdit={() => onEdit(department)}
              onDelete={() => onDelete(department)}
            />
          </>
        ) : null}
      </TableCell>
    </TableRow>
  );
}
