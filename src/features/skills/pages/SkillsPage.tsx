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
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useSkillsCatalogQuery,
  useUpdateSkillMutation,
} from "../api/skills";
import { SkillFormDialog } from "../components/SkillFormDialog";
import { SkillsFilter } from "../components/SkillsFilter";
import { SkillsTable } from "../components/SkillsTable";
import {
  SKILLS_CREATE_LABEL,
  SKILLS_PAGE_TITLE,
  SKILL_DELETE_DIALOG,
} from "../constants/skills.constants";
import type { SkillRow, SkillsSortField } from "../types";

export function SkillsPage() {
  const [query, setQuery] = React.useState("");
  const [orderBy, setOrderBy] = React.useState<SkillsSortField>("name");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [editingSkill, setEditingSkill] = React.useState<SkillRow | null>(null);
  const [deletingSkill, setDeletingSkill] = React.useState<SkillRow | null>(
    null,
  );
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { skills, categories, loading, error, refetch } =
    useSkillsCatalogQuery();
  const [createSkill, { loading: creating }] = useCreateSkillMutation();
  const [updateSkill, { loading: updating }] = useUpdateSkillMutation();
  const [deleteSkill, { loading: deleting }] = useDeleteSkillMutation();

  const normalize = React.useCallback(
    (value: string) => value.trim().toLowerCase(),
    [],
  );

  const handleSort = React.useCallback(
    (field: SkillsSortField) => {
      if (field === orderBy) {
        setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setOrderBy(field);
        setOrder("asc");
      }
    },
    [orderBy],
  );

  const processedSkills = React.useMemo(() => {
    const q = normalize(query);
    const result = q
      ? skills.filter((item) => normalize(item.name).includes(q))
      : [...skills];

    result.sort((a, b) => {
      const compareName = () =>
        normalize(a.name).localeCompare(normalize(b.name), undefined, {
          sensitivity: "base",
        });
      const compareCategory = () =>
        normalize(a.categoryName).localeCompare(
          normalize(b.categoryName),
          undefined,
          { sensitivity: "base" },
        );

      let cmp =
        orderBy === "name" ? compareName() : compareCategory() || compareName();

      if (order === "desc") cmp = -cmp;
      return cmp;
    });

    return result;
  }, [normalize, order, orderBy, query, skills]);

  const openCreate = () => {
    setFormMode("create");
    setEditingSkill(null);
    setFormOpen(true);
  };

  const openEdit = (skill: SkillRow) => {
    setFormMode("edit");
    setEditingSkill(skill);
    setFormOpen(true);
  };

  const handleFormSubmit = async (values: {
    name: string;
    categoryId: string;
  }) => {
    if (formMode === "create") {
      await createSkill({ variables: { skill: values } });
    } else if (editingSkill) {
      await updateSkill({
        variables: {
          skill: {
            skillId: editingSkill.id,
            name: values.name,
            categoryId: values.categoryId,
          },
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
            {SKILLS_PAGE_TITLE}
          </Typography>
        </Breadcrumbs>
        <Box sx={usersTableSx.topBar}>
          <Box sx={usersTableSx.topBarSearch}>
            <UsersSearch value={query} onChange={setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <SkillsFilter
              orderBy={orderBy}
              order={order}
              onOrderByChange={setOrderBy}
              onOrderChange={setOrder}
            />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={openCreate}
              >
                {SKILLS_CREATE_LABEL}
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
          <SkillsTable
            skills={processedSkills}
            orderBy={orderBy}
            order={order}
            onSort={handleSort}
            onEdit={openEdit}
            onDelete={(skill) => {
              setDeletingSkill(skill);
              setDeleteOpen(true);
            }}
            canManage={isAdmin}
          />
        )}
      </Box>

      <SkillFormDialog
        open={formOpen}
        mode={formMode}
        skill={editingSkill}
        categories={categories}
        saving={creating || updating}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Dialog
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        sx={usersTableSx.deleteDialogRoot}
      >
        <DialogTitle>{SKILL_DELETE_DIALOG.title}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete skill{" "}
          <strong>{deletingSkill?.name}</strong>?
        </DialogContent>
        <DialogActions sx={usersTableSx.deleteDialogActions}>
          <Button
            onClick={() => setDeleteOpen(false)}
            disabled={deleting}
            sx={usersTableSx.deleteDialogCancelBtn}
          >
            {SKILL_DELETE_DIALOG.cancel}
          </Button>
          <Button
            variant="contained"
            disabled={!deletingSkill || deleting}
            sx={usersTableSx.deleteDialogDeleteBtn}
            onClick={async () => {
              if (!deletingSkill) return;
              await deleteSkill({
                variables: { skill: { skillId: deletingSkill.id } },
              });
              setDeleteOpen(false);
              setDeletingSkill(null);
              await refetch();
            }}
          >
            {SKILL_DELETE_DIALOG.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
