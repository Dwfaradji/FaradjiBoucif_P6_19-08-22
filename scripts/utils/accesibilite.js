import Likes from "../composant/likes.js";
import Carousel from "../composant/carousel.js";

const body = document.querySelector("body");
const main = document.querySelector("#main");

function onOpenModal(selectElement, scroll) {
    const element = document.querySelector(selectElement);
    body.setAttribute("class", scroll);
    main.setAttribute("aria-hidden", "true");
    element.setAttribute("aria-hidden", "false");
}
function onCloseModal(selectElement, scroll) {
    const element = document.querySelector(selectElement);
    body.removeAttribute("class", scroll);
    main.setAttribute("aria-hidden", "false");
    element.setAttribute("aria-hidden", "true");
}
function getTabIndex(index) {
    const getTabIndexCard = main.querySelectorAll("[tabindex]");
    getTabIndexCard.forEach((el) => {
        el.setAttribute("tabindex", index);
    });
}
function keyboardLike(
    elementEvent,
    arrayMedia,
    nameClass,
    getContainerCarousel,
    index,
    info
) {
    const access = "#container-carousel";
    elementEvent.addEventListener("keyup", (e) => {
        e.preventDefault();
        const keyEnter = e.key === "Enter";
        if (nameClass == Likes) {
            if (keyEnter) {
                new nameClass(elementEvent, arrayMedia);
            }
        } else if (nameClass == Carousel) {
            if (keyEnter) {
                onOpenModal(access, "no-scroll");
                getTabIndex("-1");
                new nameClass(getContainerCarousel, index, arrayMedia, info);
            }
        }
    });
}

// function keyBoardFilter(elementFilter, filter) {
//     console.log(filter());
//     elementFilter.addEventListener("keyup", (e) => {
//         if (e.key === "Enter") {
//             filter;
//         }
//     });
// }

export { onOpenModal, onCloseModal, getTabIndex, keyboardLike };
