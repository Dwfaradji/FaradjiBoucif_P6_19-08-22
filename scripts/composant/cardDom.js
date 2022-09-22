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

        this.content = this.createBaliseWithClass("div", "figure-box", "class");
        this.legende = this.createBaliseWithClass(
            "div",
            "legende-box",
            "class"
        );
        this.legende.innerHTML = `${card.title} 
        <button tabindex="0">
          <span class="likes">${card.likes}</span>
          <span id="${card.id}" class="icon-like" aria-label="likes">${heart}</span>
        </button>`;

        if (card.image) {
            this.displayPicure(card);
        } else if (card.video) {
            this.displayVideo(card);
            this.root.innerHTML = "<i class='fas fa-video video-icon'></i>";
        }

        getContainerMedia.appendChild(this.root);
        this.root.appendChild(this.content);
        this.root.appendChild(this.legende);
    }
    displayPicure(pictureCard) {
        let imgCard = `./assets/Sample Photos/${this.info.name}/${pictureCard.image}`;
        this.picture = this.createBaliseWithClass("img", imgCard, "src");
        this.picture.setAttribute("alt", "");
        this.content.appendChild(this.picture);
    }
    displayVideo(movieCard) {
        let videoCard = `./assets/Sample Photos/${this.info.name}/${movieCard.video}`;
        this.video = this.createBaliseWithClass(
            "video",
            "",
            "disablePictureInPicture"
        );
        this.source = this.createBaliseWithClass("source", videoCard, "src");
        this.content.appendChild(this.video);
        this.video.appendChild(this.source);
        this.source.setAttribute("type", "video/mp4");
        this.video.setAttribute("title", movieCard.title);
        return this.video;
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
