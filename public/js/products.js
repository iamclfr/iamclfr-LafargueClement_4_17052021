document.addEventListener('DOMContentLoaded', function() {

  // Variables
  var dateNow = Date.now();
  var soldeEnd = 1627344001000;

  console.log(
      '%cproducts.js loaded',
      'color: green',
  );
  console.log(
      '%cDate d\'aujourd\'hui : ' + dateNow,
      'color: yellow',
  );
  console.log(
      '%cDate Fin Des Soldes : ' + soldeEnd,
      'color: yellow',
  );

  // Récupération des produits via l'API
  ;(async function() {
    try {
      let response = await fetch(apiUrl)
      if (response.ok) {
        let cameras = await response.json()
        console.log(cameras) // DEV ONLY

        const productsZone = document.getElementById('products-zone')

        const productsTemplate = document.getElementById('products-template')

        const productsTemplateSolde = document.getElementById('products-solde-template')

        for (let camera of cameras) {
          if (dateNow < soldeEnd) {
            let element = document.importNode(productsTemplateSolde.content, true);
            element.id = camera._id
            element.querySelector(".stretched-link").href = "/product.html?id=" + camera._id
            element.querySelector(".img-card").src = camera.imageUrl
            element.querySelector(".card-title").textContent = camera.name
            element.querySelector(".card-desc").textContent = camera.description

            productsZone.appendChild(element)
          } else {
            let element = document.importNode(productsTemplate.content, true);
            element.id = camera._id
            element.querySelector(".stretched-link").href = "/product.html?id=" + camera._id
            element.querySelector(".img-card").src = camera.imageUrl
            element.querySelector(".card-title").textContent = camera.name
            element.querySelector(".card-desc").textContent = camera.description

            productsZone.appendChild(element)
          }
        }
      } else {
          console.error(response.status)
      }
    } catch (error) {
        console.log("Erreur : " + error)
    }
  })()

});