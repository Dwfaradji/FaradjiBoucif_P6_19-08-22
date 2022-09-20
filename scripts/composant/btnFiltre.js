export default class BtnFiltre {
    constructor() {
        this.btnFiltre();
    }
    btnFiltre() {
        const getFilterClass = document.querySelector('.filter');
        const label = this.createHtmlElementFilter('p', 'class', 'label', '');
        label.innerHTML = 'Trier par :';
        const btnFilter = this.createHtmlElementFilter(
            'button',
            'id',
            'buttonFilter',
            'button-filter'
        );
        btnFilter.innerHTML = 'Populaire <i class="fas fa-chevron-down chevron"></i>';
        const filterList = this.createHtmlElementFilter(
            'ul',
            'id',
            'filterList',
            'photographMedias__filtersMenu--list'
        );
        filterList.setAttribute('aria-hidden', 'true');
        filterList.setAttribute('role', 'filtre');
        const listFilter1 = this.createHtmlElementFilter(
            'li',
            'id',
            'filter_popular',
            ''
        );
        listFilter1.innerHTML = 'Populaire <i class="fas fa-chevron-up chevron"></i>';
        listFilter1.setAttribute('aria-label', 'filtre populaire');
        const listFilter2 = this.createHtmlElementFilter(
            'li',
            'id',
            'filter_date',
            ''
        );
        listFilter2.innerHTML = 'Date';
        const listFilter3 = this.createHtmlElementFilter(
            'li',
            'id',
            'filter_title',
            ''
        );
        listFilter3.innerHTML = 'Titre';

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
