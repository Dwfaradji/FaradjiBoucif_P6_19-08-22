import data from "../utils/dataPhotographe.js";
const dataPhotographe = await data();

export default function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
    <a href="photographer.html?id=${data.id}">
    <img src="${picture}" alt=""/>
    <h2>${name}</h2>   
        <span class="locality">${city}, ${country} </span>
    <p>${tagline}</p>
    <span class="color-text-secondaire">${price}/jour</span>
    </a>
    `;
    return article;
  }
  return { name, picture, id, getUserCardDOM };
}
photographerFactory(dataPhotographe);

//code de base

// function getUserCardDOM() {
//   const article = document.createElement("article");
//   const img = document.createElement("img");
//   img.setAttribute("src", picture);
//   const h2 = document.createElement("h2");
//   h2.textContent = name;
//   const text = (article.innerHTML = `<p>${city}, ${country} </p>`);
//   console.log(article);
//   // console.log((text.textContent = city + country ));
//   article.appendChild(img);
//   article.appendChild(h2);
//   // article.appendChild(text);
//   return article;
// }
