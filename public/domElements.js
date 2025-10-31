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
    indexSection2: getElement(".index__section2"),
    articleDiv: getElement(".section2__article__div"),
    addQuoteDiv: getElement(".new__quote__div"),
    registrationDiv: getElement(".registration"),
    overlay: getElement(".overlay"),
    formDiv: getElement(".registration__form"),
    usernameDiv: getElement(".user__div"),
    loader: getElement(".loader__section"),
    swordSvgs: getElement(".sword__svgs"),
    // ღილაკები
    newQuoteBtn: getElement(".new__quote"),
    addQuoteBtn: getElement(".add__quote"),
    cancelBtn: getElement(".cancel"),
    loginBtn: getElement(".log_in"),
    submit: getElement(".submit"),
    signupBtn: getElement(".signup"),
    logout: getElement(".logout"),
    removeBtn: getElement(".remove"),
    // მედია
    closeRegistrationBtn: getElement(".cancel__img"),
    // ტექსტები
    signupLoginToggle: getElement(".signup__login__toggle"),
    toggleSpan: getElement(".toggle__span"),
    usernameSpan: getElement(".user__name"),
};
export default DOM;
//# sourceMappingURL=domElements.js.map