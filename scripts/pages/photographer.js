"use strict";
//Mettre le code JavaScript lié à la page photographer.html
import data from "../utils/dataPhotographe.js";
import getHeaderDOM from "../composant/header.js";
import getFormContact from "../composant/formulaire.js";

const dataInfoPhotographe = await data();
const infoPhotographes = dataInfoPhotographe.photographers;
const mediaPhotographes = dataInfoPhotographe.media;

//- Récupération de la chaine de requète dans l'url
const urlId = window.location.search;
//- Extraction de l'Id
const urlSearchParams = new URLSearchParams(urlId);
//- Récupere id photographe
const getIdPhotographe = urlSearchParams.get("id");
// Variables  array stock les info recupérer
let arrayMedia = [];
let arrayInfo = [];

// Va récupérer Id du photographe recupérer dans url et va le comparer au fichier .json
// et recuperera les informations du photographe et va le stocker dans un tableau
// arrayMedia pour les media et arrayInfo pour les info du photographes
getInfoPhotographes(mediaPhotographes, arrayMedia);
getInfoPhotographes(infoPhotographes, arrayInfo);
function getInfoPhotographes(media, array) {
  media.forEach((info) => {
    if (
      info.photographerId == getIdPhotographe ||
      info.id == getIdPhotographe
    ) {
      array.push(info);
    }
  });
}
const info = arrayInfo[0];

getHeaderDOM(info);
//Formulaire
getFormContact(info);

// addEventListener sur le boutton filtre
const buttonFilter = document.getElementById("buttonFilter");
function addEventBtnFilter() {
  buttonFilter.addEventListener("click", (e) => {
    e.preventDefault();
    const filterList = document.getElementById("filterList");
    filterList.style.display = "block";
    buttonFilter.style.display = "none";
  });
}
//  addEventListener sur main pour fermer le boutton filtre
function addEventCloseFilter() {
  const exitFilter = document.querySelector("main");
  exitFilter.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id !== "buttonFilter") {
      const filterList = document.getElementById("filterList");
      filterList.style.display = "none";
      buttonFilter.style.display = "block";
    }
  });
}
addEventBtnFilter();
addEventCloseFilter();

// ELEMENT DOM ===================================================================++++++
class displayDom {
  constructor() {
    this.cardMedia = document.querySelector(".container-media");
    this.itemCard = arrayMedia.map((element) => {
      this.displayCardDom(
        element,
        element.image,
        element.video,
        element.title,
        element.likes,
        element.id
      );
      return element;
    });
    this.displayCarousel();
  }

  displayCardDom(element, image, video, title, likes, id) {
    this.root = this.createBaliseWithClass("article", "card-media", "class");
    this.children = this.createBaliseWithClass("figure", "figure-box", "class");
    this.legende = this.createBaliseWithClass(
      "figcaption",
      "legende-box",
      "class"
    );
    // Placer le resultat likes
    this.legende.innerHTML = ` 
    ${title} <strong class="likes">${likes}</strong>
    <span id="${id}" class="icon-like"><i class="far fa-heart"></i></span></figcaption>`;

    if (element.image) {
      this.displayPicure(image);
      this.children.appendChild(this.picture);
    } else if (element.video) {
      this.displayVideo(video);
      this.children.appendChild(this.video);
      this.video.appendChild(this.source);
    }
    this.cardMedia.appendChild(this.root);
    this.root.appendChild(this.children);
    this.children.appendChild(this.legende);
  }
  displayPicure(image) {
    let imgCard = `./assets/Sample Photos/${info.name}/${image}`;
    this.picture = this.createBaliseWithClass("img", imgCard, "src", "alt");
  }
  displayVideo(video) {
    let videoCard = `./assets/Sample Photos/${info.name}/${video}`;
    this.video = this.createBaliseWithClass("video", "", "controls", "");
    this.source = this.createBaliseWithClass("source", videoCard, "src", "");
  }

  displayCarousel() {
    const getCarousselDom = document.querySelector("#container-carousel");
    this.itemCard.forEach((element) => {
      this.item = this.createBaliseWithClass("div", "item", "class");
      this.legendeCarousel = this.createBaliseWithClass(
        "p",
        "carousel-sous-titre",
        "class"
      );
      this.legendeCarousel.innerHTML = element.title;

      if (element.image) {
        this.displayPicure(element.image);
        this.item.appendChild(this.picture);
      } else if (element.video) {
        this.displayVideo(element.video);
        this.item.appendChild(this.video);
        this.video.appendChild(this.source);
      }
      this.item.appendChild(this.legendeCarousel);
      getCarousselDom.appendChild(this.item);
    });
  }

  createBaliseWithClass(createElement, className, attribute) {
    let balise = document.createElement(createElement);
    balise.setAttribute(attribute, className);
    return balise;
  }
}
new displayDom();

// CAROUSEL======================================================================+++++++
class Carousel {
  /**
   * @params {HTMLElement} element
   * @params {Object} options
   * @params {Object} options.slidesToScroll nombres d'element a faire défiler
   * @params {Object} options.slidesVisible nombres d'element visible dans le slide
   * @params {boolean} options.loop doit-on boucler en fin de carousel
   */

  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign(
      {},
      {
        slidesToScroll: 3,
        slidesVisible: 3,
        loop: false,
      },
      options
    );

    this.currentItem = 0;
    this.root = this.createDivWithClass("carousel");
    this.container = this.createDivWithClass("carousel-container");
    let children = [].slice.call(element.children);

    // boucle sur les image et supprime les doublons
    this.root.appendChild(this.container);
    this.element.appendChild(this.root);

    this.items = children.map((child) => {
      let item = this.createDivWithClass("carousel-item");
      item.appendChild(child);
      this.container.appendChild(item);
      return item;
    });
    this.setStyle();
    this.createNavigation();
  }
  /**
   * Applique les bonnes dimmensions aux elements du carousel
   */
  setStyle() {
    let ratio = this.items.length / this.options.slidesVisible;
    this.container.style.width = ratio * 100 + "%";
    this.items.forEach(
      (item) =>
        (item.style.width = 100 / this.options.slidesVisible / ratio + "%")
    );
  }
  createNavigation() {
    let nextButton = this.createDivWithClass("carousel-next");
    let prevButton = this.createDivWithClass("carousel-prev");
    let exitButton = this.createDivWithClass("carousel-exit");
    this.root.appendChild(nextButton);
    this.root.appendChild(prevButton);
    this.root.appendChild(exitButton);
    nextButton.addEventListener("click", this.next.bind(this));
    prevButton.addEventListener("click", this.prev.bind(this));
    exitButton.addEventListener("click", this.exit.bind(this));
  }
  next() {
    this.gotoItem(this.currentItem + this.options.slidesToScroll);
  }
  prev() {
    this.gotoItem(this.currentItem - this.options.slidesToScroll);
  }
  exit() {
    getCarousselDom.style.display = "none";
  }
  /**
   * Déplace le carousel vers l'élément ciblé
   * @params {number} index
   */
  gotoItem(index) {
    if (index < 0) {
      index = this.items.length - this.options.slidesVisible;
    } else if (
      index >= this.items.length ||
      this.items[this.currentItem + this.options.slidesVisible] === undefined
    ) {
      index = 0;
    }
    let translateX = (index * -100) / this.items.length;
    this.container.style.transform = `translate3d(${translateX}%, 0, 0)`;
    this.currentItem = index;
  }
  /**
   * @params {string} className
   * @returns{HTMLElement}
   *
   */
  createDivWithClass(className) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    return div;
  }
}

const getCarousselDom = document.querySelector("#container-carousel");
const getDomArticle = document.querySelectorAll(".card-media img");
getDomArticle.forEach((element) => {
  element.addEventListener("click", (e) => {
    getCarousselDom.style.display = "block";
    new Carousel(document.querySelector("#container-carousel"), {
      slidesToScroll: 1,
      slidesVisible: 1,
    });
  });
});

// FILTER ========================================================================++++
class filterCard {
  constructor() {
    this.btnFilter();
  }
  deleteDom() {
    var element = document.querySelector(".container-media");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  btnFilter() {
    this.deleteDom();
    const getfilterPopulaire = document.getElementById("filter_popular");
    const getfilterDate = document.getElementById("filter_date");
    const getfilterTitle = document.getElementById("filter_title");
    getfilterPopulaire.addEventListener(
      "click",
      this.filterPopulaire.bind(this)
    );
    getfilterDate.addEventListener("click", this.filterDate.bind(this));
    getfilterTitle.addEventListener("click", this.filterTitle.bind(this));
  }
  filterPopulaire() {
    arrayMedia = this.triePopulaire();
  }
  filterDate() {
    arrayMedia = this.trieDate();
  }
  filterTitle() {
    arrayMedia = this.trieTitle();
  }

  triePopulaire() {
    const arrayPopulaire = arrayMedia.sort(function (a, b) {
      return b.likes - a.likes;
    });
    return arrayPopulaire;
  }
  trieDate() {
    const arrayDate = arrayMedia.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    return arrayDate;
  }
  trieTitle() {
    const arrayTitle = arrayMedia.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    return arrayTitle;
  }
}
const filterList = document.getElementById("filterList");
filterList.addEventListener("click", () => {
  debugger;
  new filterCard();
  new displayDom();
});

// LIKES ==========================================================================++++
let totalLikes = 0;
class Likes {
  /**
   * @params {HTMLElement} card
   * @params {EventListener} event
   */
  constructor(card, event) {
    this.targetIdCard = card.id;
    this.element = card;
    this.target = event;

    this.iconLike = `<i class="fas fa-heart"></i>`;
    this.iconDislike = `<i class="far fa-heart"></i>`;
    this.addLikeCard();
    this.updateTotalLike();
    this.numberLikes = this.target.path[2].children[0];
    this.numberLikes.innerHTML = this.updateLikes.toString();
  }
  updateTotalLike() {
    const getBoxInfo = document.querySelector(".total-likes");
    getBoxInfo.innerHTML = totalLikes.toString();
    getBoxInfo.innerHTML = totalLikes.toString();
  }

  addLikeCard() {
    arrayMedia.forEach((card) => {
      if (card.id == this.targetIdCard) {
        let getLikeCard = card.likes;
        let targetValueLike = this.target.path[2].children[0].textContent;
        if (getLikeCard == targetValueLike) {
          this.updateLikes = getLikeCard + 1;
          totalLikes++;
          this.element.innerHTML = this.iconLike;
        } else if (this.updateLikes !== getLikeCard) {
          this.updateLikes = getLikeCard;
          this.element.innerHTML = this.iconDislike;
          totalLikes--;
        }
      }
    });
  }
}

const getLikeIcon = document.querySelectorAll(".icon-like");
console.log(getLikeIcon);
getLikeIcon.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    new Likes(icon, event);
  });
});
function countTotalLikes() {
  arrayMedia.forEach((element) => {
    const likes = element.likes;
    totalLikes += likes;
  });
  return totalLikes;
}
countTotalLikes();

// BOX INFO ==================================================================++++++
class BoxInfo {
  constructor() {
    this.createBoxInfo();
  }
  createBoxInfo() {
    const createDiv = document.querySelector("main");
    const header = document.createElement("div");
    header.className = "buble-info";
    header.innerHTML = `
	 <span class="total-likes">${totalLikes}</span><span><i class="fas fa-heart"></i></span><span>${info.price} /jour</span>
  `;
    createDiv.appendChild(header);
  }
}
new BoxInfo();
