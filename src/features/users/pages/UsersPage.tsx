"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { UserCreateDialog } from "@/features/users/components/UserCreateDialog";
import { UserEditDialog } from "@/features/users/components/UserEditDialog";
import { UsersTable } from "@/features/users/components/UsersTable";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
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
    orderBy,
    handleSort,
    deleteDialog,
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
    deleting,
    handleDeleteConfirm,
    handleSaved,
  } = useUsersPage();

  return (
    <>
      <CatalogPageShell
        title={USERS_PAGE_TITLE}
        searchQuery={query}
        onSearchChange={setQuery}
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={openCreate}
            >
              {USERS_CREATE_LABEL}
            </Button>
          ) : null
        }
        errorMessage={error?.message}
        loading={loading}
      >
        <UsersTable
          users={processedUsers}
          orderBy={orderBy}
          order={order}
          onSort={handleSort}
          onEditUser={openEdit}
          onViewUser={viewUser}
          onDeleteUser={requestDeleteUser}
        />
      </CatalogPageShell>

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
