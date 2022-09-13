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
      "button-filter"
    );
    btnFilter.innerHTML = `Populaire <i class="fas fa-chevron-down chevron"></i>`;
    const filterList = this.createHtmlElementFilter(
      "ul",
      "id",
      "filterList",
      "photographMedias__filtersMenu--list"
    );
    const listFilter1 = this.createHtmlElementFilter(
      "li",
      "id",
      "filter_popular",
      ""
    );
    listFilter1.innerHTML = `Populaire <i class="fas fa-chevron-up chevron"></i>`;
    const listFilter2 = this.createHtmlElementFilter(
      "li",
      "id",
      "filter_date",
      ""
    );
    listFilter2.innerHTML = "Date";
    const listFilter3 = this.createHtmlElementFilter(
      "li",
      "id",
      "filter_title",
      ""
    );
    listFilter3.innerHTML = "Titre";

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

/* <div class="filter">
<p>Trier par :</p>
<button id="buttonFilter" class="button-filter">
  Populaire<i class="fas fa-chevron-down chevron-down"></i>
</button>
<ul id="filterList" class="photographMedias__filtersMenu--list ">
  <li id="filter_popular">Popularité</li>
  <li id="filter_date">Date</li>
  <li id="filter_title"> Titre</li>
</ul>
</div> */
