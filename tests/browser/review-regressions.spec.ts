import { test, expect } from "@playwright/test";

test("mixed page selection has a visible indicator in both themes", async ({
  page,
}) => {
  await page.goto("/#/components/data-grid");
  const row = page.getByRole("checkbox", { name: "Select Alex Morgan" });
  await row.focus();
  await row.press("Space");
  const header = page.getByRole("checkbox", { name: "Select current page" });
  await expect(header).toBeChecked({ indeterminate: true });
  for (const dark of [false, true]) {
    if (dark) await page.getByText("Dark mode", { exact: true }).click();
    const indicator = await header.evaluate((el) => {
      const box = el.closest("label")!.querySelector(".rw-checkbox-box")!;
      const style = getComputedStyle(box, "::after");
      return {
        content: style.content,
        width: style.width,
        height: style.height,
        background: style.backgroundColor,
        boxBackground: getComputedStyle(box).backgroundColor,
      };
    });
    expect(indicator.content).toBe('""');
    expect(indicator.width).toBe("10px");
    expect(indicator.height).toBe("2px");
    expect(indicator.background).not.toBe(indicator.boxBackground);
  }
  await row.focus();
  await row.press("Space");
  await expect(header).not.toBeChecked();
});

test("Back and Forward restore gallery section and documentation", async ({
  page,
}) => {
  await page.goto("/#showcase");
  await page
    .getByRole("link", { name: "Inputs & controls", exact: true })
    .click();
  await page.getByRole("link", { name: "Component documentation", exact: true }).click();
  await expect(page.locator(".docs-heading")).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/#controls$/);
  await expect(page.locator(".collection")).toBeVisible();
  await expect(page.locator(".docs-heading")).toHaveCount(0);
  await page.goForward();
  await expect(page.locator(".docs-heading")).toBeVisible();
  await page.reload();
  await expect(page.locator(".docs-heading")).toBeVisible();
});

test("toast dismissal waits until both hover and keyboard focus leave", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/#/components/notification-center");
  await page.getByRole("button", { name: "Send notification" }).click();
  const toast = page.locator(".rw-toast");
  const dismiss = page.getByRole("button", { name: "Dismiss New update" });
  await toast.hover();
  await dismiss.focus();
  await page.locator(".docs-brand").hover();
  await page.clock.runFor(8000);
  await expect(dismiss).toBeFocused();
  await toast.hover();
  await page.getByRole("button", { name: "Send notification" }).focus();
  await page.clock.runFor(8000);
  await expect(toast).toBeVisible();
  await page.locator(".docs-brand").hover();
  await page.clock.runFor(7001);
  await expect(toast).toHaveCount(0);
});
