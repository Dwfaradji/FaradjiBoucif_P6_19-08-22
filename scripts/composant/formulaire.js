let infoContact = {
    prenon: null,
    nom: null,
    email: null,
    message: null,
};
/**
 *Formulaire de contact qui reception les données dans console.log
 * @param {Object} info - recupere le nom du Photographe
 */
export default function displayDomForm(info) {
    const nameContact = document.getElementById("contact-name");
    nameContact.innerHTML = info.name;
    const formContact = document.getElementById("form-contact");
    formContact.addEventListener("input", (e) => {
        if (e.target.id == "prenon") {
            infoContact.prenon = e.target.value;
        } else if (e.target.id == "nom") {
            infoContact.nom = e.target.value;
        } else if (e.target.id == "email") {
            infoContact.email = e.target.value;
        } else if (e.target.id == "message") {
            infoContact.message = e.target.value;
        }
    });
    function sendMsg() {
        const btnContact = document.getElementById("btn-envoyer");
        btnContact.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(infoContact);
        });
    }
    sendMsg();
}
