import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { PageLoader } from "@/components/PageLoader";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { CatalogSearch } from "./CatalogSearch";

export type CatalogPageShellProps = {
  title: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter?: ReactNode;
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
    <Box sx={catalogPageSx.catalogPageContainer}>
      <Breadcrumbs aria-label="breadcrumb" sx={catalogPageSx.breadcrumbs}>
        <Typography component="span" sx={catalogPageSx.breadcrumbItemActive}>
          {title}
        </Typography>
      </Breadcrumbs>
      <Box sx={catalogPageSx.topBar}>
        <Box sx={catalogPageSx.topBarSearch}>
          <CatalogSearch value={searchQuery} onChange={onSearchChange} />
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
