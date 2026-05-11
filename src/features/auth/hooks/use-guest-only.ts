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

function useGuestOnly() {
  const router = useRouter();
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isGuest = !token;

  useEffect(() => {
    if (token) {
      router.replace("/employees");
    }
  }, [token, router]);

  return { isGuest };
}

export default useGuestOnly;
