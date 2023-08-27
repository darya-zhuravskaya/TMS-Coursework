import { Page, Locator } from "@playwright/test";
import { Base } from "./Base";

const locators = {
  openPopupButton: `xpath=//span[contains(text(), 'Войти')]`,
  popup: `xpath=//div[@id="loginPopup"]`,
  phoneTabButton: `xpath=//a[@id="loginFormLoginPhoneLink"]`,
  emailTabButton: `xpath=//a[@id="loginFormLoginEmailLink"]`,
  getSmsButton: `xpath=//form[@id="phoneForm"]/button`,
  emailFormSubmitButton: `xpath=//form[@id="loginForm"]/button`,
  phoneForm: `xpath=//form[@id="phoneForm"]`,
  phoneInput: `xpath=//input[@id="formInputLoginPhone"]`,
  verifyCodeButton: `xpath=//button[contains(text(), "Подтвердить и войти")]`,
  codeInput: `xpath=//input[@id="formInputLoginCode"]`,
  phoneFormErrors: `xpath=//form[@id="phoneForm"]//div[@class="i-popover__line"]`,
  emailFormErrors: `xpath=//form[@id="loginForm"]//div[@class="i-popover__line"]`,
};

export class LoginForm extends Base {
  openPopupButton: Locator;
  popup: Locator;
  getSmsButton: Locator;
  phoneForm: Locator;
  phoneInput: Locator;
  verifyCodeButton: Locator;
  codeInput: Locator;
  phoneFormErrors: Locator;
  emailFormSubmitButton: Locator;
  emailFormErrors: Locator;

  constructor(page: Page) {
    super(page);
    this.openPopupButton = this.page.locator(locators.openPopupButton);
    this.popup = this.page.locator(locators.popup);
    this.getSmsButton = this.page.locator(locators.getSmsButton);
    this.phoneForm = this.page.locator(locators.phoneForm);
    this.phoneInput = this.page.locator(locators.phoneInput);
    this.verifyCodeButton = this.page.locator(locators.verifyCodeButton);
    this.codeInput = this.page.locator(locators.codeInput);
    this.phoneFormErrors = this.page.locator(locators.phoneFormErrors);
    this.emailFormSubmitButton = this.page.locator(
      locators.emailFormSubmitButton,
    );
    this.emailFormErrors = this.page.locator(locators.emailFormErrors);
  }

  async openPopup() {
    await this.openPopupButton.click();
    await this.popup.waitFor({ state: "visible" });
  }

  async openPhoneForm() {
    await this.page.locator(locators.phoneTabButton).click();
  }

  async openEmailForm() {
    await this.page.locator(locators.emailTabButton).click();
  }

  async getSms() {
    await this.getSmsButton.click();
    await this.page.waitForTimeout(500);
  }

  async enterPhone(phone: string) {
    await this.phoneInput.focus();
    await this.page.keyboard.type(phone);
  }

  async enterCode(code: string) {
    await this.codeInput.focus();
    await this.page.keyboard.type(code);
  }

  async verifyCode() {
    await this.verifyCodeButton.click();
    await this.page.waitForTimeout(500);
  }

  async loginViaEmail() {
    await this.emailFormSubmitButton.click();
    await this.page.waitForTimeout(500);
  }
}
