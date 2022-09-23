let countTotalLike = 0;
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
        div.className = "buble-info";
        div.innerHTML = `
	        <span class="total-likes">${countTotalLike}</span>
            <span><i class="fas fa-heart"></i></span>
            <span>${info.price}€ /jour</span> `;
        getBoxInfo.appendChild(div);
    }
}
