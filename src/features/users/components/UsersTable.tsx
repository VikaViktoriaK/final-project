import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "@/i18n/use-translation";
import { SortableTableHeader } from "@/shared/ui/catalog/SortableTableHeader";
import { catalogTableSx } from "@/shared/styles";
import type { SortOrder } from "@/lib/search";
import type { UserRow } from "../types";
import type { UserSortField } from "../types/usersList.types";
import { UsersTableRow } from "./UsersTableRow";

type UsersTableProps = {
  users: UserRow[];
  orderBy: UserSortField;
  order: SortOrder;
  onSort: (field: UserSortField) => void;
  onEditUser: (user: UserRow) => void;
  onViewUser: (user: UserRow) => void;
  onDeleteUser: (user: UserRow) => void;
};

export function UsersTable({
  users,
  orderBy,
  order,
  onSort,
  onEditUser,
  onViewUser,
  onDeleteUser,
}: UsersTableProps) {
  const { t } = useTranslation();
  const { userId: currentUserId, role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={catalogTableSx.tableContainer}
    >
      <Table sx={catalogTableSx.table} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell sx={catalogTableSx.headAvatarCell} />
            <TableCell sx={catalogTableSx.headFirstNameCell}>
              <SortableTableHeader
                label={t("table.firstName")}
                field="firstName"
                sortField={orderBy}
                sortDirection={order}
                onSort={onSort}
              />
            </TableCell>
            <TableCell
              sx={{
                ...catalogTableSx.headLastNameCell,
                ...catalogTableSx.headLastNameCellMobileHidden,
              }}
            >
              <SortableTableHeader
                label={t("table.lastName")}
                field="lastName"
                sortField={orderBy}
                sortDirection={order}
                onSort={onSort}
              />
            </TableCell>
            <TableCell
              sx={{
                ...catalogTableSx.headEmailCell,
                ...catalogTableSx.headEmailCellMobileHidden,
              }}
            >
              <SortableTableHeader
                label={t("table.email")}
                field="email"
                sortField={orderBy}
                sortDirection={order}
                onSort={onSort}
              />
            </TableCell>
            <TableCell sx={catalogTableSx.headDepartmentCell}>
              <SortableTableHeader
                label={t("table.department")}
                field="department"
                sortField={orderBy}
                sortDirection={order}
                onSort={onSort}
              />
            </TableCell>
            <TableCell sx={catalogTableSx.headPositionCell}>
              <SortableTableHeader
                label={t("table.position")}
                field="position"
                sortField={orderBy}
                sortDirection={order}
                onSort={onSort}
              />
            </TableCell>
            <TableCell sx={catalogTableSx.catalogActionsHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} sx={catalogTableSx.emptyState}>
                {t("table.usersNotFound")}
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <UsersTableRow
                key={u.id}
                user={u}
                isAdmin={isAdmin}
                canEdit={isAdmin || currentUserId === u.id}
                onEdit={onEditUser}
                onView={onViewUser}
                onDelete={onDeleteUser}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
