"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { PositionFormDialog } from "../components/PositionFormDialog";
import { PositionsFilter } from "../components/PositionsFilter";
import { PositionsTable } from "../components/PositionsTable";
import {
  POSITIONS_CREATE_LABEL,
  POSITIONS_PAGE_TITLE,
  POSITION_DELETE_DIALOG,
} from "../constants/positions.constants";
import { usePositionsPage } from "../hooks/usePositionsPage";

export function PositionsPage() {
  const {
    isAdmin,
    loading,
    error,
    search,
    form,
    deleteDialog,
    processedPositions,
    saving,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  } = usePositionsPage();

  return (
    <>
      <CatalogPageShell
        title={POSITIONS_PAGE_TITLE}
        searchQuery={search.query}
        onSearchChange={search.setQuery}
        filter={
          <PositionsFilter
            order={search.order}
            onOrderChange={search.setOrder}
          />
        }
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={form.openCreate}
            >
              {POSITIONS_CREATE_LABEL}
            </Button>
          ) : null
        }
        errorMessage={error?.message}
        loading={loading}
      >
        <PositionsTable
          positions={processedPositions}
          order={search.order}
          onToggleNameSort={search.toggleOrder}
          onEdit={form.openEdit}
          onDelete={deleteDialog.requestDelete}
          canManage={isAdmin}
        />
      </CatalogPageShell>

      <PositionFormDialog
        open={form.open}
        mode={form.mode}
        position={form.item}
        saving={saving}
        onClose={form.close}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        title={POSITION_DELETE_DIALOG.title}
        cancelLabel={POSITION_DELETE_DIALOG.cancel}
        confirmLabel={POSITION_DELETE_DIALOG.confirm}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        Are you sure you want to delete position{" "}
        <strong>{deleteDialog.target?.name}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
