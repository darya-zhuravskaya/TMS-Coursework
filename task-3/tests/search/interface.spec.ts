import { test, expect } from "@playwright/test";

import { SearchBar } from "../../pages/SearchBar";

test.beforeEach(async ({ page }) => {
  await page.goto("https://oz.by/");
  await page.waitForLoadState();
});

test.describe("Cleaning search field", () => {
  test("when contains some text", async ({ page }) => {
    const searchBar = new SearchBar(page);

    await searchBar.searchField.focus();
    expect(searchBar.cleanButton).toBeHidden();

    await searchBar.fillInSearchField("123452345");

    expect(searchBar.cleanButton).toBeVisible();

    await searchBar.cleanButton.click();

    expect(searchBar.cleanButton).toBeHidden();
    expect(searchBar.searchField).toBeEmpty();
  });
});
