
export default function getPhotographerId(arrays, newArray) {
    // Récupere les datas du photographe et les medias


    //- Récupération de la chaine de requète dans l'url
    const urlId = window.location.search;
    //-Extraction de l'Id
    const urlSearchParams = new URLSearchParams(urlId);
    //- Récupere id photographe
    const getUrlId = urlSearchParams.get("id");

    arrays.forEach((array) => {
        array.data = false;
        if (array.photographerId == getUrlId || array.id == getUrlId) {
            newArray.push(array);
        }
    });
}
