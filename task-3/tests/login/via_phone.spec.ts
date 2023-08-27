import { test, expect } from "@playwright/test";
import { LoginForm } from "../../pages/LoginForm";

let form: LoginForm;

const noPhoneError = "Введите номер мобильного телефона белорусских опереторов";
const invalidPhoneError = "Введите корректный номер мобильного телефона";
const emptyInputValue = "+375 (__) ___-__-__";
const invalidPhoneCode = "99";
const validPhone = "4444444444";
const invalidVerificationCode = "4444";

test.beforeEach(async ({ page }) => {
  form = new LoginForm(page);

  await form.goto("https://oz.by/");
  await form.openPopup();
  await form.openPhoneForm();
});

test.describe("Login in via phone", () => {
  test("when no phone number entered", async ({ page }) => {
    await form.getSms();

    expect(form.phoneFormErrors).toBeVisible();
    expect(form.phoneFormErrors).toContainText(noPhoneError);
  });

  test("when entered only part of phone number", async ({ page }) => {
    await form.enterPhone("44555");
    await form.getSms();

    expect(form.phoneFormErrors).toContainText(invalidPhoneError);
    expect(form.getSmsButton).toHaveCSS("cursor", "not-allowed");
  });

  test("when entering invalid code", async ({ page }) => {
    await form.enterPhone(invalidPhoneCode);

    expect(await form.phoneInput.inputValue()).toBe(emptyInputValue);
  });

  test("when entered valid phoen number", async ({ page }) => {
    await form.enterPhone(validPhone);
    await form.getSms();

    expect(form.verifyCodeButton).toBeVisible();

    await form.enterCode(invalidVerificationCode);
    await form.verifyCode();

    expect(form.phoneFormErrors).toBeVisible();
    expect(form.phoneFormErrors).toContainText("Неверный код");
  });
});
