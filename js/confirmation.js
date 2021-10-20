(async function () {
  Panier = JSON.parse(localStorage.getItem("panier"));
  user= JSON.parse(localStorage.getItem("user"));
 Getcommand();
})();

// récupération N° commande du back-end
function Getcommand() {
    console.log("fonction deb" + Panier + " user "+ user)
      // Si il n'y a pas de values dans le localStorage on affiche une erreur
      if(Panier !== null) {
         var product = [];
         for (i = 0; i < Panier.length; i++) {
            product[i] = Panier[i].id;
            console.log(product[i])
         }
         console.log("nad apres" + product)
         const order = {
            contact: {
               firstName: user.firstName,
               lastName: user.lastName,
               address: user.address,
               city: user.city,
               email: user.email,
            },
            products: product,
         };
      console.log("ordre a passer : " + order)
         // Création de l'entête de la requête
         const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 
               'Content-Type': 'application/json' 
            },
         };
         // Envoie de la requête
         fetch('http://localhost:3000/api/products/order', options)
         .then(res => res.json())
         .catch((error) => alert("Une erreur est survenue avec L'API"))
         .then((data) => {
          console.log(data) 
          document.getElementById('orderId').innerHTML = data.orderId; 
          localStorage.clear();
                    })
         .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
         });
      } else {
         alert('le panier est vide !');
      
   }
}