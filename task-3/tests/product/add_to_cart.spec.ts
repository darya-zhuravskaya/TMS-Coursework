import { test, expect } from "@playwright/test";
import { Product } from "../../pages/Product";
import { Cart } from "../../pages/Cart";

const urls = [
  "https://oz.by/hairdryers/more101122354.html",
  "https://oz.by/sharpeners/more10839678.html",
];

test.describe("Adding product to a cart", () => {
  test("when no products added yet", async ({ page }) => {
    const productPage = new Product(page);
    await productPage.goto(urls[0]);
    await productPage.addToCart();

    expect(productPage.addToCartButton).toBeHidden();
    expect(productPage.addedToCartMessage).toBeVisible();

    const cart = new Cart(page);
    expect(await cart.productsCount()).toBe(1);

    expect(await cart.bonuses()).toBe(await productPage.bonuses());
  });

  test("when a product was already added", async ({ page }) => {
    const productPage = new Product(page);
    await productPage.goto(urls[0]);
    await productPage.addToCart();

    await productPage.reload();

    expect(productPage.addToCartButton).toBeHidden();
    expect(productPage.addedToCartMessage).toBeVisible();

    const cart = new Cart(page);
    expect(await cart.productsCount()).toBe(1);

    expect(await cart.bonuses()).toBe(await productPage.bonuses());
  });

  test("when adding two products", async ({ page }) => {
    const productPage = new Product(page);
    const productBonuses: number[] = [];

    await productPage.goto(urls[0]);

    productBonuses.push(await productPage.bonuses());

    await productPage.addToCart();

    expect(productPage.addToCartButton).toBeHidden();
    expect(productPage.addedToCartMessage).toBeVisible();

    await productPage.goto(urls[1]);

    productBonuses.push(await productPage.bonuses());

    await productPage.addToCart();

    expect(productPage.addToCartButton).toBeHidden();
    expect(productPage.addedToCartMessage).toBeVisible();

    const cart = new Cart(page);
    expect(await cart.productsCount()).toBe(2);

    let expectedBonus = 0;
    for (let bonus of productBonuses) {
      expectedBonus += bonus;
    }

    expect(await cart.bonuses()).toBe(expectedBonus);
  });
});
