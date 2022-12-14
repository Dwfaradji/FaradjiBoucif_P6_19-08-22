export default class FilterCard {
    /**
     * Trier les card media en fonction du filtre selectionner
     * @param {Array} arrayMedia - Tableau contenant tout les media
     *  de photographes
     * @param {*} init - Initialise le dom
     */
    constructor(arrayMedia, init) {
        this.init = init;
        this.arrayMedia = arrayMedia;
        this.getfilterPopulaire = document.getElementById("filter_popular");
        this.getfilterDate = document.getElementById("filter_date");
        this.getfilterTitle = document.getElementById("filter_title");
        this.getBtnFilter = document.querySelector(".button-filter ");
        this.listenerFilterList("click");
        this.listenerFilterList("keypress");
    }
    // Liste filtre
    listenerFilterList(typeEvent) {
        this.getfilterPopulaire.addEventListener(
            typeEvent,
            this.filterPopulaire.bind(this)
        );
        this.getfilterDate.addEventListener(
            typeEvent,
            this.filterDate.bind(this)
        );
        this.getfilterTitle.addEventListener(
            typeEvent,
            this.filterTitle.bind(this)
        );
    }
    /** Trie le tableau des cards en fonction du parametre definie et
     * return un tableau trier */
    filterPopulaire() {
        this.getBtnFilter.innerHTML =
            "Populaire  <i class='fas fa-chevron-down chevron'></i>";
        this.arrayMedia.sort((a, b) => {
            return b.likes - a.likes;
        });
        this.init();
    }
    filterDate() {
        this.getBtnFilter.innerHTML =
            "Date <i class='fas fa-chevron-down chevron'></i>";
        this.arrayMedia.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        this.init();
    }
    filterTitle() {
        this.getBtnFilter.innerHTML =
            "Titre <i class='fas fa-chevron-down chevron'></i>";
        this.arrayMedia.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        this.init();
    }
}
