"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearAuthTokens } from "../lib/auth-storage";
import isAuthFailure from "../lib/is-auth-failure";

function useAuthErrorRedirect(error: unknown) {
  const router = useRouter();

  useEffect(() => {
    if (!error || !isAuthFailure(error)) {
      return;
    }
    clearAuthTokens();
    router.replace("/login");
  }, [error, router]);
}

export default useAuthErrorRedirect;
