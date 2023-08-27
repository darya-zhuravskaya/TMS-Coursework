import { Page, Locator } from "@playwright/test";

import { Base } from "./Base";

import { logger } from "../log.config";

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
    logger.info("Getting product name");
    logger.debug(`Getting product name by locator: ${locators.productName}`);
    return this.page.locator(locators.productName).textContent();
  }

  async code() {
    logger.info("Getting product code");
    logger.debug(`Getting product code by locator: ${locators.productCode}`);
    return this.page.locator(locators.productCode).textContent();
  }

  async addToCart() {
    logger.info("Adding a product to the cart");
    logger.debug(
      `Adding a product to the cart clicking on the button: ${locators.addToCartButton}`,
    );
    await this.addToCartButton.click();
    await this.page.waitForTimeout(300);
  }

  async bonuses() {
    const bonuses = await this.page
      .locator(locators.bonuses)
      .first()
      .textContent();

    const number = this.convertToNumber(bonuses);

    logger.info(`Product ${await this.name()} has ${number} bonuses`);
    logger.debug(
      `Product ${await this.name()} has ${number} bonuses by locator ${
        locators.bonuses
      }`,
    );

    return number;
  }
}
