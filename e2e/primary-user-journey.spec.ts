import { expect, test } from "@playwright/test";
import {
  expectAuthStorageCleared,
  expectAuthStoragePresent,
  loginViaUi,
  logoutViaUi,
} from "./helpers/auth";
import { getE2eConfig } from "./helpers/env";
import { waitForGraphQLOperation } from "./helpers/graphql";

const config = getE2eConfig();

test.describe("Primary user journey", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(() => localStorage.clear());
  });

  test.skip(!config.isConfigured, "Set E2E_USER_EMAIL and E2E_USER_PASSWORD");

  test("completes login, users list, CV skills, add skill, and logout", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await loginViaUi(page);
    await expect(page.getByTestId("users-table")).toBeVisible();

    await waitForGraphQLOperation(page, "Cvs", () =>
      page.getByTestId("nav-cvs").click(),
    );
    await expect(page).toHaveURL(/\/cvs$/);
    await expect(page.getByTestId("cvs-table")).toBeVisible();

    const cvLink = config.cvName
      ? page.getByTestId("cv-link").filter({ hasText: config.cvName }).first()
      : page.getByTestId("cv-link").first();

    await expect(cvLink).toBeVisible();
    const cvName = (await cvLink.textContent())?.trim() ?? "";

    await cvLink.click();
    await expect(page).toHaveURL(/\/cvs\/[^/]+\/details$/);

    await page.getByTestId("cv-tab-skills").click();
    await expect(page).toHaveURL(/\/cvs\/[^/]+\/skills$/);

    const addSkillButton = page.getByTestId("add-skill-button").first();
    await expect(addSkillButton).toBeVisible();

    await addSkillButton.click();
    await expect(page.getByTestId("add-skill-dialog")).toBeVisible();

    await page.getByTestId("add-skill-select").click();

    const skillOption = config.skillName
      ? page.getByRole("option", { name: config.skillName })
      : page.locator(".MuiPopover-root .MuiMenuItem-root").first();

    await expect(skillOption).toBeVisible();
    const selectedSkillName = (await skillOption.textContent())?.trim() ?? "";
    await skillOption.click();
    await expect(page.getByTestId("add-skill-submit")).toBeEnabled();

    await waitForGraphQLOperation(page, "AddCvSkill", () =>
      page.getByTestId("add-skill-submit").click(),
    );

    await expect(page.getByTestId("add-skill-dialog")).toBeHidden();
    await expect(
      page.getByTestId(
        `skill-card-${selectedSkillName.toLowerCase().replace(/\s+/g, "-")}`,
      ),
    ).toBeVisible();

    await logoutViaUi(page);
    await expectAuthStorageCleared(page);

    expect(cvName.length).toBeGreaterThan(0);
  });

  test("logs in and loads the users list from GraphQL", async ({ page }) => {
    await loginViaUi(page);

    await waitForGraphQLOperation(page, "Users", async () => {
      await page.reload();
    });
    await expect(page.getByTestId("users-table")).toBeVisible();
    await expect(
      page.getByRole("table", { name: "users table" }),
    ).toBeVisible();
    await expectAuthStoragePresent(page);
  });

  test("redirects unauthenticated users from the dashboard to login", async ({
    page,
  }) => {
    await page.goto("/users");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  test("shows a login error when credentials are invalid", async ({ page }) => {
    await page.goto("/login");

    await page.getByTestId("login-email").fill("invalid@example.com");
    await page.getByTestId("login-password").fill("wrong-password");

    await waitForGraphQLOperation(page, "Login", () =>
      page.getByTestId("login-submit").click(),
    );

    await expect(page.getByTestId("login-error")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("logs out and clears the stored session", async ({ page }) => {
    await loginViaUi(page);
    await expectAuthStoragePresent(page);

    await logoutViaUi(page);
    await expectAuthStorageCleared(page);

    await page.goto("/users");
    await expect(page).toHaveURL(/\/login$/);
  });
});
