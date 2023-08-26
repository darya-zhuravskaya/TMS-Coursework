import { Page, Locator } from "@playwright/test"

const locators = {
 productName: `xpath=//div[@class="b-product-title"]//h1`,
 productCode: `xpath=//span[@class="b-product-title__art"]`
};

export class Product {
    private page: Page;
    

    constructor(page: Page) {
        this.page = page;
       
    }

   async name(){
    return this.page.locator(locators.productName).textContent()
   }

   async code(){
    return this.page.locator(locators.productCode).textContent()
   }
}