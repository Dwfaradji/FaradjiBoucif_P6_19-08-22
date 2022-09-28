export default class Likes {
    /**
     * Incrémentation du total des likes et la gestion de l'icône.
     * @param {HTMLElement} elementCard - element HTML qui cible icône like
     * @param {Array} arrayMedia - Tableau media qui va nous
     * permettre de récupérer tous les likes
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
    /**
     *
     * @param {Array} getLikes - Récupère tous les likes
     */
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
