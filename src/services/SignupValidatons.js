import Validations from "./Validation";

export default class SignupValidations {
    constructor(email, password) {
        this.email = email,
            this.password = password
    }

    checkValidations() {
        let errors = [];
        // email validation
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email'
        }

        //password validations
        if (!Validations.hasNumber(this.password)) {
            errors['password'] = 'Password must contain at least one number'
        }

        if (!Validations.minLenght(this.password, 6)) {
            errors['password'] = 'Password should be of 6 characters'
        }

        return errors;
    }

    static getErrorMessageFromCode(errorCode) {
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return 'The email address is already in use by another account.'
            case 'OPERATION_NOT_ALLOWED':
                return 'Password sign-in is disabled for this project.'
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return 'We have blocked all requests from this device due to unusual activity. Try again later.'
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found.'
            case 'INVALID_PASSWORD':
                return 'Invalid password'
            case 'USER_DISABLED':
                return 'Email disabled'
            default:
                return 'Unexpected error occurred. Please try again'
        }
    }
}