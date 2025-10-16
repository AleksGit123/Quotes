const getElement = (selector) => document.querySelector(selector);
// DOM ცვლადების ინიციალიზაცია ერთ ადგილას
const DOM = {
    // Input-ები
    search: getElement(".search"),
    author: getElement(".author__input"),
    quote: getElement(".quote__textarea"),
    username: getElement(".username"),
    password: getElement(".password"),
    email: getElement(".email"),
    // კონტეინერები/დივები
    articleDiv: getElement(".section2__article__div"),
    addQuoteDiv: getElement(".new__quote__div"),
    registrationDiv: getElement(".registration"),
    overlay: getElement(".overlay"),
    // ღილაკები
    newQuoteBtn: getElement(".new__quote"),
    addQuoteBtn: getElement(".add__quote"),
    cancelBtn: getElement(".cancel"),
    loginBtn: getElement(".log_in"),
    signup: getElement(".toggle__span"),
    // მედია
    closeRegistrationBtn: getElement(".cancel__img"),
    // ტექსტები
    signupLoginToggle: getElement(".signup__login__toggle"),
    toggleSpan: getElement(".toggle__span"),
};
export default DOM;
//# sourceMappingURL=domElements.js.map