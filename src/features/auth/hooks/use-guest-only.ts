"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthToken from "./use-auth-token";

function useGuestOnly() {
  const router = useRouter();
  const token = useAuthToken();

  const isGuest = !token;

  useEffect(() => {
    if (token) {
      router.replace("/users");
    }
  }, [token, router]);

  return { isGuest };
}

export default useGuestOnly;
