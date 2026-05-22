"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { useTranslation } from "@/i18n/use-translation";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { PositionFormDialog } from "../components/PositionFormDialog";
import { PositionsTable } from "../components/PositionsTable";
import { usePositionsPage } from "../hooks/usePositionsPage";

export function PositionsPage() {
  const { t } = useTranslation();
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
        title={t("nav.positions")}
        searchQuery={search.query}
        onSearchChange={search.setQuery}
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={form.openCreate}
            >
              {t("positions.createButton")}
            </Button>
          ) : null
        }
        errorMessage={error?.message}
        loading={loading}
      >
        <PositionsTable
          positions={processedPositions}
          order={search.order}
          onSort={search.toggleOrder}
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
        title={t("positions.dialog.deleteTitle")}
        cancelLabel={t("common.cancel")}
        confirmLabel={t("common.delete")}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        {t("positions.deleteConfirm")}{" "}
        <strong>{deleteDialog.target?.name}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
