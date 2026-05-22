import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CatalogRowActionsMenu } from "@/shared/ui/catalog/CatalogRowActionsMenu";
import type { PositionRow } from "../types";
import { positionsTableSx } from "./positionsTable.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

type PositionsTableRowProps = {
  position: PositionRow;
  onEdit: (position: PositionRow) => void;
  onDelete: (position: PositionRow) => void;
  canManage: boolean;
};

export function PositionsTableRow({
  position,
  onEdit,
  onDelete,
  canManage,
}: PositionsTableRowProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <TableRow sx={catalogTableSx.row}>
      <TableCell sx={positionsTableSx.nameCell}>
        <Typography variant="body2">{position.name}</Typography>
      </TableCell>
      <TableCell sx={positionsTableSx.actionsCell}>
        {canManage ? (
          <>
            <IconButton
              size="small"
              sx={catalogTableSx.catalogActionsMenuButton}
              onClick={handleMenuOpen}
              aria-label={`Actions for ${position.name}`}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <CatalogRowActionsMenu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              onEdit={() => onEdit(position)}
              onDelete={() => onDelete(position)}
            />
          </>
        ) : null}
      </TableCell>
    </TableRow>
  );
}
