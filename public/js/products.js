window.addEventListener('load', () => {

  // Variables
  var dateNow = Date.now();
  var soldeEnd = 1627344001000;

  // Récupération des produits via l'API
  ;(async function() {
    try {
      let response = await fetch(apiUrl)
      if (response.ok) {
        let cameras = await response.json()

        const productsZone = document.querySelector('#products-zone')

        const productsTemplate = document.querySelector('#products-template')

        const productsTemplateSolde = document.querySelector('#products-solde-template')

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
        const productsZone = document.querySelector('#products')
            productsZone.insertAdjacentHTML('beforeend',`<div class="alert alert-warning" role="alert" style="margin:1em;"><strong>Aiie !</strong> Impossible d'afficher les produits de la boutique, merci de réessayer ultérieurement</div>`)
    }
  })()

});

window.addEventListener('scroll', function() {
  let scrolled = window.pageYOffset
  const subHeaderHero = document.querySelector('.subHeaderHero')
  const subHeaderHeroImg = document.querySelector('.subHeaderHero_img')
  subHeaderHero.style.marginBottom = - (scrolled * 0.4) + 'px';
  subHeaderHeroImg.style.marginTop = (scrolled * 0.3) + 'px';
  // console.log(scrolled)
})