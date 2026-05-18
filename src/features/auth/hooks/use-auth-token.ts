"use client";

import { useSyncExternalStore } from "react";
import { useAppSelector } from "@/store/hooks";

function getServerSnapshot() {
  return undefined;
}

function useAuthToken() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const isHydrated = useAppSelector((state) => state.auth.isHydrated);

  const tokenFromStore = useSyncExternalStore(
    () => () => {},
    () => (isHydrated ? accessToken : undefined),
    getServerSnapshot,
  );

  return tokenFromStore;
}

export default useAuthToken;
