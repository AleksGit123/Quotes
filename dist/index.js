let searchValue;
// DOM Variables
let search = document.querySelector(".search");
let articleDiv = document.querySelector(".section2__article__div");
// add new quote window
let addQuoteDiv = document.querySelector(".new__quote__div");
let newQuote = document.querySelector(".new__quote");
let addQuote = document.querySelector(".add__quote");
let neverMindBtn = document.querySelector(".cancel");
let author = document.querySelector(".author__input");
let quote = document.querySelector(".quote__textarea");
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log(search.value);
        searchValue = search.value;
    }
});
let addNewQuote = (author, quote) => {
    articleDiv.innerHTML +=
        `
    <article class="quote__article">
                <h2 class="author handwriten__font">${author}</h2>
                <p class="quote handwriten__font">
                    ${quote}
                </p>

                <div class="button__div">
                    <button class="remove handwriten__font">R E M O V E</button>
                </div>

                <img src="./media/approval.png" alt="approval svg" class="approval">
    </article>
`;
};
// New quote div appear and dissappear event
document.body.addEventListener("click", async (e) => {
    // console.log(e.target)
    if (e.target === newQuote) {
        addQuoteDiv.classList.add("appear");
    }
    else if (e.target === neverMindBtn) {
        addQuoteDiv.classList.remove("appear");
    }
});
// save new quote author and quote text event
addQuote.addEventListener("click", async () => {
    const authorValue = author.value.trim();
    const quoteValue = quote.value.trim();
    if (!authorValue || !quoteValue) {
        console.error("გთხოვთ, შეავსოთ ორივე ველი!");
        return;
    }
    const api = "http://localhost:8080";
    try {
        let response = await fetch(api, {
            headers: {
                "Content-Type": "application-json",
            },
            method: "POST",
            body: JSON.stringify({
                author: authorValue,
                quote: quoteValue
            })
        });
        if (response.ok) {
            const savedQuote = await response.json();
            addNewQuote(savedQuote.author, savedQuote.quote);
            addQuoteDiv.classList.remove("appear");
            author.value = '';
            quote.value = '';
            addQuoteDiv.classList.remove("appear");
            console.log("✅ ციტატა წარმატებით შეინახა DB-ში:", savedQuote);
        }
        else {
            console.log("❌ ციტატა წარმატებით შეინახა DB-ში:");
        }
    }
    catch (error) {
        console.log(error);
    }
});
export {};
//# sourceMappingURL=index.js.map