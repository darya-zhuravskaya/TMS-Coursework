import { Page, Locator } from "@playwright/test"

const locators = {
 categoryName: `xpath=//section[@class="landing-header"]//h1`
};

export class Category {
    private page: Page;
    

    constructor(page: Page) {
        this.page = page;
       
    }

   async name(){
    const name =  await this.page.locator(locators.categoryName).textContent()
    return name?.trim()
   }
}