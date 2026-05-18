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
  useCreateLanguageMutation,
  useDeleteLanguageMutation,
  useLanguagesQuery,
  useUpdateLanguageMutation,
} from "../api/languages";
import { LanguageFormDialog } from "../components/LanguageFormDialog";
import { LanguagesFilter } from "../components/LanguagesFilter";
import { LanguagesTable } from "../components/LanguagesTable";
import {
  LANGUAGES_CREATE_LABEL,
  LANGUAGES_PAGE_TITLE,
  LANGUAGE_DELETE_DIALOG,
} from "../constants/languages.constants";
import type { LanguageRow } from "../types";

export function LanguagesPage() {
  const [query, setQuery] = React.useState("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [editingLanguage, setEditingLanguage] =
    React.useState<LanguageRow | null>(null);
  const [deletingLanguage, setDeletingLanguage] =
    React.useState<LanguageRow | null>(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { languages, loading, error, refetch } = useLanguagesQuery();
  const [createLanguage, { loading: creating }] = useCreateLanguageMutation();
  const [updateLanguage, { loading: updating }] = useUpdateLanguageMutation();
  const [deleteLanguage, { loading: deleting }] = useDeleteLanguageMutation();

  const normalize = React.useCallback(
    (value: string) => value.trim().toLowerCase(),
    [],
  );

  const processedLanguages = React.useMemo(() => {
    const q = normalize(query);
    const result = q
      ? languages.filter((item) => normalize(item.name).includes(q))
      : [...languages];

    result.sort((a, b) => {
      const cmp = normalize(a.name).localeCompare(
        normalize(b.name),
        undefined,
        {
          sensitivity: "base",
        },
      );
      return order === "asc" ? cmp : -cmp;
    });

    return result;
  }, [languages, normalize, order, query]);

  const openCreate = () => {
    setFormMode("create");
    setEditingLanguage(null);
    setFormOpen(true);
  };

  const openEdit = (language: LanguageRow) => {
    setFormMode("edit");
    setEditingLanguage(language);
    setFormOpen(true);
  };

  const handleFormSubmit = async (values: {
    name: string;
    nativeName: string;
    iso2: string;
  }) => {
    const payload = {
      name: values.name,
      native_name: values.nativeName,
      iso2: values.iso2,
    };

    if (formMode === "create") {
      await createLanguage({ variables: { language: payload } });
    } else if (editingLanguage) {
      await updateLanguage({
        variables: {
          language: { languageId: editingLanguage.id, ...payload },
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
            {LANGUAGES_PAGE_TITLE}
          </Typography>
        </Breadcrumbs>
        <Box sx={usersTableSx.topBar}>
          <Box sx={usersTableSx.topBarSearch}>
            <UsersSearch value={query} onChange={setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <LanguagesFilter order={order} onOrderChange={setOrder} />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={openCreate}
              >
                {LANGUAGES_CREATE_LABEL}
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
          <LanguagesTable
            languages={processedLanguages}
            order={order}
            onToggleNameSort={() =>
              setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            onEdit={openEdit}
            onDelete={(language) => {
              setDeletingLanguage(language);
              setDeleteOpen(true);
            }}
            canManage={isAdmin}
          />
        )}
      </Box>

      <LanguageFormDialog
        open={formOpen}
        mode={formMode}
        language={editingLanguage}
        saving={creating || updating}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Dialog
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        sx={usersTableSx.deleteDialogRoot}
      >
        <DialogTitle>{LANGUAGE_DELETE_DIALOG.title}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete language{" "}
          <strong>{deletingLanguage?.name}</strong>?
        </DialogContent>
        <DialogActions sx={usersTableSx.deleteDialogActions}>
          <Button
            onClick={() => setDeleteOpen(false)}
            disabled={deleting}
            sx={usersTableSx.deleteDialogCancelBtn}
          >
            {LANGUAGE_DELETE_DIALOG.cancel}
          </Button>
          <Button
            variant="contained"
            disabled={!deletingLanguage || deleting}
            sx={usersTableSx.deleteDialogDeleteBtn}
            onClick={async () => {
              if (!deletingLanguage) return;
              await deleteLanguage({
                variables: {
                  language: { languageId: deletingLanguage.id },
                },
              });
              setDeleteOpen(false);
              setDeletingLanguage(null);
              await refetch();
            }}
          >
            {LANGUAGE_DELETE_DIALOG.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
