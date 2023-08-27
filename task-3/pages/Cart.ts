import { Page, Locator } from "@playwright/test";

const locators = {
  productsCount: `xpath=//span[@data-user-bar-target="cartCounter"]`,
  bonuses: `xpath=//div[@id="header-bonus-account"]`,
};

export class Cart {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async productsCount() {
    const number = await this.page
      .locator(locators.productsCount)
      .textContent();

    if (number) {
      return parseInt(number);
    } else {
      return 0;
    }
  }

  async bonuses() {
    const bonuses = await this.page.locator(locators.bonuses).textContent();

    if (bonuses) {
      return parseFloat(bonuses.replace(",", "."));
    } else {
      return 0.0;
    }
  }
}
