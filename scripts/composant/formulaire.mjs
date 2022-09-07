let infoContact = {
  prenon,
  nom,
  email,
  message,
};

export default function getFormContact(info) {
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
  function envoyerMsg() {
    const btnContact = document.getElementById("btn-envoyer");
    btnContact.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(infoContact);
    });
  }
  envoyerMsg();
}
