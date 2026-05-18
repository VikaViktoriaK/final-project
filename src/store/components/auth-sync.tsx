"use client";

import { useEffect } from "react";
import {
  getAccessToken,
  getAuthUser,
  getRefreshToken,
  subscribeToAuthTokens,
} from "@/features/auth/lib/auth-storage";
import { useAppDispatch } from "../hooks";
import { clearSession, hydrateFromStorage } from "../slices/auth-slice";

function readAuthFromStorage() {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    user: getAuthUser(),
  };
}

function AuthSync() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateFromStorage(readAuthFromStorage()));

    return subscribeToAuthTokens(() => {
      const session = readAuthFromStorage();
      if (!session.accessToken) {
        dispatch(clearSession());
        return;
      }
      dispatch(hydrateFromStorage(session));
    });
  }, [dispatch]);

  return null;
}

export default AuthSync;
