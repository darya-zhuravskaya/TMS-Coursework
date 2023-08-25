import SignUpForm from "../SignUpForm";
import { describe, test, expect } from "@jest/globals";

describe("Validating last name", () => {
  test("when correct", () => {
    const form = new SignUpForm(
      "Petr",
      "Ivanov",
      "petr@gmail.com",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
  });

  test("when correct with whitespaces", () => {
    const form = new SignUpForm(
      "Petr",
      "    Ivanov    ",
      "petr@gmail.com",
      "qW21!",
      "qW21!",
    );

    expect(form.submit()).toEqual(true);
    expect(form.lastName).toEqual("Ivanov");
  });

  test("when empty", () => {
    const form = new SignUpForm("Petr", "", "petr@gmail.com", "qw21", "qw21");

    expect(() => {
      form.submit();
    }).toThrowError("Last name is empty");
  });

  test("when length of the last name is shorter than needed", () => {
    const form = new SignUpForm("Petr", "I", "petr@gmail.com", "qw21", "qw21");

    expect(() => {
      form.submit();
    }).toThrowError(/last name.+at least/i);
  });
});
