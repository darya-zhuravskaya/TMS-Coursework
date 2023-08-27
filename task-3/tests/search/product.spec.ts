import { test, expect } from "@playwright/test";
import { SearchBar } from "../../pages/SearchBar";
import { Product } from "../../pages/Product";
import { Base } from "../../pages/Base";

test.beforeEach(async ({ page }) => {
  await page.goto("https://oz.by/");
  await page.waitForLoadState();
});

test.describe("Searching by product code", () => {
  test("when product code exists", async ({ page }) => {
    const searchBar = new SearchBar(page);
    await searchBar.fillInSearchField("1037397");
    await searchBar.searchByEnter();

    const product = new Product(page);

    expect(await product.name()).toContain(
      "Мышление стратега. Искусство бизнеса по-японски",
    );
    expect(await product.code()).toContain("1037397");
  });

  test("when product code does not exist", async ({ page }) => {
    const searchBar = new SearchBar(page);

    await searchBar.fillInSearchField("99999997643");
    await searchBar.searchByEnter();

    const searchResults = new Base(page);

    expect(await searchResults.activeBreadcrumb()).toMatch(
      /По запросу «99999997643» ничего не найдено/,
    );
  });
});

test.describe("Searching by product name", () => {
  test("when product name contains the term", async ({ page }) => {
    const searchBar = new SearchBar(page);
    await searchBar.fillInSearchField("панда");
    await searchBar.searchByEnter();

    const searchResults = new Base(page);

    expect(await searchResults.activeBreadcrumb()).toMatch(
      /Найдено \d+ товар[а-я]* по запросу «панда»/,
    );
  });
});
