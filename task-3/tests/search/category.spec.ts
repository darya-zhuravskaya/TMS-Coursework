import { test, expect } from "@playwright/test";
import { SearchBar } from "../../pages/SearchBar";
import { Category } from "../../pages/Category";
import { Base } from "../../pages/Base";

let searchBar: SearchBar;

test.beforeEach(async ({ page }) => {
  searchBar = new SearchBar(page);
  await searchBar.goto("https://oz.by/");
});

test.describe("Searching by existing category", () => {
  test("when clicking on dropdown item", async ({ page }) => {
    await searchBar.fillInSearchField("Бизнес-литература");
    await searchBar.clickOnResult(/^Бизнес-литература$/);

    const category = new Category(page);

    expect(await category.name()).toBe("Бизнес-литература");
  });

  test("when pressing enter", async ({ page }) => {
    await searchBar.fillInSearchField("Бизнес-литература");
    await searchBar.searchByEnter();

    const searchResults = new Base(page);

    expect(await searchResults.activeBreadcrumb()).toMatch(
      /Найден[а-я]* \d+ товар[а-я]* по запросу «Бизнес-литература»/,
    );
  });

  test("when clicking on search button", async ({ page }) => {
    await searchBar.fillInSearchField("Бизнес-литература");

    await searchBar.searchByButton();
    const searchResults = new Base(page);
    expect(await searchResults.activeBreadcrumb()).toMatch(
      /Найдено? \d+ товар[а-я]* по запросу «Бизнес-литература»/,
    );
  });
});
