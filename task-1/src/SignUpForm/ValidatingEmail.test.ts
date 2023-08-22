import SignUpForm from "../SignUpForm";
import { describe, test, expect } from "@jest/globals";

describe('Validating email', () => {
    test('when empty', () => {
      const form = new SignUpForm("Petr", "Ivanov", "", "qw21", "qw21");
  
      expect(() => {
        form.submit()
      }).toThrowError("Email is empty")
    });
  
    test('when empty with spaces', () => {
      const form = new SignUpForm("Petr", "Ivanov", "  ", "qw21", "qw21");
  
      expect(() => {
        form.submit()
      }).toThrowError("Email is empty")
    });
  
    test('when has no @ and no host', () => {
      const form = new SignUpForm("Petr", "Ivanov", "petr", "qw21", "qw21");
  
      expect(() => {
        form.submit()
      }).toThrowError("Email has invalid format")
    });

    test('when has no user name', () => {
        const form = new SignUpForm("Petr", "Ivanov", "@gmail.com", "qw21", "qw21");
    
        expect(() => {
          form.submit()
        }).toThrowError("Email has invalid format")
      });

      test('when has more then one @ separated', () => {
        const form = new SignUpForm("Petr", "Ivanov", "@gmai@l.com", "qw21", "qw21");
    
        expect(() => {
          form.submit()
        }).toThrowError("Email has invalid format")
      });

      test('when has more then one @ in a row', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@@gmail.com", "qw21", "qw21");
    
        expect(() => {
          form.submit()
        }).toThrowError("Email has invalid format")
      });
  
      test('when has not allowed host', () => {
        const form = new SignUpForm("Petr", "Ivanov", "petr@gmail.net", "qw21", "qw21");
    
        expect(() => {
          form.submit()
        }).toThrowError("Email must be registered on allowed websites")
      });
    
  });