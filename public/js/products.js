document.addEventListener('DOMContentLoaded',function(){

  console.log('products.js loaded')
  
});

// Récupération des produits via l'API
const getCameras = async function() {
  try {
    let response = await fetch(apiUrl + '/api/cameras')
    if (response.ok) {
      let cameras = await response.json()
      console.log(cameras) // DEV ONLY

      for (let camera of cameras) {
        const productsZone = document.getElementById('products-zone')

        const productContainer = document.createElement('div')
        productsZone.appendChild(productContainer)
        productContainer.id = camera._id
        productContainer.className = 'col'
        // productContainer.style.border = '2px solid red' // DEV ONLY
        
        const productLink = document.createElement('a')
        productContainer.appendChild(productLink)
        productLink.className = 'text-decoration-none text-dark'
        productLink.href = "/product.html?id=" + camera._id

        const productCard = document.createElement('div')
        productLink.appendChild(productCard)
        productCard.className = 'card h-100'
        // productCard.style.border = '2px solid green' // DEV ONLY

        const productImg = document.createElement('img')
        productCard.appendChild(productImg)
        productImg.className = 'card-img-top img-card'
        productImg.src = camera.imageUrl

        const productBody = document.createElement('div')
        productImg.after(productBody)
        productBody.className = 'card-body'
        // productBody.style.border = '2px solid yellow' // DEV ONLY

        const productTitle = document.createElement('h5')
        productBody.appendChild(productTitle)
        productTitle.className = 'card-title'
        productTitle.innerText = camera.name
        // productTitle.style.border = '2px solid blue' // DEV ONLY

        const productDesc = document.createElement('p')
        productTitle.after(productDesc)
        productDesc.className = 'card-text'
        productDesc.innerText = camera.description
        // productDesc.style.border = '2px solid pink' // DEV ONLY

        const productDivButton = document.createElement('div')
        productCard.appendChild(productDivButton)
        productDivButton.className = 'card-footer d-flex justify-content-between'
        // productDivButton.style.border = '2px solid purple' // DEV ONLY

        const productButton = document.createElement('button')
        productDivButton.appendChild(productButton)
        productButton.className = 'btn btn-outline-dark w-100 me-3'
        // productButton.style.border = '2px solid brown' // DEV ONLY
        productButton.innerText = 'En savoir plus'

        const productHeart = document.createElement('a')
        productDivButton.appendChild(productHeart)
        productHeart.className = "d-flex align-items-center text-dark heart-like"
        productHeart.title = "Ajouter à ma Wishlist"
        productHeart.innerHTML = '<i class="bi bi-heart-fill"></i>'

      }
    } else {
      console.error(response.status)
    }
  } catch (error) {
    console.log("Erreur : " + error)
  }
}

// Appel de la fonction
getCameras();