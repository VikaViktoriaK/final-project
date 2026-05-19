"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { PageLoader } from "@/components/PageLoader";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import { LanguageFormDialog } from "../components/LanguageFormDialog";
import { LanguagesFilter } from "../components/LanguagesFilter";
import { LanguagesTable } from "../components/LanguagesTable";
import {
  LANGUAGES_CREATE_LABEL,
  LANGUAGES_PAGE_TITLE,
  LANGUAGE_DELETE_DIALOG,
} from "../constants/languages.constants";
import { useLanguagesPage } from "../hooks/useLanguagesPage";

export function LanguagesPage() {
  const {
    isAdmin,
    loading,
    error,
    search,
    form,
    deleteDialog,
    processedLanguages,
    saving,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  } = useLanguagesPage();

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
            <UsersSearch value={search.query} onChange={search.setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <LanguagesFilter
              order={search.order}
              onOrderChange={search.setOrder}
            />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={form.openCreate}
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
            order={search.order}
            onToggleNameSort={search.toggleOrder}
            onEdit={form.openEdit}
            onDelete={deleteDialog.requestDelete}
            canManage={isAdmin}
          />
        )}
      </Box>

      <LanguageFormDialog
        open={form.open}
        mode={form.mode}
        language={form.item}
        saving={saving}
        onClose={form.close}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        title={LANGUAGE_DELETE_DIALOG.title}
        cancelLabel={LANGUAGE_DELETE_DIALOG.cancel}
        confirmLabel={LANGUAGE_DELETE_DIALOG.confirm}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        Are you sure you want to delete language{" "}
        <strong>{deleteDialog.target?.name}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
