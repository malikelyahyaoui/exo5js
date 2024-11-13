const quoteListDiv = document.getElementById('quoteList');

// Fonction pour récupérer les citations favorites 
function getFavorites() {
    // Vérifie si des favoris existent dans le localStorage et les retourne sous forme de tableau
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : []; // Parse le JSON ou retourne un tableau vide
}

// Fonction pour sauvegarder les citations favorites dans le localStorage
function saveFavorites(favorites) {
    // Convertit le tableau des favoris en chaîne JSON et l'enregistre dans le localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Initialise la liste des favoris en récupérant les données du localStorage
let favorites = getFavorites();

// Fonction pour vérifier si une citation est déjà marquée comme favorite
function isFavorite(quote) {
    // Retourne `true` si une citation avec le même contenu existe dans les favoris, sinon `false`
    return favorites.some(fav => fav.content === quote.content);
}

// Fonction pour gérer l'ajout ou la suppression d'une citation des favoris
function toggleFavorite(quote, button) {
    if (isFavorite(quote)) {
        // Si la citation est déjà dans les favoris, on la retire
        favorites = favorites.filter(fav => fav.content !== quote.content);
        button.textContent = "Ajouter aux favoris"; // Mise à jour du texte du bouton
    } else {
        // Si la citation n'est pas dans les favoris, on l'ajoute
        favorites.push(quote);
        button.textContent = "Retirer des favoris"; // Change le texte du bouton en retirer fav
    }
    // Sauvegarde les favs
    saveFavorites(favorites);
}

// Affiche chaque citation
quotes.forEach(quote => {
    // Crée nouvel div pour chaque citation
    const quoteElement = document.createElement('div');
    // Ajoute la classe CSS quote pour styliser chaque citation
    quoteElement.classList.add('quote');

    // structure html pour les citations
    quoteElement.innerHTML = `
        <h3 class="quote-author">${quote.author} dans "${quote.title}"</h3>
        <q class="quote-content">${quote.content}</q>
    `;

    // Création d'un bouton 
    const favoriteButton = document.createElement('button');
    // Ajout d'une classe au bouton pour le styliser
    favoriteButton.classList.add('favorite-button');

    // Détermine si la citation est déjà favorite et ajuste le texte du bouton en conséquence
    favoriteButton.textContent = isFavorite(quote) ? "Retirer des favoris" : "Ajouter aux favoris";

    // Ajoute un écouteur d'événement pour gérer le clic sur le bouton de favori
    favoriteButton.addEventListener('click', () => {
        toggleFavorite(quote, favoriteButton); // Gère l'ajout ou le retrait de la citation des favoris
    });

    // Ajoute le bouton de favori à chaque citation
    quoteElement.appendChild(favoriteButton);

    // Ajoute l'élément de citation complet à la liste des citations
    quoteListDiv.appendChild(quoteElement);
});
