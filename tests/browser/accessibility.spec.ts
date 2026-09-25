import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import examples from "../../showcase/examples.json" with { type: "json" };
for (const theme of ["light", "dark"])
  test(`all component examples: ${theme} accessibility`, async ({ page }) => {
    test.setTimeout(120000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#/components/button");
    if (theme === "dark")
      await page.getByText("Dark mode", { exact: true }).click();
    const failures: unknown[] = [];
    for (const name of Object.keys(examples)) {
      const id = name.replace(
        /[A-Z]/g,
        (c, i) => (i ? "-" : "") + c.toLowerCase(),
      );
      await page.evaluate((hash) => {
        location.hash = hash;
      }, `#/components/${id}`);
      await expect(page.locator(".docs-heading h1")).toHaveText(name);
      const scan = await new AxeBuilder({ page })
        .include(".docs-example")
        .analyze();
      if (scan.violations.length)
        failures.push({
          name,
          violations: scan.violations.map((v) => ({
            rule: v.id,
            nodes: v.nodes.map((n) => ({
              html: n.html,
              summary: n.failureSummary,
            })),
          })),
        });
    }
    expect(failures).toEqual([]);
  });
