export default class Likes {
    /**
     * @param {HTMLElement} elementCard - element HTML qui cible les icones likes clicker
     */
    constructor(elementCard, arrayMedia) {
        this.targetIdCard = elementCard.id;
        this.getIconLike = elementCard;
        this.getCountLikes = elementCard.parentNode.outerText;

        this.iconLike = "<i class='fas fa-heart'></i>";
        this.iconDislike = "<i class='far fa-heart'></i>";
        this.countTotalLikes = 0;

        this.numberLikes = elementCard.parentNode.children[0];
        this.displayCountTotalLikes(arrayMedia);
        this.addLikeCard(arrayMedia);
        this.updateTotalLike();
        this.numberLikes.innerHTML = this.updateLikes;
    }

    displayCountTotalLikes(arrayMedia) {
        arrayMedia.forEach((element) => {
            const likes = element.likes;
            this.countTotalLikes += likes;
        });
    }

    updateTotalLike() {
        const getBoxInfo = document.querySelector(".total-likes");
        getBoxInfo.innerHTML = this.countTotalLikes.toString();
        getBoxInfo.innerHTML = this.countTotalLikes.toString();
    }

    addLikeCard(getLikes) {
        getLikes.forEach((getLike) => {
            if (getLike.id == this.targetIdCard) {
                if (getLike.data == false) {
                    getLike.likes++;
                    this.updateLikes = getLike.likes;
                    getLike.data = true;
                    this.getIconLike.innerHTML = this.iconLike;
                    this.countTotalLikes++;
                } else if (getLike.data == true) {
                    getLike.likes--;
                    this.updateLikes = getLike.likes;
                    getLike.data = false;
                    this.getIconLike.innerHTML = this.iconDislike;
                    this.countTotalLikes--;
                }
            }
        });
    }
}
