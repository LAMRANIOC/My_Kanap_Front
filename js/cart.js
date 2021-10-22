const commander = document.getElementById("order");
(async function () {
  if(localStorage.getItem("panier") != null) {
    Panier = JSON.parse(localStorage.getItem("panier"));
    panierCommande();
    validFormulaire();
  }
})();

function panierCommande() {
  let price = totalCmd();
  const Container = document.getElementById("cart__items");
  if (Panier === null) {
    Container.innerHTML = `
      <article class="cart__item" data-id="{product-ID}">    
          <div class="cart__item__content">
              <div class="cart__item__content__titlePrice">
                  <h1>Votre panier est vide !</h1>
              </div>
          </div>
      </article> 
  `;
  } else {
    Container.innerHTML = "";
    for (produit of Panier) {
      Container.innerHTML += `
          <article class="cart__item" data-id="${produit.id}">
                <div class="cart__item__img">
                  <img src="${produit.image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content" id="${produit.id}">
                  <div class="cart__item__content__titlePrice">
                    <h2>${produit.nom}</h2>
                    <p>Couleur : ${produit.couleur}</p>
                    <p>${produit.prix}€</p>
                    <p id="prixtot">Prix total : ${
                      produit.prix * produit.quantite
                    } €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" oninput="updateQuantity('${produit.id}','${produit.couleur}')"
                       onkeyup="updateQuantity('${produit.id}','${produit.couleur}')"
       id="quantite" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${produit.quantite}>
                    </div>
                    <div onclick="supprElm('${produit.id}','${
        produit.couleur
      }')" class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>         
          `;
    }
  }
  totalCmd();
}
function updateQuantity(id, couleur) {
  let quant = document.getElementById(id).querySelector("#quantite").value;
  if (quant > 100) {
    document.getElementById(id).querySelector("#quantite").value = 100;
  }
  const Recherche = Panier.findIndex(
    (el) => el.id === id && el.couleur === couleur
  );
  console.log("   recherche " + Recherche);
  Panier[Recherche].quantite = document
    .getElementById(id)
    .querySelector("#quantite").value;
  el = document.getElementById(id).querySelector("#prixtot");
  el.innerHTML = `Prix total : ${
    Panier[Recherche].prix * Panier[Recherche].quantite
  } €`;
  localStorage.setItem("panier", JSON.stringify(Panier));
  totalCmd();
}

function supprElm(id, couleur) {
  console.log(id);
  console.log(couleur);
  const Recherche = Panier.findIndex(
    (el) => el.id === id && el.couleur === couleur
  );
  console.log("   recherche " + Recherche);
  Panier.splice(Recherche, 1);
  localStorage.setItem("panier", JSON.stringify(Panier));
  panierCommande();
}

//Calcul du prix total panier
function totalCmd() {
  //creation d'un tableau qui contiendra chaque prix du panier
  let prix = 0;
  //On boucle sur tout les prix trouver dans le panier

  for (i = 0; i < Panier.length; i++) {
    prix += parseInt(Panier[i].prix) * parseInt(Panier[i].quantite);
  }
  console.log("prix tot:  " + prix);
  document.getElementById("totalPrice").innerHTML = prix;
}

function validFormulaire() {
//-------------------------------------  VAlIDATION DU FORMULAIRE AVANT ENVOIE  -----------------------------------------
// Vérification du prenom
const prenom = document.getElementById("firstName");
prenom.addEventListener("keyup", function (event) {
  if (validprenom=checkInput(prenom.value, "text")) {
    document.getElementById("firstNameErrorMsg").innerText="";
  } else {
    document.getElementById("firstNameErrorMsg").innerText =
      "Saisie incorrecte :Ne pas mettre de nombres,symboles et avoir 3 caractères minimum";
      event.preventDefault();
  }
});

// Vérification du nom
const nom = document.getElementById("lastName");
nom.addEventListener("keyup", function (event) {
  if (validnom=checkInput(nom.value, "text")) {
    document.getElementById("lastNameErrorMsg").innerText = ""
    event.preventDefault();;

    } else {
      document.getElementById("lastNameErrorMsg").innerText =
      "Saisie incorrecte :Ne pas mettre de nombres,symboles et avoir 3 caractères minimum";
        event.preventDefault();
  }
});
// Vérification de la validité de l'adresse
const adresse = document.getElementById("address");
adresse.addEventListener("keyup", function (event) {
  if (validadresse=checkInput(adresse.value, "city")) {
    document.getElementById("addressErrorMsg").innerText = "";
  } else {
    document.getElementById("addressErrorMsg").innerText =
    "Saisie incorrecte de l'addresse";
      event.preventDefault();
}
});// Vérification de la validité de la ville
const ville = document.getElementById("city");
ville.addEventListener("keyup", function (event) {
  if (validville=checkInput(ville.value, "text")) {
    document.getElementById("cityErrorMsg").innerText = "";
  } else {
    document.getElementById("cityErrorMsg").innerText =
    "Saisie incorrecte :Ne pas mettre de nombres,symboles et avoir 3 caractères minimum";
      event.preventDefault();
}
});
// Vérification de la validité du mail
const mail = document.getElementById("email");
mail.addEventListener("keyup", function (event) {
  if (validmail=checkInput(mail.value, "email")) {
    document.getElementById("emailErrorMsg").innerText = "";
  } else {
    document.getElementById("emailErrorMsg").innerText =
    "Saisie incorrecte du mail!";
      event.preventDefault();
}
/*
if(validprenom  && validprenom !="" &&
 validnom  && validnom != null &&
 validadresse && validadresse !="" &&
 validville && validville !="" &&
 validmail && validmail !="")
    {
     // commander.disabled=false 
  }else{
   // commander.disabled=true
  }*/
});
}

//On creer la fonction de verification du formulaire avec en parametre la valeur et le type
function checkInput(val, type) {
  let Regex;
  switch (type) {
    case "text":
      Regex = /^[A-Z-a-z\s]{3,40}$/;
      break;
    case "city":
      Regex = /^[0-9\s]{1,3}[-a-zA-Zàâäéèêëïîôöùûüç]/;
      break;
    case "email":
      Regex = /^[a-zA-Z0-9.]{4,}@[a-zA-Z0-9-]{3,}\.[a-zA-Z0-9-]{2,}$/;
      break;
    default:
      Regex = /^[a-zA-Z0-9_ ]{2,}$/;
      break;
  }
  return val.match(Regex);
}
  // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur,
  commander.addEventListener("click", (e) => {
    if(validprenom  && validprenom !="" &&
      validnom  && validnom != null &&
      validadresse && validadresse !="" &&
      validville && validville !="" &&
      validmail && validmail !=""){
    
    e.preventDefault();
      // Si il n'y a pas de values dans le localStorage on affiche une erreur
      if (Panier !== null) {
        var product = [];
        for (i = 0; i < Panier.length; i++) {
          product[i] = Panier[i].id;
        }
        const user = {
          firstName: document.querySelector("#firstName").value,
          lastName: document.querySelector("#lastName").value,
          address: document.querySelector("#address").value,
          city: document.querySelector("#city").value,
          email: document.querySelector("#email").value,
        };
        console.log("ordre a passer : " + user);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.assign("./confirmation.html")
      } else {
        alert('Commande impossible le panier est vide !');
  }
}
  });