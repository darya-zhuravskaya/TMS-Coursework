import { Page, Locator } from "@playwright/test";
import { Base } from "./Base";

const locators = {
  searchField: `xpath=//input[@id="top-s"]`,
  cleanButton: `xpath=//span[@class="search-tools"]//div[@class="reset"]`,
  searchResult: `xpath=//ul[contains(@class, "search-suggest")]/li`,
  searchButton: `xpath=//span[@class="search-tools"]/button`,
};

export class SearchBar extends Base {
  searchField: Locator;
  cleanButton: Locator;
  searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchField = this.page.locator(locators.searchField);
    this.cleanButton = this.page.locator(locators.cleanButton);
    this.searchButton = this.page.locator(locators.searchButton);
  }

  async fillInSearchField(text: string) {
    await this.searchField.focus();
    await this.page.keyboard.type(text);
    await this.page.waitForLoadState("networkidle");
  }

  async searchByEnter() {
    await this.searchField.focus();
    await this.searchField.press("Enter");
    await this.page.waitForLoadState();
  }

  async clickOnResult(text: string | RegExp) {
    const element = this.page
      .locator(locators.searchResult)
      .filter({ hasText: text });
    await element.click();
    await this.page.waitForLoadState();
  }

  async searchByButton() {
    await this.searchButton.click();
    await this.page.waitForLoadState();
  }
}
