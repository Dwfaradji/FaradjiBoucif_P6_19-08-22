let countTotalLike = 0;
/**
 * Construction de la box qui contient le nombre total de 
 * likes et le prix 
 * @param {ElementArray} info - element tableau de arrayInfo
 * @param {ElementArray} arrayMedia -Tableau avec les media de tous les photographes
 */
export default class BoxInfo {
    constructor(info, arrayMedia) {
        this.displayCountTotalLikes(arrayMedia);
        this.createDomBoxInfo(info);
    }
    displayCountTotalLikes(arrayMedia) {
        arrayMedia.forEach((element) => {
            const likes = element.likes;
            countTotalLike += likes;
        });
    }
    createDomBoxInfo(info) {
        const getBoxInfo = document.querySelector("#main");
        const div = document.createElement("div");
        div.setAttribute("aria-label", "information");
        div.setAttribute("tabindex", "0");
        div.className = "buble-info";
        div.innerHTML = `
	        <span class="total-likes">${countTotalLike}</span>
            <span title="likes" ><i class="fas fa-heart" ></i></span>
            <span >${info.price}€ /jour</span> `;
        getBoxInfo.appendChild(div);
    }
}
