import mediaCard from "../factories/mediaCard.js";

export default class CardDom {
    /**
     * Construction du DOM de la galerie Media
     * @param {Object} elementCard - object des info de la card Media
     * @param {Object} info - récupere les info personel du photographes
     */

    constructor(elementCard, info) {
        this.info = info;
        this.element = elementCard;
        this.CreateCardDom(elementCard);
        this.displayHeart();
    }

    displayHeart() {
        if (this.element.data == false) {
            let iconDislike = "<i class='far fa-heart'></i>";
            return iconDislike;
        } else if (this.element.data == true) {
            let iconLike = "<i class='fas fa-heart'></i>";
            return iconLike;
        }
    }
    /**
     * @param {Object} card - Element de Object
     */
    CreateCardDom(card) {
        const getContainerMedia = document.getElementById("container-media");
        let heart = this.displayHeart();
        this.root = this.createBaliseWithClass(
            "article",
            "card-media",
            "class"
        );
        this.root.setAttribute("tabindex", "0");
        this.content = this.createBaliseWithClass(
            "figure",
            "figure-box",
            "class"
        );
        this.content.setAttribute("tabindex", "0");
        this.legende = this.createBaliseWithClass(
            "figcaption",
            "legende-box",
            "class"
        );
        this.legende.innerHTML = `${card.title} 
        <button role="button" aria-label="like media" tabindex="0">
            <span class="likes" tabindex="0">${card.likes}</span>
            <span id="${card.id}" class="icon-like" tabindex="0" role="button" aria-label="likes">${heart}</span>
        </button>`;

        const cardMediaIcone = mediaCard(
            card,
            this.info,
            this.content,
            this.root
        );
        if (cardMediaIcone.video) {
            this.root.innerHTML = "<i class='fas fa-video video-icon'></i>";
        }
        getContainerMedia.appendChild(this.root);
        this.root.appendChild(this.content);
        this.root.appendChild(this.legende);
    }
    /**
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
