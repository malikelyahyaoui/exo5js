const quoteListDiv = document.getElementById('quoteList');

// Récupérer les favoris depuis le localStorage
function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : []; // Retourne un tableau vide si aucun favori
}

// Sauvegarder les favoris dans le localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Vérifier si une citation est déjà marquée comme favorite
function isFavorite(quote) {
    return favorites.some(fav => fav.content === quote.content);
}

// Gérer l'ajout ou la suppression d'une citation des favoris
function toggleFavorite(quote, button) {
    const quoteContent = button.closest('.quote').querySelector('.quote-content');

    if (isFavorite(quote)) {
        // Si la citation est déjà dans les favoris, on la retire
        favorites = favorites.filter(fav => fav.content !== quote.content);
        button.textContent = "Ajouter aux favoris"; // Mise à jour du texte du bouton
        quoteContent.classList.remove('favorite-quote');
    } else {
        // Si la citation n'est pas dans les favoris, on l'ajoute
        favorites.push(quote);
        button.textContent = "Retirer des favoris"; // Change le texte du bouton
        quoteContent.classList.add('favorite-quote');
    }

    // Sauvegarde les favoris
    saveFavorites(favorites);
}

// Initialise la liste des favoris en récupérant les données du localStorage
let favorites = getFavorites();

// Affiche chaque citation
quotes.forEach(quote => {
    // Crée un nouvel élément div pour chaque citation
    const quoteElement = document.createElement('div');
    quoteElement.classList.add('quote'); // Classe CSS pour styliser la citation

    // Structure HTML pour la citation
    quoteElement.innerHTML = `
        <q class="quote-content">${quote.content}</q>
        <h3 class="quote-author">${quote.author} dans "${quote.title}"</h3>
    `;

    // Création d'un bouton pour ajouter aux favoris
    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('favorite-button');

    // Détermine si la citation est déjà un favori et met à jour le texte du bouton
    favoriteButton.textContent = isFavorite(quote) ? "Retirer des favoris" : "Ajouter aux favoris";

    // Applique la classe 'favorite-quote' si la citation est un favori
    if (isFavorite(quote)) {
        quoteElement.querySelector('.quote-content').classList.add('favorite-quote');
    }

    // Ajoute un écouteur d'événement pour gérer l'ajout ou la suppression de favoris
    favoriteButton.addEventListener('click', () => {
        toggleFavorite(quote, favoriteButton);
    });

    // Ajoute le bouton de favori à chaque citation
    quoteElement.appendChild(favoriteButton);

    // Ajoute l'élément de citation complet à la liste des citations
    quoteListDiv.appendChild(quoteElement);
});
