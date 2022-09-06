export default function getHeaderDOM(info) {
  const picturePhotographe = `./assets/photographers/${info.portrait}`;
  const header = document.querySelector(".photograph-header");
  header.innerHTML = `
  <div class="photograph-info" >
    <h1>${info.name}</h1>
    <span class="locality">${info.city}, ${info.country}</span><br>
    <p class="color-text-secondaire">  ${info.tagline} </p>
  </div>
  <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
  <img src="${picturePhotographe}" alt=""> 
`;
  return;
}
