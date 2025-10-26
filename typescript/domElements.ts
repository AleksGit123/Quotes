const getElement = <T extends Element>(selector: string) =>
  document.querySelector(selector) as T;

// DOM ცვლადების ინიციალიზაცია ერთ ადგილას
const DOM = {
  // Input-ები
  search: getElement<HTMLInputElement>(".search"),
  author: getElement<HTMLInputElement>(".author__input"),
  quote: getElement<HTMLInputElement>(".quote__textarea"),
  username: getElement<HTMLInputElement>(".username"),
  password: getElement<HTMLInputElement>(".password"),
  email: getElement<HTMLInputElement>(".email"),

  // კონტეინერები/დივები
  indexSection2: getElement<HTMLDivElement>(".index__section2"),
  articleDiv: getElement<HTMLDivElement>(".section2__article__div"),
  addQuoteDiv: getElement<HTMLDivElement>(".new__quote__div"),
  registrationDiv: getElement<HTMLDivElement>(".registration"),
  overlay: getElement<HTMLDivElement>(".overlay"),
  formDiv: getElement<HTMLDivElement>(".registration__form"),
  usernameDiv: getElement<HTMLDivElement>(".user__div"),
  loader:getElement<HTMLDivElement>(".loader__section"),

  // ღილაკები
  newQuoteBtn: getElement<HTMLButtonElement>(".new__quote"),
  addQuoteBtn: getElement<HTMLButtonElement>(".add__quote"),
  cancelBtn: getElement<HTMLButtonElement>(".cancel"),
  loginBtn: getElement<HTMLButtonElement>(".log_in"),
  submit: getElement<HTMLButtonElement>(".submit"),
  signupBtn: getElement<HTMLButtonElement>(".signup"),
  logout: getElement<HTMLButtonElement>(".logout"),

  // მედია
  closeRegistrationBtn: getElement<HTMLButtonElement>(".cancel__img"),

  // ტექსტები
  signupLoginToggle: getElement<HTMLElement>(".signup__login__toggle"),
  toggleSpan: getElement<HTMLElement>(".toggle__span"),
  usernameSpan: getElement<HTMLElement>(".user__name"),
};

export default DOM;
