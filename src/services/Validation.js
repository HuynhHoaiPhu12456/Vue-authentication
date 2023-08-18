export default class Validations {
    static checkEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return (true)
        }
        return false
    }

    static minLenght(name, minLenght) {
        if (name.length < minLenght) {
            return false
        }
        return true
    }

    static hasNumber(name) {
        return /\d/.test(name);
    }

    static hasLowercase(input) {
        return /[a-z]/.test(input);
    }

    static hasUppercase(input) {
        return /[A-Z]/.test(input);
    }

    static hasSpecialCharacter(input) {
        return /[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(input);
    }
}