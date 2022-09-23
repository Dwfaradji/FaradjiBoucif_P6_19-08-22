// import { keyBoardFilter } from "../utils/accesibilite.js";
export default class FilterCard {
    constructor(arrayMedia, init) {
        this.init = init;
        this.arrayMedia = arrayMedia;
        this.getfilterPopulaire = document.getElementById("filter_popular");
        this.getfilterDate = document.getElementById("filter_date");
        this.getfilterTitle = document.getElementById("filter_title");
        this.getBtnFilter = document.querySelector(".button-filter ");
        this.listenerFilterList();

    
        this.getfilterPopulaire.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                this.filterPopulaire();
            }
        });

        this.getfilterDate.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                this.filterDate();
            }
        });
        this.getfilterTitle.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                this.filterTitle();
            }
        });
    }
 

    // Liste filtre
    listenerFilterList() {
        this.getfilterPopulaire.addEventListener(
            "click",
            this.filterPopulaire.bind(this)
        );

        this.getfilterDate.addEventListener(
            "click",
            this.filterDate.bind(this)
        );
        this.getfilterTitle.addEventListener(
            "click",
            this.filterTitle.bind(this)
        );
    }

    // Trie le tableau des cards en fonction du parametre definie et return un tableau trier
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
