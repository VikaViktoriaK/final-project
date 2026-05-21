import * as React from "react";
import { SIDEBAR_STORAGE_KEY } from "./sidebar.constants";

type SidebarCollapseContextValue = {
  collapsed: boolean;
  toggle: () => void;
};

const SidebarCollapseContext =
  React.createContext<SidebarCollapseContextValue | null>(null);

const collapseListeners = new Set<() => void>();

function readCollapsedFromStorage(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeCollapsedToStorage(collapsed: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, collapsed ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function subscribeCollapsed(onStoreChange: () => void) {
  collapseListeners.add(onStoreChange);
  return () => {
    collapseListeners.delete(onStoreChange);
  };
}

function notifyCollapsedChange() {
  collapseListeners.forEach((listener) => listener());
}

function getCollapsedServerSnapshot(): boolean {
  return false;
}

export function SidebarCollapseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const collapsed = React.useSyncExternalStore(
    subscribeCollapsed,
    readCollapsedFromStorage,
    getCollapsedServerSnapshot,
  );

  const toggle = React.useCallback(() => {
    writeCollapsedToStorage(!readCollapsedFromStorage());
    notifyCollapsedChange();
  }, []);

  const value = React.useMemo(
    () => ({ collapsed, toggle }),
    [collapsed, toggle],
  );

  return (
    <SidebarCollapseContext.Provider value={value}>
      {children}
    </SidebarCollapseContext.Provider>
  );
}

export function useSidebarCollapse(): SidebarCollapseContextValue {
  const ctx = React.useContext(SidebarCollapseContext);
  if (!ctx) {
    throw new Error(
      "useSidebarCollapse must be used within SidebarCollapseProvider",
    );
  }
  return ctx;
}
