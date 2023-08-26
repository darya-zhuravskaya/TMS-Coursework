import { Page, Locator } from "@playwright/test"

const locators = {
    activeBreadcrumb: `xpath=//ul[contains(@class, "breadcrumbs")]/li[contains(@class, "active")]/span`,
  

};

export class Base {
    private page: Page;
    

    constructor(page: Page) {
        this.page = page;
       
    }

   async activeBreadcrumb(){
    return this.page.locator(locators.activeBreadcrumb).textContent()
   }
}