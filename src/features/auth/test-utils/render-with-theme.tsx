import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ReactElement, ReactNode } from "react";

function ThemeWrapper({ children }: { children: ReactNode }) {
  const theme = createTheme({ palette: { mode: "dark" } });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: ThemeWrapper, ...options }),
  };
}

export async function typeIntoPlaceholder(
  user: ReturnType<typeof userEvent.setup>,
  placeholder: string,
  value: string,
) {
  const input = document.querySelector(
    `input[placeholder="${placeholder}"]`,
  ) as HTMLInputElement | null;

  if (!input) {
    throw new Error(`Input with placeholder "${placeholder}" not found`);
  }

  await user.clear(input);
  await user.type(input, value);
}
