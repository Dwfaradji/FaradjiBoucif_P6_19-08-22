import photographerFactory from "../factories/photographer.js";
import data from "../utils/dataPhotographe.js";

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const dataPhotographe = await data();
  const photographers = dataPhotographe.photographers;
  // et bien retourner le tableau photographers seulement une fois
  return {
    photographers: [...photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM(photographerModel);
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
