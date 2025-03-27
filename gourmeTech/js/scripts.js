/* menu mobile */
document.querySelector("header button").addEventListener("click", function () {
    document.querySelector("header nav").classList.toggle("open");
});

/* filter form */
const listArticles = document.querySelectorAll("article");

/* disparition de tous les articles*/
function allArticlesHidden() {
    for (article of listArticles) {
        if (!article.classList.contains("hidden")) {
            article.classList.add("hidden");
        }
    }
}

/* apparaitre tous les articles */
function allArticlesVisible() {
    for (article of listArticles) {
        article.classList.remove("hidden");
    }
}

/* apparaitre des articles */
function articlesVisible(articles) {
    if (articles.length > 0) {
        for (article of articles) {
            article.classList.remove("hidden");
        }
    }

}

// Génère toutes les combinaisons de sélecteurs
function generateSelectors(options) {
    // Récupère les clés des options
    const keys = Object.keys(options);

    // Fonction récursive pour générer les combinaisons
    const generateCombinations = (index = 0, currentSelector = '') => {
        // Condition de sortie : toutes les clés ont été parcourues
        if (index === keys.length) {
            return [currentSelector];
        }

        const currentKey = keys[index];
        const currentValues = options[currentKey];

        // Tableau pour stocker toutes les combinaisons
        let combinations = [];

        // Pour chaque valeur de la clé actuelle
        currentValues.forEach(value => {
            // Ajoute le sélecteur pour cette valeur
            const newSelector = currentSelector + `[data-${currentKey}="${value}"]`;

            // Génère les combinaisons suivantes
            combinations = combinations.concat(
                generateCombinations(index + 1, newSelector)
            );
        });

        return combinations;
    };

    // Lance la génération des combinaisons
    return generateCombinations();
}



document.querySelector("#filterForm").addEventListener("click", function () {

    //cibler les checkboxs checked
    const selected = this.querySelectorAll('input[type="checkbox"]:checked');



    //reset
    if (selected.length > 0) {
        allArticlesHidden();

        //init
        const filterOptions = {};

        for (item of selected) {
            if (!filterOptions?.[item.name]) {
                filterOptions[item.name] = [];
            }
            filterOptions[item.name].push(item.value);
        }



        // Génère la query finale
        const query = generateSelectors(filterOptions).join(',');

        articlesVisible(document.querySelectorAll(query));
    }
    else {
        allArticlesVisible();
    }
});