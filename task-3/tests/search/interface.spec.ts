import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://oz.by/');
  await page.waitForLoadState()
});

test.describe('Cleaning search field', () => {
  test('when contains some text', async ({ page }) => {
    const search = page.locator(`xpath=//input[@id="top-s"]`)
    await search.focus()
    const cleanButton =  page.locator(`xpath=//span[@class="search-tools"]//div[@class="reset"]`)

    expect(cleanButton).toBeHidden()

    await page.keyboard.type('1245345345');

    expect(cleanButton).toBeVisible()
    await cleanButton.click()
    expect(cleanButton).toBeHidden()
    expect(search).toBeEmpty()
  });
})


