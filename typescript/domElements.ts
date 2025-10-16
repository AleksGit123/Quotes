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
  articleDiv: getElement<HTMLDivElement>(".section2__article__div"),
  addQuoteDiv: getElement<HTMLDivElement>(".new__quote__div"),
  registrationDiv: getElement<HTMLDivElement>(".registration"),
  overlay: getElement<HTMLDivElement>(".overlay"),

  // ღილაკები
  newQuoteBtn: getElement<HTMLButtonElement>(".new__quote"),
  addQuoteBtn: getElement<HTMLButtonElement>(".add__quote"),
  cancelBtn: getElement<HTMLButtonElement>(".cancel"),
  loginBtn: getElement<HTMLButtonElement>(".log_in"),
  signup: getElement<HTMLButtonElement>(".toggle__span"),
  // მედია
  closeRegistrationBtn: getElement<HTMLButtonElement>(".cancel__img"),

  // ტექსტები
  signupLoginToggle: getElement<HTMLElement>(".signup__login__toggle"),
  toggleSpan: getElement<HTMLElement>(".toggle__span"),
};

export default DOM;