import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const visit = async (page: import("@playwright/test").Page, name: string) => {
  await page.goto(`/#/components/${name}`);
  await expect(page.locator(".docs-heading h1")).toBeVisible();
};
test("all catalogue pages render without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await visit(page, "button");
  const links = await page
    .locator(".docs-sidebar nav a")
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")!));
  expect(links.length).toBeGreaterThanOrEqual(60);
  for (const href of links) {
    await page.goto(`/${href}`);
    await expect(page.locator(".docs-example")).toBeVisible();
    await expect(page.locator("#docs-usage code")).not.toBeEmpty();
  }
  expect(errors).toEqual([]);
});
test("documentation accessibility, navigation, themes and mobile", async ({
  page,
}) => {
  await visit(page, "data-grid");
  await expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
    [],
  );
  await page.screenshot({
    path: "test-results/library-desktop.png",
    fullPage: true,
  });
  await page.getByText("Dark mode", { exact: true }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
    [],
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "ComboBox", exact: true }).click();
  await expect(page.locator(".docs-heading h1")).toHaveText("ComboBox");
  await page.screenshot({
    path: "test-results/library-mobile.png",
    fullPage: true,
  });
});
test("searchable selection, multi-selection and command activation", async ({
  page,
}) => {
  await visit(page, "combo-box");
  const combo = page.getByRole("combobox", { name: "Search teams" });
  await combo.scrollIntoViewIfNeeded();
  await combo.click();
  await combo.pressSequentially("Bet");
  await page.getByRole("option", { name: "Beta" }).click();
  await expect(combo).toHaveValue("Beta");
  await visit(page, "multi-select");
  await page.getByRole("button", { name: /Teams/ }).click();
  await page.getByRole("option", { name: "Alpha" }).click();
  await page.getByRole("option", { name: "Beta" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /Teams/ })).toContainText(
    "Alpha",
  );
  await expect(page.getByRole("button", { name: /Teams/ })).toContainText(
    "Beta",
  );
  await visit(page, "command-palette");
  await page.getByRole("button", { name: "Search commands" }).click();
  await page
    .getByRole("combobox", { name: "Search commands" })
    .fill("settings");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByText("Settings selected").first()).toBeVisible();
});
test("drawer focus and grid column visibility", async ({ page }) => {
  await visit(page, "drawer");
  await page.getByRole("button", { name: "Open drawer" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open drawer" })).toBeFocused();
  await visit(page, "data-grid");
  await page.getByRole("button", { name: "Columns", exact: true }).click();
  await page.getByText("Role", { exact: true }).last().click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("columnheader", { name: "Role" })).toHaveCount(0);
  await page.getByRole("button", { name: "Details for Alex Morgan" }).click();
  await expect(
    page.getByText("Alex Morgan · Additional record details."),
  ).toBeVisible();
});

test("range dates, sliders and tree keyboard interaction", async ({ page }) => {
  await visit(page, "range-calendar");
  const cells = page.locator(".docs-example .rw-calendar-cell");
  await cells.filter({ hasText: /^10$/ }).click();
  await cells.filter({ hasText: /^15$/ }).click();
  await expect(
    page.locator(".docs-example .rw-calendar-cell[data-selected]"),
  ).toHaveCount(6);
  await visit(page, "slider");
  const thumb = page.getByRole("slider", { name: "Volume" });
  await thumb.focus();
  await page.keyboard.press("ArrowRight");
  await expect(thumb).toHaveValue("41");
  await visit(page, "tree");
  const source = page.getByRole("row", { name: /Source/ });
  await source.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("Components", { exact: true })).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await expect(page.getByRole("row", { name: /Components/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
test("open command palette and drawer retain accessible semantics", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [component, trigger] of [
    ["command-palette", "Search commands"],
    ["drawer", "Open drawer"],
    ["confirm-dialog", "Remove record"],
  ]) {
    await visit(page, component);
    await page.getByRole("button", { name: trigger, exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      (await new AxeBuilder({ page }).include('[role="dialog"]').analyze())
        .violations,
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
});
