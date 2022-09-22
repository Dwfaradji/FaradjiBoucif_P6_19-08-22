export default class BoxInfo {
    constructor(countTotalLikes,info) {
        this.createDomBoxInfo(countTotalLikes,info);
    }
    createDomBoxInfo(countTotalLikes,info) {
        const getBoxInfo = document.querySelector("#main");
        const div = document.createElement("div");
        div.className = "buble-info";
        div.innerHTML = `
	  <span class="total-likes">${countTotalLikes}</span>
    <span><i class="fas fa-heart"></i></span>
    <span>${info.price}€ /jour</span> `;
        getBoxInfo.appendChild(div);
    }
}