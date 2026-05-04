import { expect, test, type Page } from "@playwright/test";

const sections = ["hero", "servicios", "contacto"] as const;

async function assertPageIsRenderable(page: Page) {
    await expect(page.locator("body")).toBeVisible();
    const box = await page.locator("body").boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(300);
    expect(box?.height ?? 0).toBeGreaterThan(600);

    const bodyText = await page.locator("body").innerText();
    expect(bodyText.length).toBeGreaterThan(100);
}

test.describe("motion/parallax stability", () => {
    test("main landing sections render while scrolling without browser errors", async ({ page }, testInfo) => {
        const errors: string[] = [];
        page.on("console", (message) => {
            if (message.type() === "error") errors.push(message.text());
        });
        page.on("pageerror", (error) => errors.push(error.message));

        await page.goto("/", { waitUntil: "networkidle" });
        await assertPageIsRenderable(page);

        for (const section of sections) {
            const locator = page.locator(`#${section}`);
            await expect(locator).toBeVisible();
            await locator.scrollIntoViewIfNeeded();
            await page.waitForTimeout(350);
            await expect(locator).toBeVisible();
            await testInfo.attach(`${section}-${testInfo.project.name}.png`, {
                body: await page.screenshot({ fullPage: false }),
                contentType: "image/png",
            });
        }

        expect(errors).toEqual([]);
    });

    test("idle frames remain stable after scroll settles", async ({ page }, testInfo) => {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.locator("#servicios").scrollIntoViewIfNeeded();
        await page.waitForTimeout(700);

        const before = await page.screenshot({ fullPage: false });
        await page.waitForTimeout(350);
        const after = await page.screenshot({ fullPage: false });
        await testInfo.attach(`idle-before-${testInfo.project.name}.png`, {
            body: before,
            contentType: "image/png",
        });

        expect(before.length).toBeGreaterThan(10_000);
        expect(after.length).toBeGreaterThan(10_000);

        const delta = Math.abs(before.length - after.length) / Math.max(before.length, after.length);
        expect(delta).toBeLessThan(0.12);
    });

    test("reduced motion keeps decorative backgrounds calm", async ({ page, browserName }, testInfo) => {
        test.skip(browserName !== "chromium", "Reduced motion audit is calibrated for Chromium.");
        test.skip(testInfo.project.name !== "reduced-motion", "Runs only in the reduced-motion project.");

        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto("/", { waitUntil: "networkidle" });
        await page.locator("#hero").scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const reducedMotion = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
        expect(reducedMotion).toBe(true);

        const animatedBackgrounds = await page.locator("[data-motion-audit='decorative-background']").count();
        expect(animatedBackgrounds).toBeGreaterThan(0);
    });
});
