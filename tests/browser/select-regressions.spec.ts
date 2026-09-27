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
  const labelBox = (await toolbar
    .getByText("Branch", { exact: true })
    .boundingBox())!;
  expect(labelBox.width).toBeLessThanOrEqual(1);
});

const overflowingLabel =
  "North Campus Multi Speciality Branch with additional services and extended opening hours";

test("viewport-capped Select labels have a constrained ellipsis box", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#showcase");
  await page
    .locator(".toolbar-demo")
    .getByRole("button", { name: "Branch" })
    .click();
  const label = page
    .getByRole("option", { name: "North Campus Multi Speciality Branch" })
    .locator('[slot="label"]');
  // Change only the text to exercise overflow in the actual component markup.
  await label.evaluate((el, text) => {
    el.textContent = text;
  }, overflowingLabel);
  const layout = await label.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      width: el.clientWidth,
      scrollWidth: el.scrollWidth,
      height: el.getBoundingClientRect().height,
      lineHeight: parseFloat(style.lineHeight),
      overflow: style.overflow,
      textOverflow: style.textOverflow,
    };
  });
  expect(layout.width).toBeGreaterThan(0);
  expect(layout.scrollWidth).toBeGreaterThan(layout.width);
  expect(layout.height).toBeLessThanOrEqual(layout.lineHeight + 1);
  expect(layout.overflow).toBe("hidden");
  expect(layout.textOverflow).toBe("ellipsis");
  const box = (await page.locator(".rw-select-popover").boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(320);
});

for (const component of ["list-box", "command-palette"]) {
  test(`${component} long option labels still wrap`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(`/#/components/${component}`);
    if (component === "command-palette") {
      await page
        .getByRole("button", { name: "Search commands", exact: true })
        .click();
      await page
        .getByRole("combobox", { name: "Search commands" })
        .fill("Create");
      await page.keyboard.press("ArrowDown");
    }
    const label = page.locator(".rw-option").first().locator('[slot="label"]');
    await expect(label).toBeVisible();
    await label.evaluate((el, text) => {
      el.textContent = text;
    }, overflowingLabel);
    const layout = await label.evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return {
        lines: range.getClientRects().length,
        whiteSpace: getComputedStyle(el).whiteSpace,
        overflow: getComputedStyle(el.parentElement!).overflow,
      };
    });
    expect(layout.lines).toBeGreaterThan(1);
    expect(layout.whiteSpace).toBe("normal");
    expect(layout.overflow).toBe("visible");
  });
}
