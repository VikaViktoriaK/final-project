"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthToken from "./use-auth-token";

function useRequireAuth() {
  const router = useRouter();
  const token = useAuthToken();

  const isChecking = token === undefined;
  const isAuthorized = typeof token === "string";

  useEffect(() => {
    if (token === null) {
      router.replace("/login");
    }
  }, [token, router]);

  return { isChecking, isAuthorized };
}

export default useRequireAuth;
