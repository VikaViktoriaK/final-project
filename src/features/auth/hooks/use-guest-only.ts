"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthToken from "./use-auth-token";

function useGuestOnly() {
  const router = useRouter();
  const token = useAuthToken();

  const isChecking = token === undefined;
  const isGuest = token === null;

  useEffect(() => {
    if (typeof token === "string") {
      router.replace("/users");
    }
  }, [token, router]);
  return { isChecking, isGuest };
}

export default useGuestOnly;
