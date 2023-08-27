import { Page, Locator } from "@playwright/test";

const locators = {
  activeBreadcrumb: `xpath=//ul[contains(@class, "breadcrumbs")]/li[contains(@class, "active")]/span`,
};

export class Base {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async activeBreadcrumb() {
    return this.page.locator(locators.activeBreadcrumb).textContent();
  }

  async goto(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState();
  }

  async reload() {
    await this.page.reload();
    await this.page.waitForLoadState();
  }

  protected convertToNumber(text: string | null): number {
    if (text) {
      return parseFloat(text.trim().replace(",", "."));
    } else {
      return 0.0;
    }
  }
}
