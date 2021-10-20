//Déclaration de variables pour pointer sur l'url avec l'id séléctionné
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + id;
let Objproduit= {};

//Utilisation de Fetch pour récupérer les infos du produits avec id correspondant
let Produit_ID = function () {

  fetch(objectURL)
    .then((response) => response.json())
    .catch((error) => alert("Une erreur est survenue avec L'API"))
    .then((data) => {
      Objproduit=data;
      console.log("data dans fonction produit" + data);
      // get image
      let img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      console.log(" img   "+ `${data.imageUrl}`)
      // get name and title
      let name = document.getElementById("title");
      name.innerHTML = data.name;
      console.log("data nane " + data.name)
      let title = document.querySelector("title");
      title.innerHTML = data.name;
      let AddNom = data.name;
      console.log(" data name " + AddNom)
      // get prix
      let price = document.getElementById("price");
      price.innerHTML = `${data.price}`;
      console.log("prix :" + price.value + `${data.price}` )
      // get description complète
      let description = document.getElementById("description");
      description.innerHTML = data.description;
      // Récupère la liste des couleurs disponible
      let color = document.getElementById("colors");
      for (i = 0; i < data.colors.length; i++) {
        color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
      }
    });
};
Produit_ID();

// Ecoute des evenements sur bouton pour ajouter les produits au panier
  document.getElementById('addToCart').onclick = (event) => {
  event.preventDefault()
//Création du panier
  Panier = JSON.parse(localStorage.getItem("panier"));
  //console.log("click " + id + " " + price.value + "  " +colors.value + " " + img.value + " " + title.value + " " + price.value )
  console.log(id)
  console.log(colors.value)
  console.log(quantity.value)
  console.log(price.value +  "  " + price)
  if(quantity.value > 0 && colors.value !==""){
    AjoutDsPanier();
  } else {
    alert('Attention quantité ou couleur non saisie !');
 }
  }
  
  //AjoutDsPanier(id,colors.value,quantity.value,`${data.imageUrl}`,`${data.name}`,`${data.price}`);
  //}

//Ajoute un article au panier
function AjoutDsPanier() {
  console.log(Objproduit)
  console.log(" on ajoute " + document.getElementById("colors").value)
    // Création d'un Item type contenant les informations du produit
                const product = {
                  id: Objproduit._id,
                  couleur: document.getElementById("colors").value,
                  quantite: document.getElementById("quantity").value,
                  image: Objproduit.imageUrl,
                  nom: Objproduit.name,
                  prix: Objproduit.price,
                };
console.log(product)
    // Verification de l'existence du panier
    //Si il existe on vérifie d'abord l'existence du même produit de même couleur

    //Find examine chaque élément du tableau, avec l'alias “el” que nous lui avons attribué, 
    //et s'arrête lorsqu'elle trouve le premier élément qui est vrai.
      if (Panier) {
      const Recherche = Panier.find((el) => el.id === product.id && el.couleur === product.couleur);
      console.log("   recherche " + Recherche)
      //Si le produit existe => mise à jour de la quantité et total
      if (Recherche) {
        let newQty = parseInt(product.quantite) + parseInt(Recherche.quantite);
        Recherche.quantite = newQty;
       // let newTot = parseInt(newQty) * parseInt(Recherche.prix);
        localStorage.setItem("panier", JSON.stringify(Panier));
        alert("Votre article vient d'être ajouté au panier");}
      //Sinon on ajoute le produit
       else {
        //total = parseInt(qty) * price;
        Panier.push(product);
        localStorage.setItem("panier", JSON.stringify(Panier));
        alert("Votre article vient d'être ajouté au panier");}
      //Si le panier n'existe pas on le créer puis on ajoute le nouveau produit
        } else {
      Panier = [];
      //total = parseInt(qty) * price;
      Panier.push(product);
      localStorage.setItem("panier", JSON.stringify(Panier));
      alert("Votre article vient d'être ajouté au panier");
    }
};
