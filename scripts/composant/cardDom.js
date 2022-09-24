import mediaCard from "../factories/mediaCard.js";
export default class CardDom {
    constructor(elementCard, info) {
        this.info = info;
        this.element = elementCard;
        this.CreateCardDom(elementCard);
        this.displayHeart();
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

    displayHeart() {
        if (this.element.data == false) {
            let iconDislike = "<i class='far fa-heart'></i>";
            return iconDislike;
        } else if (this.element.data == true) {
            let iconLike = "<i class='fas fa-heart'></i>";
            return iconLike;
        }
    }

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
        this.legende = this.createBaliseWithClass(
            "figcaption",
            "legende-box",
            "class"
        );
        this.content.setAttribute("tabindex", "0");
        // this.legende.setAttribute("tabindex", "0");

        this.legende.innerHTML = `${card.title} 
        <button role="button" aria-label="like media" tabindex="0">
            <span class="likes" tabindex="0">${card.likes}</span>
            <span id="${card.id}" class="icon-like" tabindex="0" aria-label="likes">${heart}</span>
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
