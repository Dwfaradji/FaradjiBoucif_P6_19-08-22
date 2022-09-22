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
export { onOpenModal, onCloseModal,getTabIndex };
