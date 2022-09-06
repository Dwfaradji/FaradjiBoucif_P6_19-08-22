function mediaPhotographe(info, image, title, likes, id) {
  const picturePhotographe = `./assets/Sample Photos/${info.name}/${image}`;
  const cardMedia = document.createElement("article");
  cardMedia.className = "card-media";
  cardMedia.innerHTML = `
  <figure>
	<img src="${picturePhotographe}" alt="${title}">
	<figcaption>${title}<span id="${id}" class="icon-like"><strong>${likes}</strong><i class="far fa-heart"></i></span></figcaption>
  </figure>
  `;
  return cardMedia;
}

function videoPhotographe(info, title, likes, video, id) {
  const videoPlay = `./assets/Sample Photos/${info.name}/${video}`;
  const cardMedia = document.createElement("article");
  cardMedia.className = "card-media";
  cardMedia.innerHTML = `
  <figure>
  <video width="300" height="300" controls>
	<source name="${title}" src="${videoPlay}" type="video/mp4">
	</video>
	<figcaption>${title}<strong>${likes}</strong><span id="${id}" class="icon-like"><i class="far fa-heart"></i></span></figcaption>
  </figure>
  `;
  return cardMedia;
}
export { mediaPhotographe, videoPhotographe };
