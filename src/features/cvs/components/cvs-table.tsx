"use client";

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NextLink from "next/link";
import { Fragment } from "react";
import type { Cv } from "../types";
import type { CvSortField, SortDirection } from "../utils/cv-list";
import { cvsStyles } from "../styles/cvs.styles";

type CvsTableProps = {
  cvs: Cv[];
  canManageCv: (cv: Cv) => boolean;
  sortField: CvSortField;
  sortDirection: SortDirection;
  onSort: (field: CvSortField) => void;
  menuAnchor: HTMLElement | null;
  editHref: string;
  onOpenMenu: (event: React.MouseEvent<HTMLElement>, cv: Cv) => void;
  onCloseMenu: () => void;
  onDelete: () => void;
};

function CvsTable({
  cvs,
  canManageCv,
  sortField,
  sortDirection,
  onSort,
  menuAnchor,
  editHref,
  onOpenMenu,
  onCloseMenu,
  onDelete,
}: CvsTableProps) {
  const handleSortByName = () => {
    onSort("name");
  };

  const handleSortByEmployee = () => {
    onSort("employee");
  };

  return (
    <>
      <Table sx={cvsStyles.table}>
        <TableHead>
          <TableRow>
            <TableCell sx={cvsStyles.tableHeadCell}>
              <TableSortLabel
                active={sortField === "name"}
                direction={sortField === "name" ? sortDirection : "asc"}
                onClick={handleSortByName}
                sx={cvsStyles.tableSortLabel}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cvsStyles.tableHeadCell}>Education</TableCell>
            <TableCell sx={cvsStyles.tableHeadCell}>
              <TableSortLabel
                active={sortField === "employee"}
                direction={sortField === "employee" ? sortDirection : "asc"}
                onClick={handleSortByEmployee}
                sx={cvsStyles.tableSortLabel}
              >
                Employee
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cvsStyles.tableHeadCell} width={48} />
          </TableRow>
        </TableHead>

        <TableBody>
          {cvs.map((cv) => {
            const employee = cv.user?.email ?? "Unassigned";
            const showMenu = canManageCv(cv);

            const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
              onOpenMenu(event, cv);
            };

            return (
              <Fragment key={cv.id}>
                <TableRow sx={cvsStyles.tableRow}>
                  <TableCell>
                    <Box
                      component={NextLink}
                      href={`/cvs/${cv.id}/details`}
                      sx={cvsStyles.cvNameLink}
                    >
                      {cv.name}
                    </Box>
                  </TableCell>
                  <TableCell>{cv.education ?? "—"}</TableCell>
                  <TableCell>{employee}</TableCell>
                  <TableCell align="right">
                    {showMenu && (
                      <IconButton
                        type="button"
                        size="small"
                        aria-label="CV actions"
                        onClick={handleOpenMenu}
                        sx={cvsStyles.menuIconButton}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow sx={cvsStyles.tableRow}>
                  <TableCell colSpan={4} sx={cvsStyles.tableDescriptionCell}>
                    <Typography component="span" sx={cvsStyles.cvDescription}>
                      {cv.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={onCloseMenu}
      >
        <MenuItem component={NextLink} href={editHref} onClick={onCloseMenu}>
          Edit
        </MenuItem>
        <MenuItem onClick={onDelete} sx={cvsStyles.menuItemDanger}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default CvsTable;
