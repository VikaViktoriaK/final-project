"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import useCv from "../hooks/use-cv";
import { canManageCv } from "../utils/cv-permissions";
import type { Cv } from "../types";

type CvContextValue = {
  cvId: string;
  cv: Cv | null;
  loading: boolean;
  error?: Error;
  canEdit: boolean;
};

const CvContext = createContext<CvContextValue | null>(null);

type CvProviderProps = {
  cvId: string;
  children: ReactNode;
};

function CvProvider({ cvId, children }: CvProviderProps) {
  const { cv, loading, error } = useCv(cvId);

  const value = useMemo(
    () => ({
      cvId,
      cv,
      loading,
      error,
      canEdit: cv ? canManageCv(cv) : false,
    }),
    [cvId, cv, loading, error],
  );

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
}

function useCvContext() {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("useCvContext must be used within CvProvider");
  }
  return context;
}

export { CvProvider, useCvContext };
