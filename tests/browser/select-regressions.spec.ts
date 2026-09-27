import { test, expect } from "@playwright/test";

test("Select popover grows to fit an option longer than a compact trigger", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#showcase");
  const toolbar = page.locator(".toolbar-demo");
  await toolbar.scrollIntoViewIfNeeded();
  const trigger = toolbar.getByRole("button", { name: "Branch" });
  const triggerBox = (await trigger.boundingBox())!;
  await trigger.click();
  const shortOption = page.getByRole("option", { name: "All branches" });
  const longOption = page.getByRole("option", {
    name: "North Campus Multi Speciality Branch",
  });
  await expect(longOption).toBeVisible();
  const shortBox = (await shortOption.boundingBox())!;
  const longBox = (await longOption.boundingBox())!;
  // Wrapped text would make the long option several times taller than the
  // short one; equal heights prove it rendered on a single line.
  expect(Math.abs(longBox.height - shortBox.height)).toBeLessThan(2);
  const popoverBox = (await page.locator(".rw-select-popover").boundingBox())!;
  expect(popoverBox.width).toBeGreaterThan(triggerBox.width);
});

test("hideLabel keeps a Select flush with buttons in a toolbar", async ({
  page,
}) => {
  await page.goto("/#showcase");
  const toolbar = page.locator(".toolbar-demo");
  await toolbar.scrollIntoViewIfNeeded();
  const branchTrigger = toolbar.getByRole("button", { name: "Branch" });
  const exportButton = toolbar.getByRole("button", { name: "Export" });
  const branchBox = (await branchTrigger.boundingBox())!;
  const exportBox = (await exportButton.boundingBox())!;
  const branchCenter = branchBox.y + branchBox.height / 2;
  const exportCenter = exportBox.y + exportBox.height / 2;
  expect(Math.abs(branchCenter - exportCenter)).toBeLessThan(2);
  // The accessible name still resolves to "Branch"; the visible label text
  // must be clipped to a 1px sr-only box, not laid out at full size.
  const labelBox = (
    await toolbar.getByText("Branch", { exact: true }).boundingBox()
  )!;
  expect(labelBox.width).toBeLessThanOrEqual(1);
});
