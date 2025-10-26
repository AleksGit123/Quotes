import DOM from "./domElements.js";
import regexp from "./regexp.js";

let regexObj = regexp.regexObject;

// add new quote
let addNewQuote = (author: string, quote: string, id: number) => {
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
};

// functions

// remove registration window
let removeRegistrationWindow = () => {
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
};

const loader = (loading: boolean): void => {
  console.log("loading");
  if (loading) {
    DOM.loader.classList.remove("hide");
  } else {
    DOM.loader.classList.add("hide");
  }
};
// // if user is registered hide login div
// if (DOM.usernameDiv.classList.contains("hide")) {
//   DOM.indexSection2.classList.add("not__logedin");
// }

// change input backgrounds
let changeInputBack = function (
  name: string,
  valideColor: string,
  invalideColor: string
) {
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
};

// check input values

// username
DOM.username.addEventListener("input", () => {
  if (DOM.username.value !== "") {
    changeInputBack("username", "#2c5925", "#6b1818");
  } else {
    changeInputBack("username", "transparent", "transparent");
  }
});

//email
DOM.email.addEventListener("input", () => {
  if (DOM.submit.classList.contains("signup") && DOM.email.value !== "") {
    changeInputBack("email", "#2c5925", "#6b1818");
  } else {
    DOM.email.style.backgroundColor = "transparent";
  }
});

// password
DOM.password.addEventListener("input", () => {
  if (DOM.submit.classList.contains("signup") && DOM.password.value !== "") {
    changeInputBack("password", "#2c5925", "#6b1818");
  } else {
    DOM.password.style.backgroundColor = "transparent";
  }
});

//prevent submit
DOM.formDiv.addEventListener("submit", (e) => {
  e.preventDefault();
});

// New quote div appear and dissappear event
DOM.newQuoteBtn.addEventListener("click", (e) => {
  if (DOM.indexSection2.classList.contains("not__logedin")) {
    e.preventDefault();
  } else if (!DOM.indexSection2.classList.contains("not__logedin")) {
    DOM.addQuoteDiv.classList.add("appear");
  }
});

// cancel new quote event
DOM.cancelBtn.addEventListener("click", () => {
  DOM.addQuoteDiv.classList.remove("appear");
  DOM.author.value = "";
  DOM.quote.value = "";
});

//Registration event
DOM.loginBtn.addEventListener("click", () => {
  DOM.registrationDiv.classList.add("appear");
  DOM.overlay.classList.remove("hide");
});

// appear username input
DOM.toggleSpan.addEventListener("click", () => {
  DOM.username.classList.add("username__anime");
  DOM.submit.innerHTML = "S I G N U P";
  DOM.submit.classList.add("signup");
  DOM.signupLoginToggle.classList.add("hide");
  DOM.email.value = "";
  DOM.username.value = "";
  DOM.password.value = "";
});

// close registration div
DOM.closeRegistrationBtn.addEventListener("click", () => {
  removeRegistrationWindow();
});

// Sent signup request
DOM.submit.addEventListener("click", async () => {
  loader(true);
  const data = {
    username: DOM.submit.classList.contains("signup") ? DOM.username.value : "",
    password: DOM.password.value,
    email: DOM.email.value,
  };

  if (DOM.submit.classList.contains("signup")) {
    try {
      let response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        let result = await response.json();
        console.log(result);
        if (result.message === "ვალიდაცია ყველა მონაცემმა გაიარა") {
          removeRegistrationWindow();
          DOM.usernameDiv.classList.remove("hide");
          DOM.usernameSpan.innerHTML = result.username;
          console.log(DOM.username.innerHTML);
          DOM.loginBtn.classList.add("hide");
          DOM.indexSection2.classList.remove("not__logedin");
        } else {
          DOM.usernameDiv.classList.add("hide");
          DOM.loginBtn.classList.remove("hide");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      loader(false);
    }
  } else {
    console.log("Submit does not have signup class");
  }
});

//  login request

DOM.submit.addEventListener("click", async () => {
  const loginData = {
    email: DOM.email.value,
    password: DOM.password.value,
  };
  loader(true);
  if (!DOM.submit.classList.contains("signup")) {
    try {
      let response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        let result = await response.json();
        console.log(result.message);
        if (result.message === "ვალიდაცია ყველა მონაცემმა გაიარა") {
          DOM.registrationDiv.classList.remove("appear");
          DOM.overlay.classList.add("hide");
          DOM.usernameDiv.classList.remove("hide");
          DOM.loginBtn.classList.add("hide");
          DOM.usernameSpan.innerHTML = result.username;
          DOM.username.innerHTML = "";
          DOM.email.innerHTML = "";
          DOM.password.innerHTML = "";
          DOM.indexSection2.classList.remove("not__logedin");
        } else {
          console.log("შეამოწმე პაროლი ან ემაილი");
          DOM.email.style.backgroundColor = "#6b1818";
          DOM.password.style.backgroundColor = "#6b1818";
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      loader(false);
    }
  } else {
    console.log("signup");
  }
});

// when webpage is refreshed, user still be logedin
document.addEventListener("DOMContentLoaded", async () => {
  loader(true);
  try {
    let response = await fetch("http://localhost:8080/check-auth", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      let result = await response.json();
      if (result.isLoggedIn) {
        DOM.usernameDiv.classList.remove("hide");
        DOM.usernameSpan.innerHTML = result.username;
        DOM.loginBtn.classList.add("hide");
        DOM.indexSection2.classList.remove("not__logedin");
      } else {
        // დარწმუნდით, რომ თუ არ არის დალოგინებული, ინტერფეისი სტანდარტულია
        DOM.usernameDiv.classList.add("hide");
        DOM.loginBtn.classList.remove("hide");
        DOM.indexSection2.classList.add("not__logedin");
      }
    } else {
      console.log("შეცდომა");
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader(false);
  }
});

// logout

let resetUI = () => {
  // დამალეთ მომხმარებლის სახელი
  DOM.usernameDiv.classList.add("hide");

  // გამოაჩინეთ ლოგინის ღილაკი
  DOM.loginBtn.classList.remove("hide");

  // დაამატეთ not__logedin კლასი, რომელიც სავარაუდოდ ბლოკავს კონტენტს
  DOM.indexSection2.classList.add("not__logedin");
};

DOM.logout.addEventListener("click", async () => {
  try {
    loader(true);
    let response = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      let result = await response.json();
      console.log(result.message);

      // 🔑 წარმატებული ლოგაუთის შემდეგ, დააბრუნეთ ინტერფეისი საწყის მდგომარეობაში
      resetUI();
    } else {
      console.error("Logout failed on server.");
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader(false);
  }
});
