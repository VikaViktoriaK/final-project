import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import { CatalogRowActionsMenu } from "@/shared/ui/catalog/CatalogRowActionsMenu";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { LanguageRow } from "../types";
import { languagesTableSx } from "./languagesTable.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

type LanguagesTableRowProps = {
  language: LanguageRow;
  onEdit: (language: LanguageRow) => void;
  onDelete: (language: LanguageRow) => void;
  canManage: boolean;
};

export function LanguagesTableRow({
  language,
  onEdit,
  onDelete,
  canManage,
}: LanguagesTableRowProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  return (
    <TableRow sx={catalogTableSx.row}>
      <TableCell sx={languagesTableSx.nameCell}>
        <Typography variant="body2">{language.name}</Typography>
      </TableCell>
      <TableCell sx={languagesTableSx.nativeNameCell}>
        <Typography variant="body2">{language.nativeName}</Typography>
      </TableCell>
      <TableCell sx={languagesTableSx.iso2Cell}>
        <Typography variant="body2">{language.iso2}</Typography>
      </TableCell>
      <TableCell sx={languagesTableSx.actionsCell}>
        {canManage ? (
          <>
            <IconButton
              size="small"
              sx={catalogTableSx.catalogActionsMenuButton}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-label={`Actions for ${language.name}`}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <CatalogRowActionsMenu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              onEdit={() => onEdit(language)}
              onDelete={() => onDelete(language)}
            />
          </>
        ) : null}
      </TableCell>
    </TableRow>
  );
}
