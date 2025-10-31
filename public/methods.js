import DOM from "./domElements.js";
import regexp from "./regexp.js";
let regexObj = regexp.regexObject;
class Methods {
    //variables
    isLoading = false;
    name;
    valideColor;
    invalideColor;
    author = "Anonymous";
    quote = "This is test quote";
    id = 0;
    //   constructor
    //*
    // @method constructor
    // @description constructor
    // @params loader boolean, name string, valideColor string, invalideColor string*/
    constructor(loader, name, valideColor, invalideColor, id, author, quote) {
        this.isLoading = loader;
        this.name = name;
        this.valideColor = valideColor;
        this.invalideColor = invalideColor;
        this.id = id;
        this.author = author;
        this.quote = quote;
    }
    /**
     *@method addNewQuote
     *@description adds new quote to the DOM
     *@params author string, quote string, id number
     *@returns void
     */
    addNewQuote(author, quote, id) {
        let quoteHTML = `
    <article class="quote__article ">
                <h2 class="author handwriten__font">${author}</h2>
                <p class="quote handwriten__font">
                    ${quote}
                </p>

                <div class="button__div">
                    <button class="remove handwriten__font" data-id="${id}">R E M O V E</button>
                </div>

                <img src="./media/approval.png" alt="approval svg" class="approval">
    </article>
`;
        DOM.articleDiv.insertAdjacentHTML("beforeend", quoteHTML);
    }
    /**
     *@method removeRegistrationWindow
     *@description removes registration window
     *@params void
     *@returns void
     */
    removeRegistrationWindow() {
        //hide registration div
        DOM.registrationDiv.classList.remove("appear");
        // hide overlay
        DOM.overlay.classList.add("hide");
        // hide username input
        DOM.username.classList.remove("username__anime");
        // appear text below the submit button
        DOM.signupLoginToggle.classList.remove("hide");
        // empty input values
        DOM.username.value = "";
        DOM.password.value = "";
        DOM.email.value = "";
        // change submit text to Login
        DOM.submit.innerHTML = "L O G I N";
        // remove signup class from submit button
        DOM.submit.classList.remove("signup");
        // change background color for inputs
        DOM.email.style.backgroundColor = "transparent";
        DOM.username.style.backgroundColor = "transparent";
        DOM.password.style.backgroundColor = "transparent";
    }
    /**
     *@method loader
     *@description displays loader
     *@params isLoading boolean
     *@returns void
     */
    loader(isLoading) {
        console.log("loading");
        if (isLoading) {
            DOM.loader.classList.remove("hide");
        }
        else {
            DOM.loader.classList.add("hide");
        }
    }
    /**
     *@method changeInputBackgroundColor
     *@description changes input background color
     *@params name string, valideColor string, invalideColor string
     *@returns void
     */
    changeInputBackgroundColor(name, valideColor, invalideColor) {
        switch (name) {
            case "username":
                regexObj.username.test(DOM.username.value)
                    ? (DOM.username.style.backgroundColor = valideColor)
                    : (DOM.username.style.backgroundColor = invalideColor);
                break;
            case "email":
                regexObj.email.test(DOM.email.value)
                    ? (DOM.email.style.backgroundColor = valideColor)
                    : (DOM.email.style.backgroundColor = invalideColor);
                break;
            case "password":
                regexObj.password.test(DOM.password.value)
                    ? (DOM.password.style.backgroundColor = valideColor)
                    : (DOM.password.style.backgroundColor = invalideColor);
                break;
            default:
                DOM.username.style.backgroundColor = "transparent";
                DOM.email.style.backgroundColor = "transparent";
                DOM.password.style.backgroundColor = "transparent";
                DOM.username.value = "";
                DOM.email.value = "";
                DOM.password.value = "";
                break;
        }
    }
    /**
     * @method resetUI
     * @description resets UI
     * @params void
     * @returns void
     */
    resetUI() {
        // დამალეთ მომხმარებლის სახელი
        DOM.usernameDiv.classList.add("hide");
        // გამოაჩინეთ ლოგინის ღილაკი
        DOM.loginBtn.classList.remove("hide");
        // დაამატეთ not__logedin კლასი, რომელიც სავარაუდოდ ბლოკავს კონტენტს
        DOM.indexSection2.classList.add("not__logedin");
    }
}
export default Methods;
//# sourceMappingURL=methods.js.map