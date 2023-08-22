const allowedHosts = ["google.com", "gmail.com", "yandex.ru", "ya.ru", "mail.com", "mail.ru"]
const nameMinLength = 2
const passwordFormats = [/[A-Z]/, /[a-z]/, /\d/, /[\#\-\!\@\&\%\$]/]

export default class SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string

    constructor(firstName: string, lastName: string, email: string, password: string, passwordConfirmation: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email.trim();
        this.password = password;
        this.passwordConfirmation = passwordConfirmation
    }

    submit(): true {
        this.validateName(this.firstName, "First name")
        this.validateName(this.lastName, "Last name")
        this.validateEmail();
        this.validatePassword();
        this.validatePasswordConfirmation()

        return true
    }

    private validateEmail(){
        this.validateEmpty(this.email, "Email")

        let [userName, host] = this.email.split("@")
        if (!userName || !host){
            throw new Error("Email has invalid format") 
        }

        if (!allowedHosts.includes(host)){
            throw new Error("Email must be registered on allowed websites" )
        }
    }

    private validatePassword(){
        this.validateEmpty(this.password, "Password")

        if (passwordFormats.some((format) => !this.password.match(format))) {
            throw new Error ("Password should contain at least one capital character, one lower character, one digit, one special symbol")
        }
    }

    private validatePasswordConfirmation(){
        this.validateEmpty(this.passwordConfirmation, "Password confirmation")

        if (this.password !== this.passwordConfirmation){
            throw new Error("Passwords do not match")
        }
    }

    private validateName(name:string, errorName:string){
        this.validateEmpty(name, errorName)

        if (name.length < nameMinLength){
            throw new Error(`${errorName} should contain at least ${nameMinLength} characters`)
        }

        let format = /\d/
        if(name.match(format)) {
            throw new Error(`${errorName} should not contain numbers`)

        }

    }

    private validateEmpty(value: string, errorName: string) {
        if (value === "") {
            throw new Error(`${errorName} is empty`)
        }
    }
}