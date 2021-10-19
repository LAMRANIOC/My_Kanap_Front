(async function () {
  Panier = JSON.parse(localStorage.getItem("panier"));
  panierCommande();
  validFormAndEnvoi();
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
                      <input type="number" oninput="updateQuantity('${
                        produit.id
                      }','${
        produit.couleur
      }')" id="quantite" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${
        produit.quantite
      }>
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
  console.log(id);
  console.log(couleur);
  console.log(document.getElementById(id).querySelector("#quantite").value);
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
  //console.log(document.getElementById(id).querySelector("#quantite").value);
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
  //console.log("lg panier:  " + Panier.length)
  // if (Panier.length !== null) {

  for (i = 0; i < Panier.length; i++) {
    prix += parseInt(Panier[i].prix) * parseInt(Panier[i].quantite);
  }
  console.log("prix tot:  " + prix);
  document.getElementById("totalPrice").innerHTML = prix;
}
// }

//CONTACT FORMULAIRE
// Vérification des input et récupération N° commande du back-end

//définition des règles de validation
const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
const regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
const regexLetter = /^[a-zA-Z-]+$/;

document.querySelector("#firstName").addEventListener('change', function(e) {
  if (!document.querySelector("#firstName").value.match(regexLetter)) {
    document.getElementById("firstNameErrorMsg").innerText =
      "Saisie incorrecte";
    e.preventDefault();
  }
})

document.querySelector("#lastName").addEventListener('change', function(e) {
  if (!document.querySelector("#lastName").value.match(regexLetter)) {
    document.getElementById("lastNameErrorMsg").innerText =
      "Saisie incorrecte";
    e.preventDefault();
  }
})

document.querySelector("#city").addEventListener('change', function(e) {
  if (!document.querySelector("#city").value.match(regexLetter)) {
    document.getElementById("cityErrorMsg").innerText =
      "Saisie incorrecte";
    e.preventDefault();
  }
})

document.querySelector("#address").addEventListener('change', function(e) {
  if (!document.querySelector("#address").value.match(regexLetter)) {
    document.getElementById("addressErrorMsg").innerText =
      "Saisie incorrecte";
    e.preventDefault();
  }
})

document.querySelector("#email").addEventListener('change', function(e) {
  if (!document.querySelector("#email").value.match(regexLetter)) {
    document.getElementById("emailErrorMsg").innerText =
      "Saisie incorrecte";
    e.preventDefault();
  }
})


function validFormAndEnvoi() {
  const commander = document.getElementById("order");
  
  // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur,
  // On vérifie que le numéro est un nombre, sinon on empeche l'envoi du formulaire.
  console.log("nad 1");
  commander.addEventListener("click", (e) => {
    console.log("debut on click");
    // On vient comparer la valeur de l'input avec le regex Letter
  /*if (!document.querySelector("#firstName").value.match(regexLetter)) {
    document.getElementById("firstNameErrorMsg").innerText =
        "Saisie incorrecte";
      e.preventDefault();
    } else if (!document.querySelector("#lastName").value.match(regexLetter)) {
      document.getElementById("lastNameErrorMsg").innerText =
        "Saisie incorrecte";
      e.preventDefault();
    } else if (!document.querySelector("#city").value.match(regexLetter)) {
      document.getElementById("cityErrorMsg").innerText = "Saisie incorrecte";
      e.preventDefault();
    } else if (!document.querySelector("#address").value.match(regexAddress)) {
      document.getElementById("addressErrorMsg").innerText =
        "Saisie incorrecte";
      e.preventDefault();
    } else if (!document.querySelector("#email").value.match(regexEmail)) {
      document.getElementById("emailErrorMsg").innerText = "Saisie incorrecte";
      console.log("nad 3");
      e.preventDefault();
    } else {
      console.log("nad else" + Panier);*/
      // Si il n'y a pas de values dans le localStorage on affiche une erreur
      if (Panier !== null) {
        var product = [];
        for (i = 0; i < Panier.length; i++) {
          product[i] = Panier[i].id;
          console.log(product[i]);
        }
        console.log("nad apres" + product);
        const user = {
          firstName: document.querySelector("#firstName").value,
          lastName: document.querySelector("#lastName").value,
          address: document.querySelector("#address").value,
          city: document.querySelector("#city").value,
          email: document.querySelector("#email").value,
        };
        console.log("ordre a passer : " + user);
        localStorage.setItem("user", user);
        //document.location = "./confirmation.html";
        window.location.assign("./confirmation.html")
      }
   // }
  });
}
