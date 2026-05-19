"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { PageLoader } from "@/components/PageLoader";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { catalogPageSx } from "@/features/users/components/styles/catalogPage.styles";

export type CatalogPageShellProps = {
  title: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter: ReactNode;
  action?: ReactNode;
  errorMessage?: string | null;
  loading: boolean;
  children: ReactNode;
};

export function CatalogPageShell({
  title,
  searchQuery,
  onSearchChange,
  filter,
  action,
  errorMessage,
  loading,
  children,
}: CatalogPageShellProps) {
  return (
    <Box sx={catalogPageSx.usersPageContainer}>
      <Breadcrumbs aria-label="breadcrumb" sx={catalogPageSx.breadcrumbs}>
        <Typography component="span" sx={catalogPageSx.breadcrumbItemActive}>
          {title}
        </Typography>
      </Breadcrumbs>
      <Box sx={catalogPageSx.topBar}>
        <Box sx={catalogPageSx.topBarSearch}>
          <UsersSearch value={searchQuery} onChange={onSearchChange} />
        </Box>
        <Box sx={catalogPageSx.topBarActions}>
          {filter}
          {action}
        </Box>
      </Box>
      {errorMessage ? (
        <Typography color="error.main">{errorMessage}</Typography>
      ) : null}
      {loading ? <PageLoader /> : children}
    </Box>
  );
}
