import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";
import { PreferencesProvider } from "@/lib/preferences/PreferencesProvider";

export function TestProviders({ children }: { children: ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: TestProviders, ...options }),
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
