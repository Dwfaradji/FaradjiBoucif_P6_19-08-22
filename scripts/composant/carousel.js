// CAROUSEL======================================================================+++++++
import { onCloseModal, getTabIndex } from "../utils/accesibilite.js";
import mediaCard from "../factories/mediaCard.js";
export default class Carousel {
    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} options.slidesToScroll nombres d'element a faire défiler
     * @param {Object} options.slidesVisible nombres d'element visible dans le slide
     * @param {boolean} options.loop doit-on boucler en fin de carousel
     */

    constructor(element, index, array, info, options = {}) {
        let indexElement = { element, index };
        this.element = element;
        this.arrayMedia = array;
        this.info = info;
        this.options = Object.assign(
            {},
            {
                slidesToScroll: 1,
                slidesVisible: 1,
                loop: true,
            },
            options
        );

        this.currentItem = 0;
        console.log(this.currentItem);
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
        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowRight") {
                this.next();
            } else if (e.key === "ArrowLeft") {
                this.prev();
            }
        });
    }

    diplayOrderHtmlElement(indexElement, firstArray, lastArray) {
        this.arrayMedia.map((child, index) => {
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

    // displayPicure(image) {
    //     let imgCard = `./assets/Sample Photos/${this.info.name}/${image}`;
    //     this.picture = this.createBaliseWithClass("img", imgCard, "src");
    //     this.picture.setAttribute("alt", "");
    // }
    // displayVideo(video) {
    //     let videoCard = `./assets/Sample Photos/${this.info.name}/${video}`;
    //     this.video = this.createBaliseWithClass("video", "", "controls");
    //     this.source = this.createBaliseWithClass("source", videoCard, "src");
    //     this.source.setAttribute("type", "video/mp4");
    //     this.video.setAttribute("tabindex", "-1");
    // }
    createDomCarousel() {
        this.root = this.createBaliseWithClass("section", "carousel", "class");
        this.root.setAttribute("tabindex", "0");
        this.root.setAttribute("aria-label", "Vue de l'image en grand");
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

            // if (element.image) {
            //     this.displayPicure(element.image, element.title);
            //     this.item.appendChild(this.picture);
            // } else if (element.video) {
            //     this.displayVideo(element.video);
            //     this.item.appendChild(this.video);
            //     this.video.appendChild(this.source);
            // }

            const test = mediaCard(element, this.info, this.item);

            if (test.video) {
                test.video.setAttribute("controls", "");
                test.video.setAttribute("tabindex", "-1");
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
                (item.style.width =
                    100 / this.options.slidesVisible / ratio + "%")
        );
    }
    createNavigation() {
        let nextButton = this.createBaliseWithClass(
            "button",
            "carousel-next",
            "class"
        );
        nextButton.innerHTML = "<i class='fas fa-chevron-right'></i>";
        nextButton.setAttribute("title", "suivante");
        nextButton.setAttribute("tabindex", "0");
        let prevButton = this.createBaliseWithClass(
            "button",
            "carousel-prev",
            "class"
        );
        prevButton.innerHTML = "<i class='fas fa-chevron-left'></i>";
        prevButton.setAttribute("title", "précedent");
        prevButton.setAttribute("tabindex", "0");
        let exitButton = this.createBaliseWithClass(
            "button",
            "carousel-exit",
            "class"
        );

        exitButton.innerHTML = "<i class='fas fa-times'></i>";
        exitButton.setAttribute("title", "fermer");
        exitButton.setAttribute("tabindex", "0");
        this.root.appendChild(prevButton);
        this.root.appendChild(nextButton);
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
        onCloseModal("#container-carousel", "no-scroll");
        getTabIndex("0");
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
        } else if (index >= this.items.length) {
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
