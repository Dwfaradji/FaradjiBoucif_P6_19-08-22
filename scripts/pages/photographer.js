"use strict";
// Mettre le code JavaScript lié à la page photographer.html
// Import
import data from "../utils/dataPhotographe.js";
import getPhotographerId from "../utils/urlSeachParams.js";
import displayDomSectionInfoPhotographer from "../composant/header.js";
import displayDomForm from "../composant/formulaire.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import BtnFiltre from "../composant/btnFiltre.js";
import CardDom from "../composant/cardDom.js";
import Carousel from "../composant/carousel.js";
import BoxInfo from "../composant/boxInfo.js";
import Likes from "../composant/likes.js";
import FilterCard from "../composant/filterCard.js";
import {
    onCloseModal,
    onOpenModal,
    getTabIndex,
    keyboardLike,
} from "../utils/accesibilite.js";
// // Récupere les datas du photographe et les medias

const dataPhotographe = await data();
const getInfoPhotographers = dataPhotographe.photographers;
const getMediaPhotographers = dataPhotographe.media;

let arrayMedia = [];
let arrayInfo = [];

// Va récupérer Id du photographe recupérer dans url et va le comparer au fichier .json
// et recuperera les informations du photographe et va le stocker dans un tableau
// arrayMedia pour les media et arrayInfo pour les info du photographes
getPhotographerId(getMediaPhotographers, arrayMedia);
getPhotographerId(getInfoPhotographers, arrayInfo);

//@TODO a modifier variables name
const info = arrayInfo[0];
//ELEMENT DOM
new BtnFiltre();
const getContainerMedia = document.getElementById("container-media");
const getCloseModals = document.querySelectorAll(".close-modal");
const main = document.querySelector("#main");
const getBtnFilter = document.querySelector(".button-filter ");
const getFilterList = document.getElementById("filterList");
const access = "#contact_modal";

displayDomSectionInfoPhotographer(info);
displayDomForm(info);
openAndCloseListFilter("click");
openAndCloseListFilter("keypress");
new FilterCard(arrayMedia, init);
init();

function openFormulaire() {
    const getBtnContact = document.querySelector(".contact_button");
    getBtnContact.addEventListener("click", () => {
        getTabIndex("-1");
        onOpenModal("#contact_modal", "no-scroll");
        displayModal();
    });
}
openFormulaire();

function closeFormulaire() {
    getCloseModals.forEach((getCloseModal) => {
        getCloseModal.addEventListener("click", () => {
            onCloseModal(access, "no-scroll");
            closeModal();
            getTabIndex("0");
        });
    });
}
closeFormulaire();

function openAndCloseListFilter(typeEvent) {
    main.addEventListener(typeEvent, (e) => {
        e.preventDefault();
        getFilterList.addEventListener(typeEvent, () => {
            onCloseModal("#filterList", "sroll");
        });
        if (e.target.id !== "buttonFilter") {
            getFilterList.style.display = "none";
            getBtnFilter.style.display = "block";
        } else {
            getFilterList.style.display = "block";
            getBtnFilter.style.display = "none";
            onOpenModal("#filterList", "scroll");
        }
    });
}
// Affiche le dom
function deleteDom() {
    while (getContainerMedia.firstChild) {
        getContainerMedia.removeChild(getContainerMedia.firstChild);
    }
}
function displayCardDom(domCards) {
    deleteDom();
    domCards.forEach((domCard) => {
        new CardDom(domCard, info);
    });
}

function displayCarousel() {
    const getDomArticles = document.querySelectorAll(".figure-box");
    const getContainerCarousel = document.getElementById("container-carousel");
    getDomArticles.forEach((getDomArticle, index) => {
        getDomArticle.addEventListener("click", (e) => {
            e.preventDefault();
            onOpenModal("#container-carousel", "no-scroll");
            new Carousel(getContainerCarousel, index, arrayMedia, info);
            getTabIndex("-1");
        });
        keyboardLike(
            getDomArticle,
            arrayMedia,
            Carousel,
            getContainerCarousel,
            index,
            info
        );
    });
}

function displayLikes() {
    const getLikeIcons = document.querySelectorAll(".icon-like");
    getLikeIcons.forEach((getLikeIcon) => {
        getLikeIcon.addEventListener("click", (e) => {
            e.preventDefault();
            new Likes(getLikeIcon, arrayMedia);
        });
        keyboardLike(getLikeIcon, arrayMedia, Likes);
    });
}

function init() {
    displayCardDom(arrayMedia);
    displayCarousel();
    displayLikes();
}
new BoxInfo(info, arrayMedia);
