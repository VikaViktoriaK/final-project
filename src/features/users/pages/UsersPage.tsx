"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { UserCreateDialog } from "@/features/users/components/UserCreateDialog";
import { UserEditDialog } from "@/features/users/components/UserEditDialog";
import { UsersTable } from "@/features/users/components/UsersTable";
import { useTranslation } from "@/i18n/use-translation";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { useUsersPage } from "@/features/users/hooks/useUsersPage";

export function UsersPage() {
  const { t } = useTranslation();
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
        title={t("nav.employees")}
        searchQuery={query}
        onSearchChange={setQuery}
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={openCreate}
            >
              {t("users.createButton")}
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
        title={t("users.dialog.deleteTitle")}
        cancelLabel={t("common.cancel")}
        confirmLabel={t("common.delete")}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        {t("users.deleteConfirm")} <strong>{deleteDialog.target?.email}</strong>
        ?
      </ConfirmDeleteDialog>
    </>
  );
}
