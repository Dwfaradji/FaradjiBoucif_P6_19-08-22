/**
 * Construction HTML du boutton et de la liste filtre
 */

export default class BtnFiltre {
    constructor() {
        this.btnFiltre();
    }
    btnFiltre() {
        const getFilterClass = document.querySelector(".filter");
        const label = this.createHtmlElementFilter("p", "class", "label", "");
        label.innerHTML = "Trier par :";
        const btnFilter = this.createHtmlElementFilter(
            "button",
            "id",
            "buttonFilter",
            "button-filter btn-hover"
        );
        btnFilter.innerHTML =
            "Populaire <i class='fas fa-chevron-down chevron'></i>";
        btnFilter.setAttribute("aria-label", "boutton trier");
        btnFilter.setAttribute("tabindex", "0");
        btnFilter.setAttribute("aria-labelledby", "buttonFilter");
        btnFilter.setAttribute("aria-haspopup", "listbox");
        btnFilter.setAttribute("aria-expanded", "true");

        const filterList = this.createHtmlElementFilter(
            "ul",
            "id",
            "filterList",
            "filtersMenu-list "
        );
        filterList.setAttribute("aria-hidden", "true");
        filterList.setAttribute("role", "listbox");
        filterList.setAttribute("aria-labelledby", "buttonFilter");
        filterList.setAttribute("tabindex", "-1");

        const listFilter1 = this.createHtmlElementFilter(
            "li",
            "id",
            "filter_popular",
            ""
        );
        listFilter1.innerHTML =
            "Populaire <i class='fas fa-chevron-up chevron'></i>";
        listFilter1.setAttribute("aria-label", "filtre populaire");
        listFilter1.setAttribute("tabindex", "0");
        listFilter1.setAttribute("role", "option");

        const listFilter2 = this.createHtmlElementFilter(
            "li",
            "id",
            "filter_date",
            ""
        );
        listFilter2.innerHTML = "Date";
        listFilter2.setAttribute("tabindex", "0");
        listFilter2.setAttribute("aria-label", "filtre date");
        listFilter2.setAttribute("role", "option");
        const listFilter3 = this.createHtmlElementFilter(
            "li",
            "id",
            "filter_title",
            "title"
        );
        listFilter3.innerHTML = "Titre";
        listFilter3.setAttribute("tabindex", "0");
        listFilter3.setAttribute("aria-label", "filtre titre");
        listFilter3.setAttribute("role", "option");

        getFilterClass.appendChild(label);
        getFilterClass.appendChild(btnFilter);
        getFilterClass.appendChild(filterList);
        filterList.appendChild(listFilter1);
        filterList.appendChild(listFilter2);
        filterList.appendChild(listFilter3);
    }
    /**
     *
     * @param {string} balise - Balise html à créer
     * @param {string} attribute - Le nom de l'attribut
     * @param {string} valueAttribut - La valeur de l'attribut   
     * @param {string} className - Le nom de la classe
     * @returns {HTMLElement} - Retourne element créer
     */
    createHtmlElementFilter(balise, attribute, valueAttribut, className) {
        let createBaliseDom = document.createElement(balise);
        createBaliseDom.setAttribute(attribute, valueAttribut);
        createBaliseDom.className = className;
        return createBaliseDom;
    }
}
