"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useCvs from "./use-cvs";
import useActionFeedback from "@/hooks/use-action-feedback";
import useAnchoredMenu from "@/hooks/use-anchored-menu";
import useDialog from "@/hooks/use-dialog";
import useSearch from "@/hooks/use-search";
import {
  useCreateCvMutation,
  useDeleteCvMutation,
} from "./use-cv-list-mutations";
import {
  createCvSchema,
  EMPTY_CV_FORM_VALUES,
  type CreateCvFormValues,
} from "../schemas/create-cv.schema";
import {
  filterCvs,
  sortCvs,
  type CvSortField,
  type SortDirection,
} from "../utils/cv-list";
import type { Cv } from "../../shared/types";

function useCvsPage() {
  const router = useRouter();
  const {
    query: search,
    setQuery: setSearch,
    onChange: handleSearchChange,
  } = useSearch();
  const createDialog = useDialog();
  const deleteDialog = useDialog<Cv>();
  const tableMenu = useAnchoredMenu<Cv>();
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();

  const [sortField, setSortField] = useState<CvSortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [createError, setCreateError] = useState<string | null>(null);

  const { data, loading, error } = useCvs();
  const { createCv, loading: creating } = useCreateCvMutation();
  const { deleteCv, loading: deleting } = useDeleteCvMutation();

  const createForm = useForm<CreateCvFormValues>({
    resolver: zodResolver(createCvSchema),
    mode: "onChange",
    defaultValues: EMPTY_CV_FORM_VALUES,
  });

  const {
    formState: {
      errors: createErrors,
      isSubmitting: isCreateSubmitting,
      isDirty,
      isValid,
    },
  } = createForm;
  const isCreatePending = isCreateSubmitting || creating;
  const hasCreateChanges = isDirty && isValid;
  const canCreate = hasCreateChanges && !isCreatePending;

  const allCvs = useMemo(() => data?.cvs ?? [], [data?.cvs]);
  const cvs = useMemo(
    () => sortCvs(filterCvs(allCvs, search), sortField, sortDirection),
    [allCvs, search, sortField, sortDirection],
  );

  const isSearchEmpty =
    Boolean(search.trim()) && cvs.length === 0 && allCvs.length > 0;
  const isEmpty = allCvs.length === 0;

  const handleSort = (field: CvSortField) => {
    if (sortField === field) {
      setSortDirection((previous) => (previous === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortDirection("asc");
  };

  const openCreateDialog = () => {
    createForm.reset(EMPTY_CV_FORM_VALUES);
    setCreateError(null);
    createDialog.open();
  };

  const closeCreateDialog = () => {
    createForm.reset(EMPTY_CV_FORM_VALUES);
    setCreateError(null);
    createDialog.close();
  };

  const submitCreateCv = createForm.handleSubmit(async (values) => {
    setCreateError(null);
    const result = await createCv(values);
    if (result.ok) {
      showSuccess("CV created");
      closeCreateDialog();
      router.push(`/cvs/${result.data.id}/details`);
      return;
    }
    setCreateError(result.message);
    showError(result.message);
  });

  const handleMenuDelete = () => {
    if (tableMenu.item) {
      deleteDialog.open(tableMenu.item);
    }
    tableMenu.close();
  };

  const confirmDeleteCv = async () => {
    if (!deleteDialog.payload) {
      return;
    }
    const result = await deleteCv(deleteDialog.payload.id);
    if (result.ok) {
      showSuccess("CV deleted");
      deleteDialog.close();
      return;
    }
    showError(result.message);
  };

  const editHref = tableMenu.item ? `/cvs/${tableMenu.item.id}/details` : "#";

  return {
    cvs,
    loading,
    error,
    search,
    setSearch,
    sortField,
    sortDirection,
    isEmpty,
    isSearchEmpty,
    handleSearchChange,
    handleSort,
    createDialog,
    deleteDialog,
    tableMenu,
    editHref,
    createError,
    createErrors,
    isCreatePending,
    hasCreateChanges,
    canCreate,
    deleting,
    createForm,
    openCreateDialog,
    closeCreateDialog,
    submitCreateCv,
    handleMenuDelete,
    confirmDeleteCv,
    FeedbackSnackbar,
  };
}

export default useCvsPage;
