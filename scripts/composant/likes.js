export default class Likes {
    /**
     * @param {HTMLElement} elementCard - element HTML qui cible les icones likes clicker
     */
    constructor(elementCard, arrayMedia, count) {
        this.targetIdCard = elementCard.id;
        this.getIconLike = elementCard;
        this.getCountLikes = elementCard.parentNode.outerText;

        this.iconLike = '<i class="fas fa-heart"></i>';
        this.iconDislike = '<i class="far fa-heart"></i>';
        this.countTotalLikes = count;
        this.numberLikes = elementCard.parentNode.children[0];
        this.addLikeCard(arrayMedia);
        this.updateTotalLike();
        this.numberLikes.innerHTML = this.updateLikes;
    }

    updateTotalLike() {
        const getBoxInfo = document.querySelector(".total-likes");
        getBoxInfo.innerHTML = this.countTotalLikes.toString();
        getBoxInfo.innerHTML = this.countTotalLikes.toString();
    }
    /** @TODO modifier la condition pour que incrementation se fasse sur l'object  */
    addLikeCard(getLikes) {
        getLikes.forEach((getLike) => {
            if (getLike.id == this.targetIdCard) {
                if (getLike.data == false) {
                    getLike.likes++;
                    this.updateLikes = getLike.likes;
                    this.countTotalLikes++;
                    getLike.data = true;
                    this.getIconLike.innerHTML = this.iconLike;
                } else if (getLike.data == true) {
                    getLike.data = false;
                    getLike.likes--;
                    this.updateLikes = getLike.likes;
                    this.getIconLike.innerHTML = this.iconDislike;
                    this.countTotalLikes--;
                }
            }
        });
    }
}
