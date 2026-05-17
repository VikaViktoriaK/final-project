"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { PageLoader } from "@/components/PageLoader";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import {
  useCreatePositionMutation,
  useDeletePositionMutation,
  usePositionsQuery,
  useUpdatePositionMutation,
} from "../api/positions";
import { PositionFormDialog } from "../components/PositionFormDialog";
import { PositionsFilter } from "../components/PositionsFilter";
import { PositionsTable } from "../components/PositionsTable";
import {
  POSITIONS_CREATE_LABEL,
  POSITIONS_PAGE_TITLE,
  POSITION_DELETE_DIALOG,
} from "../constants/positions.constants";
import type { PositionRow } from "../types";

export function PositionsPage() {
  const [query, setQuery] = React.useState("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [editingPosition, setEditingPosition] =
    React.useState<PositionRow | null>(null);
  const [deletingPosition, setDeletingPosition] =
    React.useState<PositionRow | null>(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { positions, loading, error, refetch } = usePositionsQuery();
  const [createPosition, { loading: creating }] = useCreatePositionMutation();
  const [updatePosition, { loading: updating }] = useUpdatePositionMutation();
  const [deletePosition, { loading: deleting }] = useDeletePositionMutation();

  const normalize = React.useCallback(
    (value: string) => value.trim().toLowerCase(),
    [],
  );

  const processedPositions = React.useMemo(() => {
    const q = normalize(query);
    const result = q
      ? positions.filter((item) => normalize(item.name).includes(q))
      : [...positions];

    result.sort((a, b) => {
      const aValue = normalize(a.name);
      const bValue = normalize(b.name);
      if (order === "asc") {
        return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
      }
      return bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
    });

    return result;
  }, [normalize, order, positions, query]);

  const openCreate = () => {
    setFormMode("create");
    setEditingPosition(null);
    setFormOpen(true);
  };

  const openEdit = (position: PositionRow) => {
    setFormMode("edit");
    setEditingPosition(position);
    setFormOpen(true);
  };

  const handleFormSubmit = async (name: string) => {
    if (formMode === "create") {
      await createPosition({
        variables: { position: { name } },
      });
    } else if (editingPosition) {
      await updatePosition({
        variables: {
          position: { positionId: editingPosition.id, name },
        },
      });
    }
    await refetch();
  };

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
            <UsersSearch value={query} onChange={setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <PositionsFilter order={order} onOrderChange={setOrder} />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={openCreate}
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
            order={order}
            onToggleNameSort={() =>
              setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            onEdit={openEdit}
            onDelete={(position) => {
              setDeletingPosition(position);
              setDeleteOpen(true);
            }}
            canManage={isAdmin}
          />
        )}
      </Box>

      <PositionFormDialog
        open={formOpen}
        mode={formMode}
        position={editingPosition}
        saving={creating || updating}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Dialog
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        sx={usersTableSx.deleteDialogRoot}
      >
        <DialogTitle>{POSITION_DELETE_DIALOG.title}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete position{" "}
          <strong>{deletingPosition?.name}</strong>?
        </DialogContent>
        <DialogActions sx={usersTableSx.deleteDialogActions}>
          <Button
            onClick={() => setDeleteOpen(false)}
            disabled={deleting}
            sx={usersTableSx.deleteDialogCancelBtn}
          >
            {POSITION_DELETE_DIALOG.cancel}
          </Button>
          <Button
            variant="contained"
            disabled={!deletingPosition || deleting}
            sx={usersTableSx.deleteDialogDeleteBtn}
            onClick={async () => {
              if (!deletingPosition) return;
              await deletePosition({
                variables: {
                  position: { positionId: deletingPosition.id },
                },
              });
              setDeleteOpen(false);
              setDeletingPosition(null);
              await refetch();
            }}
          >
            {POSITION_DELETE_DIALOG.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
