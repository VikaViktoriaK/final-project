import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/features/auth/types/auth.types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateFromStorage(
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken: string | null;
        user: AuthUser | null;
      }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isHydrated = true;
    },
    setSession(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user?: AuthUser;
      }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      state.isHydrated = true;
    },
    clearSession(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isHydrated = true;
    },
  },
});

export const { hydrateFromStorage, setSession, clearSession } =
  authSlice.actions;
export default authSlice.reducer;
