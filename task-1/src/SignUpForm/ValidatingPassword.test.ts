import SignUpForm from "../SignUpForm";

import { describe, test, expect } from "@jest/globals";

describe('Validating password', () => {
    test('when empty', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@gmail.com", "", "qw21");

        expect(() => {
            form.submit()
        }).toThrowError("Password is empty")
    });

    test('when has no capital letter', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@gmail.com", "qw21!", "qw21!");

        expect(() => {
            form.submit()
        }).toThrowError("Password should contain at least one capital character, one lower character, one digit, one special symbol")
    });

    test('when has no lower letter', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@gmail.com", "QW21!", "QW21!");

        expect(() => {
            form.submit()
        }).toThrowError("Password should contain at least one capital character, one lower character, one digit, one special symbol")
    });

    test('when has no digit', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@gmail.com", "qW!", "qW!");
    
        expect(() => {
          form.submit()
        }).toThrowError("Password should contain at least one capital character, one lower character, one digit, one special symbol")
      });

      test('when has no special symbol', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@gmail.com", "qW21", "qW21");
    
        expect(() => {
          form.submit()
        }).toThrowError("Password should contain at least one capital character, one lower character, one digit, one special symbol")
      });
});

describe('Validating password confirmation', () => {
    test('when empty', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@gmail.com", "qW21!", "");

        expect(() => {
            form.submit()
        }).toThrowError("Password confirmation is empty")
    });

    test('when passwords do not match', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@gmail.com", "qW21!", "wQ1!2");

        expect(() => {
            form.submit()
        }).toThrowError("Passwords do not match")
    });
});