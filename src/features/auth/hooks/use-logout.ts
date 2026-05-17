"use client";
import { useRouter } from "next/navigation";
import { clearAuthTokens } from "../lib/auth-storage";

function useLogout() {
  const router = useRouter();

  const logoutUser = () => {
    clearAuthTokens();
    router.replace("/login");
  };

  return { logoutUser };
}

export default useLogout;
