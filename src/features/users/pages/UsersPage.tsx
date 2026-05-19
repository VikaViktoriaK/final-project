"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { PageLoader } from "@/components/PageLoader";
import { UserCreateDialog } from "@/features/users/components/UserCreateDialog";
import { UserEditDialog } from "@/features/users/components/UserEditDialog";
import { UsersFilter } from "@/features/users/components/UsersFilter";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { UsersTable } from "@/features/users/components/UsersTable";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import {
  USER_DELETE_DIALOG,
  USERS_CREATE_LABEL,
  USERS_PAGE_TITLE,
} from "@/features/users/constants/users.constants";
import { useUsersPage } from "@/features/users/hooks/useUsersPage";

export function UsersPage() {
  const {
    isAdmin,
    loading,
    error,
    query,
    setQuery,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    processedUsers,
    editingUser,
    editOpen,
    openEdit,
    closeEdit,
    createOpen,
    openCreate,
    closeCreate,
    viewUser,
    requestDeleteUser,
    deleteDialog,
    deleting,
    handleDeleteConfirm,
    handleSaved,
  } = useUsersPage();

  return (
    <>
      <Box sx={usersTableSx.usersPageContainer}>
        <Breadcrumbs aria-label="breadcrumb" sx={usersTableSx.breadcrumbs}>
          <Typography component="span" sx={usersTableSx.breadcrumbItemActive}>
            {USERS_PAGE_TITLE}
          </Typography>
        </Breadcrumbs>
        <Box sx={usersTableSx.topBar}>
          <Box sx={usersTableSx.topBarSearch}>
            <UsersSearch value={query} onChange={setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <UsersFilter
              order={order}
              orderBy={orderBy}
              onOrderChange={setOrder}
              onOrderByChange={setOrderBy}
            />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={openCreate}
              >
                {USERS_CREATE_LABEL}
              </Button>
            ) : null}
          </Box>
        </Box>
        {error ? (
          <Typography color="error.main">{error.message}</Typography>
        ) : null}
        {loading ? (
          <PageLoader />
        ) : (
          <UsersTable
            users={processedUsers}
            onEditUser={openEdit}
            onViewUser={viewUser}
            onDeleteUser={requestDeleteUser}
          />
        )}
      </Box>

      <UserEditDialog
        key={`${editingUser?.id ?? "user-edit-dialog"}-${editOpen ? "open" : "closed"}`}
        open={editOpen}
        user={editingUser}
        onClose={closeEdit}
        onSaved={handleSaved}
      />
      <UserCreateDialog
        key={createOpen ? "create-open" : "create-closed"}
        open={createOpen}
        onClose={closeCreate}
        onCreated={handleSaved}
      />
      <ConfirmDeleteDialog
        open={deleteDialog.open}
        title={USER_DELETE_DIALOG.title}
        cancelLabel={USER_DELETE_DIALOG.cancel}
        confirmLabel={USER_DELETE_DIALOG.confirm}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        Are you sure you want to delete user{" "}
        <strong>{deleteDialog.target?.email}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
