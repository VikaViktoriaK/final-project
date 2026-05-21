import { memo, useCallback, useState, type MouseEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { UserRow } from "@/features/users/types";
import { catalogTableSx } from "@/shared/styles";

function initials(firstName: string, lastName: string) {
  const a = (firstName?.[0] ?? "").toUpperCase();
  const b = (lastName?.[0] ?? "").toUpperCase();
  return `${a}${b}` || "U";
}

type UsersTableRowProps = {
  user: UserRow;
  isAdmin: boolean;
  canEdit: boolean;
  onEdit: (user: UserRow) => void;
  onView: (user: UserRow) => void;
  onDelete: (user: UserRow) => void;
};

function UsersTableRow({
  user,
  isAdmin,
  canEdit,
  onEdit,
  onView,
  onDelete,
}: UsersTableRowProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleEdit = useCallback(() => {
    setAnchorEl(null);
    onEdit(user);
  }, [onEdit, user]);

  const handleView = useCallback(() => {
    setAnchorEl(null);
    onView(user);
  }, [onView, user]);

  const handleDelete = useCallback(() => {
    setAnchorEl(null);
    onDelete(user);
  }, [onDelete, user]);

  return (
    <TableRow sx={catalogTableSx.row}>
      <TableCell sx={catalogTableSx.avatarCell}>
        <Avatar src={user.avatarUrl} sx={catalogTableSx.avatar}>
          {initials(user.firstName, user.lastName)}
        </Avatar>
      </TableCell>
      <TableCell sx={catalogTableSx.firstNameCell}>
        <Box sx={catalogTableSx.nameCell}>
          <Typography variant="body2">{user.firstName}</Typography>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          ...catalogTableSx.lastNameCell,
          ...catalogTableSx.lastNameCellMobileHidden,
        }}
      >
        <Typography variant="body2">{user.lastName}</Typography>
      </TableCell>
      <TableCell
        sx={{
          ...catalogTableSx.emailCell,
          ...catalogTableSx.emailCellMobileHidden,
        }}
      >
        <Typography variant="body2" sx={catalogTableSx.email}>
          {user.email}
        </Typography>
      </TableCell>
      <TableCell sx={catalogTableSx.departmentCell}>
        <Typography variant="body2">{user.department}</Typography>
      </TableCell>
      <TableCell sx={catalogTableSx.positionCell}>
        <Typography variant="body2">{user.position}</Typography>
      </TableCell>
      <TableCell sx={catalogTableSx.catalogActionsCell}>
        <IconButton
          size="small"
          sx={catalogTableSx.actionsBtnChevron}
          onClick={handleView}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={catalogTableSx.catalogActionsMenuButton}
          onClick={handleMenuOpen}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          sx={catalogTableSx.rowMenu}
        >
          <MenuItem onClick={handleView}>View profile</MenuItem>
          {canEdit ? <MenuItem onClick={handleEdit}>Edit</MenuItem> : null}
          {isAdmin ? (
            <MenuItem
              onClick={handleDelete}
              sx={catalogTableSx.rowMenuDeleteItem}
            >
              Delete
            </MenuItem>
          ) : null}
        </Menu>
      </TableCell>
    </TableRow>
  );
}

const MemoizedUsersTableRow = memo(UsersTableRow);
export { MemoizedUsersTableRow as UsersTableRow };
