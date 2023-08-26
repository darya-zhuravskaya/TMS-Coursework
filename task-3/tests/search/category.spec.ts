import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://oz.by/');
  await page.waitForLoadState()
});

test.describe('Searching by existing category', () => {
  test('when clicking on dropdown item', async ({ page }) => {
    const search = page.locator(`xpath=//input[@id="top-s"]`)
    await search.fill("Бизнес-литература")
    await page.waitForLoadState("networkidle")
    await page.locator(`xpath=//ul[contains(@class, "search-suggest")]/li`).filter({hasText: /^Бизнес-литература$/}).click()
    await page.waitForLoadState()
    const categoryName = await page.locator(`xpath=//section[@class="landing-header"]//h1`).textContent()

    expect(categoryName?.trim()).toBe("Бизнес-литература")
  });

  test('when pressing enter', async ({ page }) => {
    const search = page.locator(`xpath=//input[@id="top-s"]`)
    await search.fill("Бизнес-литература")
    await page.waitForLoadState("networkidle")
    await search.press("Enter")
    await page.waitForLoadState()
    const activeBreadcrumbs = await page.locator(`xpath=//ul[contains(@class, "breadcrumbs")]/li[contains(@class, "active")]`).textContent()

    expect(activeBreadcrumbs).toMatch(/Найдено \d+ товаров по запросу «Бизнес-литература»/)
  });

  test('when clicking on search button', async ({ page }) => {
    const search = page.locator(`xpath=//input[@id="top-s"]`)
    await search.fill("Бизнес-литература")
    await page.waitForLoadState("networkidle")
    await page.locator(`xpath=//span[@class="search-tools"]/button`).click()
    await page.waitForLoadState()
    const activeBreadcrumbs = await page.locator(`xpath=//ul[contains(@class, "breadcrumbs")]/li[contains(@class, "active")]/span`).textContent()

    expect(activeBreadcrumbs).toMatch(/Найдено? \d+ товар[а-я]* по запросу «Бизнес-литература»/)
  });

})


