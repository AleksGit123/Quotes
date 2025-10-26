let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
let usernameRegex = /^[a-zA-Z0-9_]{8,16}$/;
let regexObject = {
    email: emailRegex,
    password: passwordRegex,
    username: usernameRegex,
};
class CheckRegexp {
    emailValue;
    usernmeValue;
    passwordValue;
    constructor(emailValue, usernmeValue, passwordValue) {
        this.emailValue = emailValue;
        this.usernmeValue = usernmeValue;
        this.passwordValue = passwordValue;
    }
    checkEmail() {
        return emailRegex.test(this.emailValue);
    }
    checkUsername() {
        return usernameRegex.test(this.usernmeValue);
    }
    checkPassword() {
        return passwordRegex.test(this.passwordValue);
    }
}
export default { CheckRegexp, regexObject };
//# sourceMappingURL=regexp.js.map