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

        const filterList = this.createHtmlElementFilter(
            "ul",
            "id",
            "filterList",
            "photographMedias__filtersMenu--list"
        );
        filterList.setAttribute("aria-hidden", "true");
        filterList.setAttribute("role", "filtre");

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
        const listFilter2 = this.createHtmlElementFilter(
            "li",
            "id",
            "filter_date",
            ""
        );
        listFilter2.innerHTML = "Date";
        listFilter2.setAttribute("tabindex", "0");
        listFilter2.setAttribute("aria-label", "filtre date");
        const listFilter3 = this.createHtmlElementFilter(
            "li",
            "id",
            "filter_title",
            "title"
        );
        listFilter3.innerHTML = "Titre";
        listFilter3.setAttribute("tabindex", "0");
        listFilter3.setAttribute("aria-label", "filtre titre");
        getFilterClass.appendChild(label);
        getFilterClass.appendChild(btnFilter);
        getFilterClass.appendChild(filterList);
        filterList.appendChild(listFilter1);
        filterList.appendChild(listFilter2);
        filterList.appendChild(listFilter3);
    }

    createHtmlElementFilter(balise, attribute, valueAttribut, className) {
        let createBaliseDom = document.createElement(balise);
        createBaliseDom.setAttribute(attribute, valueAttribut);
        createBaliseDom.className = className;
        return createBaliseDom;
    }
}
