const quoteListDiv = document.getElementById('quoteList');

//  récupérer les quotes favorites 
function getFavorites() {
    // Vérifie si des favoris existent dans le localStorage et les retourne sous forme de tableau
    const favorites = localStorage.getItem('favorites');

    return favorites ? JSON.parse(favorites) : []; //  retourne un tableau vide
}

//  sauvegarder les  favoris dans le localStorage
function saveFavorites(favorites) {
    // Convertit le tableau des favoris en chaîne  et l'enregistre dans le localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    const quoteContent= document.getElementById('favorites');

    quoteContent.classList.add('favorites')
}

// initialise la liste des favoris en récupérant les données du localStorage
let favorites = getFavorites();

//  vérifier si une citation est déjà marqué comme favorite
function isFavorite(quote) {
    // Retourne true si une citationn avec le même contenue existe dans les favoris, sinon `false`
    return favorites.some(fav => fav.content === quote.content);
}

//  gérer l'ajout ou la suppression d'une citation des favoris
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

        button.textContent = "Retirer des favoris"; // Change le texte du bouton en retirer fav

        quoteContent.classList.add('favorite-quote');
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

    <q class="quote-content">${quote.content}</q>
    
    <h3 class="quote-author">${quote.author} dans "${quote.title}"</h3>
    `;

    // Création d'un bouton 
    const favoriteButton = document.createElement('button');
    // Ajout d'une classe au bouton pour le styliser
    favoriteButton.classList.add('favorite-button');

    // Détermine si la citation est déjà favorite et change le texte du bouton 
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
