import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import uiReducer from "./slices/ui-slice";

function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

const store = makeStore();

type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

export { makeStore, store };
export type { AppStore, RootState, AppDispatch };
