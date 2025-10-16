import DOM from "./domElements.js";

let searchValue: string;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log(DOM.search.value);
    searchValue = DOM.search.value;
  }
});
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

// New quote div appear and dissappear event
DOM.newQuoteBtn.addEventListener("click", () => {
  DOM.addQuoteDiv.classList.add("appear");
});

DOM.cancelBtn.addEventListener("click", () => {
  DOM.addQuoteDiv.classList.remove("appear");
  DOM.author.value = "";
  DOM.quote.value = "";
});

// close registration div
DOM.closeRegistrationBtn.addEventListener("click", () => {
  DOM.registrationDiv.classList.remove("appear");
  DOM.overlay.classList.add("hide");
  DOM.username.classList.remove("username__anime");
  DOM.signupLoginToggle.classList.remove("hide");
  DOM.username.value = "";
  DOM.password.value = "";
  DOM.email.value = "";
});

// open registration div
DOM.toggleSpan.addEventListener("click", () => {
  DOM.username.classList.add("username__anime");
  DOM.signupLoginToggle.classList.add("hide");
});

// save new quote's author and quote text event
DOM.addQuoteBtn.addEventListener("click", async () => {
  const authorValue = DOM.author.value.trim();
  const quoteValue = DOM.quote.value.trim();

  if (!authorValue || !quoteValue) {
    console.error("გთხოვთ, შეავსოთ ორივე ველი!");
    return;
  }
  const api = "http://localhost:8080";

  try {
    let response = await fetch(api, {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",

      body: JSON.stringify({
        author: authorValue,
        quote: quoteValue,
      }),
    });

    if (response.ok) {
      const savedQuote = await response.json();
      addNewQuote(savedQuote.author, savedQuote.quote, savedQuote.id);

      //appear add quote div
      DOM.addQuoteDiv.classList.remove("appear");

      // clear inputs
      DOM.author.value = "";
      DOM.quote.value = "";

      // hide add quote div
      DOM.addQuoteDiv.classList.remove("appear");
      console.log("✅ ციტატა წარმატებით შეინახა DB-ში:", savedQuote);
    } else {
      console.log("❌");
    }
  } catch (error) {
    console.log(error);
  }
});

//Registration event
DOM.loginBtn.addEventListener("click", () => {
  DOM.registrationDiv.classList.add("appear");
  DOM.overlay.classList.remove("hide");
});
