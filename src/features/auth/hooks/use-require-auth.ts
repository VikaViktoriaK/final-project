"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthToken from "./use-auth-token";

function useRequireAuth() {
  const router = useRouter();
  const token = useAuthToken();

  const isAuthorized = Boolean(token);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return { isAuthorized };
}

export default useRequireAuth;
