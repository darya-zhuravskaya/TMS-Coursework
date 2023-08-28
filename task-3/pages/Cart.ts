import { Page, Locator } from "@playwright/test";
import { Base } from "./Base";

const locators = {
  productsCount: `xpath=//span[@data-user-bar-target="cartCounter"]`,
  bonuses: `xpath=//div[@id="header-bonus-account"]`,
};

export class Cart extends Base {
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
    return this.convertToNumber(bonuses);
  }
}
