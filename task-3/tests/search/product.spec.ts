import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://oz.by/');
  await page.waitForLoadState()
});

test.describe('Searching by product code', () => {
  test('when product code exists', async ({ page }) => {
    const search = page.locator(`xpath=//input[@id="top-s"]`)
    await search.fill("1037397")
    await search.press("Enter")
    await page.waitForLoadState()
    const productName = await page.locator(`xpath=//div[@class="b-product-title"]//h1`).textContent()
    const productCode = await page.locator(`xpath=//span[@class="b-product-title__art"]`).textContent()

    expect(productName).toContain("Мышление стратега. Искусство бизнеса по-японски")
    expect(productCode).toContain("1037397")
  });

  test('when product code does not exist', async ({ page }) => {
    const search = page.locator(`xpath=//input[@id="top-s"]`)
    await search.fill("99999997643")
    await search.press("Enter")
    await page.waitForLoadState()
    const activeBreadcrumbs = await page.locator(`xpath=//ul[contains(@class, "breadcrumbs")]/li[contains(@class, "active")]`).textContent()

    expect(activeBreadcrumbs).toMatch(/По запросу «99999997643» ничего не найдено/)
  });

})

test.describe('Searching by product name', () => {
  test('when product name contains the term', async ({ page }) => {
    const search = page.locator(`xpath=//input[@id="top-s"]`)
    await search.fill("панда")
    await search.press("Enter")
    await page.waitForLoadState()
    const activeBreadcrumbs = await page.locator(`xpath=//ul[contains(@class, "breadcrumbs")]/li[contains(@class, "active")]/span`).textContent()

    expect(activeBreadcrumbs).toMatch(/Найдено \d+ товар[а-я]* по запросу «панда»/)
  });
})


