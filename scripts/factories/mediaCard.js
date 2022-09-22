function createBaliseWithClass(createElement, valueAttribut, attribute) {
    let balise = document.createElement(createElement);
    balise.setAttribute(attribute, valueAttribut);
    return balise;
}

class displayPicure {
    constructor(pictureCard, info, content) {
        let imgCard = `./assets/Sample Photos/${info.name}/${pictureCard.image}`;
        this.picture = createBaliseWithClass("img", imgCard, "src");
        this.picture.setAttribute("alt", "");
        content.appendChild(this.picture);
    }
}
class displayVideo {
    constructor(movieCard, info, content) {
        let videoCard = `./assets/Sample Photos/${info.name}/${movieCard.video}`;
        this.video = createBaliseWithClass(
            "video",
            "",
            "disablePictureInPicture"
        );
        this.source = createBaliseWithClass("source", videoCard, "src");
        this.source.setAttribute("type", "video/mp4");
        this.video.setAttribute("title", movieCard.title);
        content.appendChild(this.video);
        this.video.appendChild(this.source);
    }
}
export default function mediaCard(card, info, content) {
    if (card.image) {
        return new displayPicure(card, info, content);
    } else if (card.video) {
        return new displayVideo(card, info, content);
    }
}
