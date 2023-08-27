import { test, expect } from "@playwright/test";
import { LoginForm } from "../../pages/LoginForm";

let form: LoginForm;

const noEmailError = "Введите адрес электронной почты";

test.beforeEach(async ({ page }) => {
  form = new LoginForm(page);

  await form.goto("https://oz.by/");
  await form.openPopup();
  await form.openEmailForm();
});

test.describe("Login in via email", () => {
  test("when email is not entered", async ({ page }) => {
    await form.loginViaEmail();

    expect(form.emailFormErrors).toBeVisible();
    expect(form.emailFormErrors).toContainText(noEmailError);
  });
});
