"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { PageLoader } from "@/components/PageLoader";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
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
      <Box sx={usersTableSx.usersPageContainer}>
        <Breadcrumbs aria-label="breadcrumb" sx={usersTableSx.breadcrumbs}>
          <Typography component="span" sx={usersTableSx.breadcrumbItemActive}>
            {POSITIONS_PAGE_TITLE}
          </Typography>
        </Breadcrumbs>
        <Box sx={usersTableSx.topBar}>
          <Box sx={usersTableSx.topBarSearch}>
            <UsersSearch value={search.query} onChange={search.setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <PositionsFilter
              order={search.order}
              onOrderChange={search.setOrder}
            />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={form.openCreate}
              >
                {POSITIONS_CREATE_LABEL}
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
          <PositionsTable
            positions={processedPositions}
            order={search.order}
            onToggleNameSort={search.toggleOrder}
            onEdit={form.openEdit}
            onDelete={deleteDialog.requestDelete}
            canManage={isAdmin}
          />
        )}
      </Box>

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
