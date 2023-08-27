import { Page, Locator } from "@playwright/test";

import { Base } from "./Base";

const locators = {
  productName: `xpath=//div[@class="b-product-title"]//h1`,
  productCode: `xpath=//span[@class="b-product-title__art"]`,
  addToCartButton: `xpath=//button[contains(@class, "addtocart-btn")]`,
  bonuses: `xpath=//div[@class='b-product__controls']//div[@class='bonus-label__count']`,
  addedToCartMessage: `xpath=//a[contains(@class, "second-button")]//span[contains(@class, 'text')]`,
};

export class Product extends Base {
  readonly addToCartButton: Locator;
  readonly addedToCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = this.page.locator(locators.addToCartButton);
    this.addedToCartMessage = this.page.locator(locators.addedToCartMessage);
  }

  async name() {
    return this.page.locator(locators.productName).textContent();
  }

  async code() {
    return this.page.locator(locators.productCode).textContent();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForTimeout(300);
  }

  async bonuses() {
    const bonuses = await this.page
      .locator(locators.bonuses)
      .first()
      .textContent();

    return this.convertToNumber(bonuses);
  }
}
