"use strict";
//Mettre le code JavaScript lié à la page photographer.html
//Import
import data from "../utils/dataPhotographe.mjs";
import displayDomSectionInfoPhotographer from "../composant/header.mjs";
import displayDomForm from "../composant/formulaire.mjs";
import { displayModal, closeModal } from "../utils/contactForm.mjs";
import BtnFiltre from "../composant/btnFiltre.mjs";
// Récupere les datas du photographe et les medias
const dataPhotographe = await data();
const getInfoPhotographers = dataPhotographe.photographers;
const getMediaPhotographers = dataPhotographe.media;

//- Récupération de la chaine de requète dans l'url
const urlId = window.location.search;
//- Extraction de l'Id
const urlSearchParams = new URLSearchParams(urlId);
//- Récupere id photographe
const getUrlId = urlSearchParams.get("id");
// Variables  array stock les info recupérer
let arrayMedia = [];
let arrayInfo = [];
let countTotalLikes = 0;

// Va récupérer Id du photographe recupérer dans url et va le comparer au fichier .json
// et recuperera les informations du photographe et va le stocker dans un tableau
// arrayMedia pour les media et arrayInfo pour les info du photographes
getPhotographerId(getMediaPhotographers, arrayMedia);
getPhotographerId(getInfoPhotographers, arrayInfo);

function getPhotographerId(arrays, newArray) {
  arrays.forEach((array) => {
    if (array.photographerId == getUrlId || array.id == getUrlId) {
      newArray.push(array);
    }
  });
}
//@TODO a modifier variables name
const info = arrayInfo[0];
//ELEMENT DOM
new BtnFiltre();
const getCarousselDom = document.getElementById("container-carousel");
const getContainerMedia = document.getElementById("container-media");
const getfilterPopulaire = document.getElementById("filter_popular");
const getfilterDate = document.getElementById("filter_date");
const getfilterTitle = document.getElementById("filter_title");
// Block info du photographe
displayDomSectionInfoPhotographer(info);
const getBtnContact = document.querySelector(".contact_button");
const getCloseModals = document.querySelectorAll(".close-modal");

// Display Formulaire
getBtnContact.addEventListener("click", () => {
  displayModal();
});
displayDomForm(info);
// Close Formulaire
getCloseModals.forEach((getCloseModal) => {
  getCloseModal.addEventListener("click", () => {
    closeModal();
  });
});

/**@TODO Ouvre le boutton filter et le referme  */

const getBtnFilter = document.querySelector("#buttonFilter");
function openAndCloseListFilter() {
  const getFilterList = document.getElementById("filterList");
  document.addEventListener("click", (e) => {
    if (e.target.id !== "buttonFilter") {
      getFilterList.style.display = "none";
      getBtnFilter.style.display = "block";
    } else {
      getFilterList.style.display = "block";
      getBtnFilter.style.display = "none";
    }
  });
}
openAndCloseListFilter();

/**@TODO Construit les élements du dom  */
// ELEMENT DOM ===================================================================++++++
class CardDom {
  constructor(elementCard) {
    this.CreateCardDom(elementCard);
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
  CreateCardDom(card) {
    this.href = this.createBaliseWithClass("a", "", "href");
    this.root = this.createBaliseWithClass("article", "card-media", "class");
    this.content = this.createBaliseWithClass("div", "figure-box", "class");
    this.legende = this.createBaliseWithClass("div", "legende-box", "class");
    this.legende.innerHTML = `${card.title} 
        <div>
          <span class="likes">${card.likes}</span>
          <span id="${card.id}" class="icon-like"><i class="far fa-heart"></i></span>
        </div>`;

    if (card.image) {
      this.displayPicure(card.image);
    } else if (card.video) {
      this.displayVideo(card.video);
    }

    getContainerMedia.appendChild(this.href);
    this.href.appendChild(this.root);
    this.root.appendChild(this.content);
    this.root.appendChild(this.legende);
  }
  displayPicure(pictureCard) {
    let imgCard = `./assets/Sample Photos/${info.name}/${pictureCard}`;
    this.picture = this.createBaliseWithClass("img", imgCard, "src");
    this.picture.setAttribute("alt", "");
    this.content.appendChild(this.picture);
  }
  displayVideo(movieCard) {
    let videoCard = `./assets/Sample Photos/${info.name}/${movieCard}`;
    this.video = this.createBaliseWithClass("video", "", "controls");
    this.source = this.createBaliseWithClass("source", videoCard, "src");
    this.content.appendChild(this.video);
    this.video.appendChild(this.source);
    this.source.setAttribute("type", "video/mp4");
  }
  /**
   *
   * @param {String} createElement - Création balise html
   * @param {String} valueAttribut - Valeur de l'attribut
   * @param {String} attribute - Ajout atrributes
   * @returns {HTMLElement} Retourne un element HTML
   */
  createBaliseWithClass(createElement, valueAttribut, attribute) {
    let balise = document.createElement(createElement);
    balise.setAttribute(attribute, valueAttribut);
    return balise;
  }
}

function deleteDom() {
  while (getContainerMedia.firstChild) {
    getContainerMedia.removeChild(getContainerMedia.firstChild);
  }
}
function displayCardDom(domCards) {
  deleteDom();
  domCards.forEach((domCard) => {
    new CardDom(domCard);
  });
}
// CAROUSEL======================================================================+++++++
class Carousel {
  /**
   * @param {HTMLElement} element
   * @param {Object} options
   * @param {Object} options.slidesToScroll nombres d'element a faire défiler
   * @param {Object} options.slidesVisible nombres d'element visible dans le slide
   * @param {boolean} options.loop doit-on boucler en fin de carousel
   */

  constructor(element, eventElement, index, options = {}) {
    let indexElement = { element, index };

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

    let firstArrayElement = [];
    let lastArrayElement = [];

    this.diplayOrderHtmlElement(
      indexElement,
      firstArrayElement,
      lastArrayElement
    );
    this.createDomCarousel();
    this.getHtmlElement();

    this.setStyle();
    this.createNavigation();
    this.root.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight") {
        this.next();
      } else if (e.key === "ArrowLeft") {
        this.prev();
      }
    });
  }

  diplayOrderHtmlElement(indexElement, firstArray, lastArray) {
    arrayMedia.map((child, index) => {
      let childIndex = { child, index };
      if (indexElement.index <= childIndex.index) {
        firstArray.push(childIndex.child);
      } else if (indexElement.index >= childIndex.index) {
        lastArray.push(childIndex.child);
      }
    });
    this.arrayElementDom = firstArray.concat(lastArray);
  }
  getHtmlElement() {
    let carouselContainer = document.querySelector(".carousel-container");
    let children = [].slice.call(carouselContainer.children);
    this.items = children.map((child) => {
      return child;
    });
  }

  displayPicure(image) {
    let imgCard = `./assets/Sample Photos/${info.name}/${image}`;
    this.picture = this.createBaliseWithClass("img", imgCard, "src");
    this.picture.setAttribute("alt", "");
  }
  displayVideo(video) {
    let videoCard = `./assets/Sample Photos/${info.name}/${video}`;
    this.video = this.createBaliseWithClass("video", "", "controls");
    this.source = this.createBaliseWithClass("source", videoCard, "src");
    this.source.setAttribute("type", "video/mp4");
  }
  createDomCarousel() {
    this.root = this.createDivWithClass("carousel");
    this.root.setAttribute("tabindex", "0");
    this.container = this.createDivWithClass("carousel-container");

    // boucle sur les image et supprime les doublons
    this.element.appendChild(this.root);
    this.root.appendChild(this.container);

    this.arrayElementDom.map((element) => {
      this.carouselItems = this.createBaliseWithClass(
        "div",
        "carousel-item",
        "class"
      );
      this.item = this.createBaliseWithClass("div", "item", "class");
      this.container.appendChild(this.carouselItems);
      this.carouselItems.appendChild(this.item);
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
    });
  }

  createBaliseWithClass(createElement, className, attribute) {
    let balise = document.createElement(createElement);
    balise.setAttribute(attribute, className);
    return balise;
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
    this.element.style.display = "none";
    this.deleteCarousel();
  }
  deleteCarousel() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
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

function displayCarousel() {
  const getDomArticles = document.querySelectorAll(".card-media .figure-box ");
  const getContainerCarousel = document.getElementById("container-carousel");
  getDomArticles.forEach((getDomArticle, index) => {
    getDomArticle.addEventListener("click", (e) => {
      // debugger;
      e.preventDefault();
      new Carousel(getContainerCarousel, getDomArticle, index);
      getContainerCarousel.style.display = "block";
    });
  });
}
let testObject;
/**@TODO Trie les cards lorsqu'on clic sur les options du filtre avec la methode sort */
// FILTER ========================================================================++++
class FilterCard {
  constructor() {
    this.listenerFilterList();
  }
  // Liste filtre
  listenerFilterList() {
    getfilterPopulaire.addEventListener(
      "click",
      this.filterPopulaire.bind(this)
    );
    getfilterDate.addEventListener("click", this.filterDate.bind(this));
    getfilterTitle.addEventListener("click", this.filterTitle.bind(this));
  }

  // Trie le tableau des cards en fonction du parametre definie et return un tableau trier
  filterPopulaire() {
    getBtnFilter.innerHTML = `Populaire  <i class="fas fa-chevron-down chevron"></i>`;
    arrayMedia.sort((a, b) => {
      return b.likes - a.likes;
    });
    console.log(testObject);

    init();
  }
  filterDate() {
    getBtnFilter.innerHTML = `Date <i class="fas fa-chevron-down chevron"></i>`;
    arrayMedia.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    init();
  }
  filterTitle() {
    getBtnFilter.innerHTML = `Titre <i class="fas fa-chevron-down chevron"></i>`;
    arrayMedia.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    init();
  }
}

// LIKES ==========================================================================++++
class Likes {
  /**
   * @param {HTMLElement} elementCard - element HTML qui cible les icones likes clicker
   */
  constructor(elementCard) {
    this.targetIdCard = elementCard.id;
    this.getIconLike = elementCard;
    this.getCountLikes = elementCard.parentNode.outerText;

    this.iconLike = '<i class="fas fa-heart"></i>';
    this.iconDislike = '<i class="far fa-heart"></i>';

    this.addLikeCard(arrayMedia);
    this.updateTotalLike();
    this.numberLikes = elementCard.parentNode.children[0];
    this.numberLikes.innerText = this.updateLikes.toString();
  }

  updateTotalLike() {
    const getBoxInfo = document.querySelector(".total-likes");
    getBoxInfo.innerHTML = countTotalLikes.toString();
    getBoxInfo.innerHTML = countTotalLikes.toString();
  }
  /**@TODO modifier la condition pour que incrementation se fasse sur l'object  */
  addLikeCard(getLikes) {
    getLikes.forEach((getLike) => {
      if (getLike.id == this.targetIdCard) {
        let cardLike = getLike.likes;
        if (cardLike == this.getCountLikes) {
          this.updateLikes = cardLike + 1;
          this.getIconLike.innerHTML = this.iconLike;
          countTotalLikes++;
          console.log(cardLike);
        } else if (this.updateLikes !== this.getCountLikes) {
          this.updateLikes = cardLike;
          this.getIconLike.innerHTML = this.iconDislike;
          countTotalLikes--;
        }
      }
    });
  }
}

function displayLikes() {
  const getLikeIcons = document.querySelectorAll(".icon-like");
  getLikeIcons.forEach((getLikeIcon) => {
    getLikeIcon.addEventListener("click", (e) => {
      e.preventDefault();
      new Likes(getLikeIcon);
    });
  });
}

// BOX INFO ==================================================================++++++
class BoxInfo {
  constructor() {
    this.createDomBoxInfo();
  }
  createDomBoxInfo() {
    const getBoxInfo = document.querySelector("#main");
    const div = document.createElement("div");
    div.className = "buble-info";
    div.innerHTML = `
	  <span class="total-likes">${countTotalLikes}</span>
    <span><i class="fas fa-heart"></i></span>
    <span>${info.price} /jour</span> `;
    getBoxInfo.appendChild(div);
  }
}

function displayCountTotalLikes() {
  arrayMedia.forEach((element) => {
    const likes = element.likes;
    countTotalLikes += likes;
  });
  return countTotalLikes;
}

function init() {
  displayCardDom(arrayMedia);
  displayCarousel();
  new FilterCard();
  displayLikes();
}
displayCountTotalLikes();
new BoxInfo();
init();
