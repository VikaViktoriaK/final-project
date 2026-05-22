import { expect, type Page } from "@playwright/test";
import { waitForGraphQLOperation } from "./graphql";
import { getE2eConfig } from "./env";

const ACCESS_TOKEN_KEY = "hrm_access_token";
const REFRESH_TOKEN_KEY = "hrm_refresh_token";
const AUTH_USER_KEY = "hrm_auth_user";

export async function loginViaUi(page: Page) {
  const { email, password } = getE2eConfig();

  await page.goto("/login");
  await expect(page.getByTestId("login-form")).toBeVisible();

  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);

  await waitForGraphQLOperation(page, "Login", () =>
    page.getByTestId("login-submit").click(),
  );

  await expect(page).toHaveURL(/\/users$/);
  await expect(page.getByTestId("users-table")).toBeVisible();
}

export async function logoutViaUi(page: Page) {
  await page.getByTestId("user-menu-trigger").click();
  await expect(page.getByTestId("logout-menu-item")).toBeVisible();

  await page.getByTestId("logout-menu-item").click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByTestId("login-form")).toBeVisible();
}

export async function expectAuthStorageCleared(page: Page) {
  const tokens = await page.evaluate(
    (keys) => keys.map((key) => localStorage.getItem(key)),
    [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, AUTH_USER_KEY],
  );

  expect(tokens.every((value) => value === null)).toBe(true);
}

export async function expectAuthStoragePresent(page: Page) {
  const accessToken = await page.evaluate(
    (key) => localStorage.getItem(key),
    ACCESS_TOKEN_KEY,
  );

  expect(accessToken).toBeTruthy();
}
