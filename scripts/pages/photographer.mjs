"use strict";
//Mettre le code JavaScript lié à la page photographer.html
//Import
import data from "../utils/dataPhotographe.mjs";
import getHeaderDOM from "../composant/header.mjs";
import getFormContact from "../composant/formulaire.mjs";

// Récupere les datas du photographe et les medias
const dataInfoPhotographe = await data();
const infoPhotographes = dataInfoPhotographe.photographers;
const mediaPhotographes = dataInfoPhotographe.media;

//- Récupération de la chaine de requète dans l'url
const urlId = window.location.search;
//- Extraction de l'Id
const urlSearchParams = new URLSearchParams(urlId);
//- Récupere id photographe
const getUrlId = urlSearchParams.get("id");
// Variables  array stock les info recupérer
let arrayMedia = [];
let arrayInfo = [];
let totalLikes = 0;

// Va récupérer Id du photographe recupérer dans url et va le comparer au fichier .json
// et recuperera les informations du photographe et va le stocker dans un tableau
// arrayMedia pour les media et arrayInfo pour les info du photographes
getInfoPhotographes(mediaPhotographes, arrayMedia);
getInfoPhotographes(infoPhotographes, arrayInfo);
function getInfoPhotographes(media, array) {
  media.forEach((info) => {
    if (info.photographerId == getUrlId || info.id == getUrlId) {
      array.push(info);
    }
  });
}

const info = arrayInfo[0];
//ELEMENT DOM
const getCarousselDom = document.getElementById("container-carousel");
const containerMedia = document.getElementById("container-media");
const getfilterPopulaire = document.getElementById("filter_popular");
const getfilterDate = document.getElementById("filter_date");
const getfilterTitle = document.getElementById("filter_title");
// Block info du photographe
getHeaderDOM(info);
//Formulaire
getFormContact(info);

eventBtnFilter();
/**@TODO Ouvre le boutton filter et le referme  */

function eventBtnFilter() {
  const exitFilter = document.querySelector("main");
  const filterList = document.getElementById("filterList");
  exitFilter.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id !== "buttonFilter") {
      filterList.style.display = "none";
    } else {
      filterList.style.display = "block";
    }
  });
}


/**@TODO Construit les élements du dom  */
// ELEMENT DOM ===================================================================++++++
class DisplayDom {
  constructor() {
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

  /**
   *
   * @param {Object} element - object des info de la card
   * @param {String} image - Nom de l'image + extension
   * @param {String} video - Non de la video + extension
   * @param {String} title - Titre de l'image
   * @param {Number} likes - Nombre de like
   * @param {Number} id - id de la card
   */
  displayCardDom(element, image, video, title, likes, id) {
    this.root = this.createBaliseWithClass("article", "card-media", "class");
    this.children = this.createBaliseWithClass("figure", "figure-box", "class");
    this.legende = this.createBaliseWithClass(
      "figcaption",
      "legende-box",
      "class"
    );
    this.legende.innerHTML = ` 
        ${title} <span class="likes"> <strong >${likes}</strong>
        <span id="${id}" class="icon-like"><i class="far fa-heart"></i></span>`;

    if (element.image) {
      this.displayPicure(image);
      this.children.appendChild(this.picture);
    } else if (element.video) {
      this.displayVideo(video);
      this.children.appendChild(this.video);
      this.video.appendChild(this.source);
    }
    containerMedia.appendChild(this.root);
    this.root.appendChild(this.children);
    this.children.appendChild(this.legende);
  }
  displayPicure(image) {
    let imgCard = `./assets/Sample Photos/${info.name}/${image}`;
    this.picture = this.createBaliseWithClass("img", imgCard, "src");
    this.picture.setAttribute("alt", "");
  }
  displayVideo(video) {
    let videoCard = `./assets/Sample Photos/${info.name}/${video}`;
    this.video = this.createBaliseWithClass("video", "", "controls", "");
    this.source = this.createBaliseWithClass("source", videoCard, "src", "");
    this.source.setAttribute("type", "video/mp4");
  }

  displayCarousel() {
    this.itemCard.forEach((element) => {
      this.item = this.createBaliseWithClass("div", "item", "class");
      this.legendeCarousel = this.createBaliseWithClass(
        "h2",
        "carousel-sous-titre",
        "class"
      );
      this.legendeCarousel.innerHTML = element.title;

      if (element.image) {
        this.displayPicure(element.image, element.title);
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
  /**
   *
   * @param {String} createElement
   * @param {String} className
   * @param {String} attribute
   * @returns {HTMLElement}
   */
  createBaliseWithClass(createElement, className, attribute) {
    let balise = document.createElement(createElement);
    balise.setAttribute(attribute, className);
    return balise;
  }
}
new DisplayDom();


/**@TODO Trie les cards lorsqu'on clic sur les options du filtre avec la methode sort */
// FILTER ========================================================================++++
class FilterCard {
  constructor() {
    this.btnFilter();
  }
  //Supprime le dom
  deleteDom() {
    while (containerMedia.firstChild) {
      containerMedia.removeChild(containerMedia.firstChild);
    }
  }
  deleteCarousel() {
    while (getCarousselDom.firstChild) {
      getCarousselDom.removeChild(getCarousselDom.firstChild);
    }
  }
  // Liste filtre
  btnFilter() {
    getfilterPopulaire.addEventListener(
      "click",
      this.filterPopulaire.bind(this)
    );
    getfilterDate.addEventListener("click", this.filterDate.bind(this));
    getfilterTitle.addEventListener("click", this.filterTitle.bind(this));
  }

  filterPopulaire() {
    arrayMedia = this.triePopulaire();
    this.deleteDom();
    new DisplayDom();
  }
  filterDate() {
    arrayMedia = this.trieDate();
    this.deleteDom();
    new DisplayDom();
  }
  filterTitle() {
    arrayMedia = this.trieTitle();
    this.deleteDom();
    new DisplayDom();
  }
  // Trie le tableau des cards en fonction du parametre definie et return un tableau trier
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

new FilterCard();

/**@TODO les images se repete lorsque je trie mes cards */
// CAROUSEL======================================================================+++++++
class Carousel {
  /**
   * @param {HTMLElement} element
   * @param {Object} options
   * @param {Object} options.slidesToScroll nombres d'element a faire défiler
   * @param {Object} options.slidesVisible nombres d'element visible dans le slide
   * @param {boolean} options.loop doit-on boucler en fin de carousel
   */

  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign(
      {},
      {
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: false,
      },
      options
    );

    this.currentItem = 0;
    this.root = this.createDivWithClass("carousel");
    this.container = this.createDivWithClass("carousel-container");
    this.root.setAttribute("tabindex", "0");

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
    this.root.addEventListener("keyup", (e) => {
      console.log(e.key);
      if (e.key === "ArrowRight") {
        this.next();
      } else if (e.key === "ArrowLeft") {
        this.prev();
      }
    });
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
   * @param {number} index
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
   * @param {string} className
   * @return {HTMLElement}
   *
   */
  createDivWithClass(className) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    return div;
  }
}
/** @TODO  Cible la card clicker et va ouvrir le carousel et lire la class Carousel */
const getDomArticle = document.querySelectorAll(".card-media figure img");
getDomArticle.forEach((element) => {
  element.addEventListener("click", (e) => {
    console.log(e);
    getCarousselDom.style.display = "block";
    new Carousel(getCarousselDom),
      {
        slidesToScroll: 1,
        slidesVisible: 1,
      };
  });
});

// LIKES ==========================================================================++++
class Likes {
  /**
   * @param {HTMLElement} card - element htm qui cible les icones likes clicker
   * @param {EventListener} event - ecouteur d'evenement sur la class  icon-likes
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
getLikeIcon.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    new Likes(icon, event);
  });
});

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

function countTotalLikes() {
  arrayMedia.forEach((element) => {
    const likes = element.likes;
    totalLikes += likes;
  });
  return totalLikes;
}
