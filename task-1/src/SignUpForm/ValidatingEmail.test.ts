import SignUpForm from "../SignUpForm";
import { describe, test, expect } from "@jest/globals";

describe("Validating email", () => {
  test("when valid email @gmail.com", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "petr@gmail.com",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
  });

  test("when valid email yandex.ru", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "petr@yandex.ru",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
  });

  test("when valid email with whitespaces on both sides", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "   petr@yandex.ru  ",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
    expect(form.email).toEqual("petr@yandex.ru");
  });

  test("when valid email with whitespaces at the end", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "petr@gmail.com     ",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
    expect(form.email).toEqual("petr@gmail.com");
  });

  test("when user name is uppercased", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "PETR@gmail.com",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
  });

  test("when user name is in alternating register", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "PeTr@gmail.com",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
  });

  test('when user name contains "."', () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "Petr.Ivanov@gmail.com",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
  });

  test("when entire email is uppercased", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "PETR.IVANOV@GMAIL.COM",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
  });

  test("when only host is uppercased", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "petr@YANDEX.RU",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
  });

  test("when empty", () => {
    const form = new SignUpForm("Petr", "Ivanov", "", "qW21!", "qW21!");

    expect(() => {
      form.submit();
    }).toThrowError("Email is empty");
  });

  test("when empty with spaces", () => {
    const form = new SignUpForm("Petr", "Ivanov", "  ", "qW21!", "qW21!");

    expect(() => {
      form.submit();
    }).toThrowError("Email is empty");
  });

  test("when has no @ and no host", () => {
    const form = new SignUpForm("Petr", "Ivanov", "petr", "qW21!", "qW21!");

    expect(() => {
      form.submit();
    }).toThrowError("Email has invalid format");
  });

  test("when has no user name", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "@gmail.com",
      "qW21!",
      "qW21!",
    );

    expect(() => {
      form.submit();
    }).toThrowError("Email has invalid format");
  });

  test("when has more then one @ separated", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "@gmai@l.com",
      "qW21!",
      "qW21!",
    );

    expect(() => {
      form.submit();
    }).toThrowError("Email has invalid format");
  });

  test("when has more then one @ in a row", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "petr@@gmail.com",
      "qW21!",
      "qW21!",
    );

    expect(() => {
      form.submit();
    }).toThrowError("Email has invalid format");
  });

  test("when has not allowed host", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "petr@gmail.net",
      "qW21!",
      "qW21!",
    );

    expect(() => {
      form.submit();
    }).toThrowError("Email must be registered on allowed websites");
  });
});
