"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../lib/auth-storage";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return getAccessToken();
}

function getServerSnapshot() {
  return null;
}

function useRequireAuth() {
  const router = useRouter();
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isAuthorized = Boolean(token);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return { isAuthorized };
}

export default useRequireAuth;
