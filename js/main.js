const quoteListDiv = document.getElementById('quoteList');


quotes.forEach(quote => {
    const quoteElement = document.createElement('div');
    quoteElement.classList.add('quote');



    quoteElement.innerHTML = `
        <h3 class="quote-author">${quote.author} dans "${quote.title}"</h3>
        <p class="quote-content">"${quote.content}"</p>
        <hr class="quote-divider">
    `;
    quoteListDiv.appendChild(quoteElement);
});
