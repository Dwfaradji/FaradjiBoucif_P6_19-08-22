/**
 * 
 * @param {string} createElement 
 * @param {string} valueAttribut 
 * @param {string} attribute 
 * @returns {HTMLElement} 
 */

function createBaliseWithClass(createElement, valueAttribut, attribute) {
    let balise = document.createElement(createElement);
    balise.setAttribute(attribute, valueAttribut);
    return balise;
}

class displayPicure {
    /**
     * 
     * @param {Object} pictureCard
     * @param {Object} info 
     * @param {HTMLElement} content 
     */
    constructor(pictureCard, info, content) {
        let imgCard = `./assets/Sample Photos/${info.name}/${pictureCard.image}`;
        this.picture = createBaliseWithClass("img", imgCard, "src");
        this.picture.setAttribute("alt", "");
        this.picture.setAttribute("aria-label", "image");
        content.appendChild(this.picture);
    }
}

class displayVideo {
    /**
     * 
     * @param {Object} movieCard 
     * @param {Object} info 
     * @param {HTMLElement} content 
     */
    constructor(movieCard, info, content) {
        let videoCard = `./assets/Sample Photos/${info.name}/${movieCard.video}`;
        this.video = createBaliseWithClass(
            "video",
            "",
            "disablePictureInPicture"
        );
        this.source = createBaliseWithClass("source", videoCard, "src");
        this.source.setAttribute("type", "video/mp4");
        this.video.setAttribute("aria-label", "video");
        content.appendChild(this.video);
        this.video.appendChild(this.source);
    }
}
/**
 * 
 * @param {Object} card 
 * @param {object} info 
 * @param {HTMLElement} content 
 * @returns {HTMLElement}
 */
export default function mediaCard(card, info, content) {
    if (card.image) {
        return new displayPicure(card, info, content);
    } else if (card.video) {
        return new displayVideo(card, info, content);
    }
}
