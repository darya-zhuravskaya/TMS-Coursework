import SignUpForm from "./SignUpForm";

import { describe, test, expect } from "@jest/globals";


describe('Validating first name', () => {
  test('when empty', () => {
    const form = new SignUpForm("", "Ivanov", "petr@gmail.com", "qw21", "qw21");

    expect(() => {
      form.submit()
    }).toThrowError("First name is empty")
  });

  test('when length of the first name is shorter than needed', () => {
    const form = new SignUpForm("M", "Ivanov", "petr@gmail.com", "qw21", "qw21");

    expect(() => {
      form.submit()
    }).toThrowError(/first name.+at least/i)
  });

  test('when contains numbers', () => {
    const form = new SignUpForm("Pet2r5", "Ivanov", "petr@gmail.com", "qw21", "qw21");

    expect(() => {
      form.submit()
    }).toThrowError("First name should not contain numbers")
  });
});

describe('Validating last name', () => {
  test('when empty', () => {
    const form = new SignUpForm("Petr", "", "petr@gmail.com", "qw21", "qw21");

    expect(() => {
      form.submit()
    }).toThrowError("Last name is empty")
  });

  test('when length of the last name is shorter than needed', () => {
    const form = new SignUpForm("Petr", "I", "petr@gmail.com", "qw21", "qw21");

    expect(() => {
      form.submit()
    }).toThrowError(/last name.+at least/i)
  });
});




