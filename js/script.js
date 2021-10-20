// Récupération des produits à l'aide d'un fetch vers backend
var Produits = function () {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .catch((error) => alert("Une erreur est survenue avec L'API"))
      .then((data) => {
        console.log(data);
  
        let lstProduits = document.getElementById("items");
  
        for (i = 0; i < data.length; i++) {
          const productCard = `
            <a href="./product.html?id=${data[i]._id}">
              <article>
                <img src="${data[i].imageUrl}" alt="${data[i].altTxt}"/>
                <h3 class="productName">${data[i].name}</h3>
                <p class="productDescription"> ${data[i].description} </p>
              </article>
            </a>`;
    //Injection dans le html
          lstProduits.innerHTML += productCard;
        }
      });
  };
  //affichage des produits
  window.onload = () => {
    Produits();
  };
 
