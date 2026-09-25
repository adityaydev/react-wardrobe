import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("showcase controls, accessibility, and responsive layout", async ({
  page,
}) => {
  await page.goto("/#showcase");
  await expect(
    page.getByRole("heading", { name: /Good interfaces/ }),
  ).toBeVisible();
  await expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
    [],
  );
  await page.screenshot({
    path: "test-results/showcase-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Open example dialog" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Simulate a live event" }).click();
  await expect(
    page.getByText("A new appointment just arrived").first(),
  ).toBeVisible();
  await page.getByText("Dark mode", { exact: true }).click();
  await expect(page.getByRole("switch", { name: "Dark mode" })).toBeChecked();
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    ),
  );
  await expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
    [],
  );
  await page.screenshot({
    path: "test-results/showcase-dark.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.screenshot({
    path: "test-results/showcase-mobile.png",
    fullPage: true,
  });
});

test("custom inputs, themed portals and opt-in sound", async ({ page }) => {
  await page.goto("/#showcase");
  await page.getByRole("button", { name: /Appointment type/ }).click();
  await page.getByRole("option", { name: /Follow-up review/ }).click();
  await expect(
    page.getByRole("button", { name: /Appointment type/ }),
  ).toContainText("Follow-up review");
  await page
    .getByRole("button", { name: "Increase Duration (minutes)" })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Duration (minutes)" }),
  ).toHaveValue("45");
  await page.getByRole("button", { name: /Preferred date/ }).click();
  await expect(page.getByRole("grid")).toBeVisible();
  await expect(
    page.locator('.rw-popover[data-trigger="DatePicker"]'),
  ).not.toHaveAttribute("data-entering", "true");
  await expect(
    (await new AxeBuilder({ page }).include(".rw-calendar-dialog").analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Notifications, 0 unread" })
    .first()
    .click();
  await page.getByRole("button", { name: "Enable sound" }).click();
  await expect(page.getByRole("button", { name: "Mute sound" })).toBeVisible();
  await page.getByRole("button", { name: "Mute sound" }).click();
  await expect(
    page.getByRole("button", { name: "Enable sound" }),
  ).toBeVisible();
});
