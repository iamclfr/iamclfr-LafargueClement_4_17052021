document.addEventListener('DOMContentLoaded', function() {

  // Récupération de l'ID du produit
  let params = (new URL(document.location)).searchParams
  let getProductId = params.get('id')

  console.log('PRODUCT ID : ' + getProductId) // DEV ONLY
  console.log(
      '%csingle.js loaded',
      'color: green',
  );

  // Récupération du produit via l'API + ID
  ;(async function() {
      try {
          let response = await fetch(apiUrl + getProductId)
          if (response.ok) {
            let product = await response.json()
            console.log(product)
            
            document.querySelector('.card-title').innerText = product.name
            document.querySelector('.card-text').innerText = product.description

            const singleProductLenses = product.lenses
            const lenses = document.querySelector('#lensesSelector')

            for (let i = 0; i < singleProductLenses.length; i++) {
              lenses.insertAdjacentHTML('beforeend',`<option value="${i}">${singleProductLenses[i]}</option>`)
            }

            document.querySelector('.card-price').innerText = 'Prix : ' + product.price / 100 + ',00 €'

            document.querySelector('#btn-add-cart').addEventListener('click', function() {
              document.querySelector('.toast').style = 'opacity', '1'
            })

            var myToastEl = document.querySelector('.toast')
            myToastEl.addEventListener('hidden.bs.toast', function () {
              console.log('toast');
            })
          }
      } catch (error) {
          console.log("Erreur : " + error);
      }
  })()
});








// document.addEventListener('DOMContentLoaded',function(){

//   // Récupération de l'ID du produit
// let params = (new URL(document.location)).searchParams
// let getProductId = params.get('id')

// console.log('PRODUCT ID : ' + getProductId) // DEV ONLY
// console.log(
//   '%csingle.js loaded',
//   'color: green',
// );

// // Récupération des produits via l'API
// ;(async function() {
//     try {
//       let response = await fetch(apiUrl + getProductId)
//       if (response.ok) {
//         let product = await response.json()
//         console.log(product)

//             const singleZone = document.getElementById('single-zone')

//             const singleCard = document.createElement('div')
//             singleZone.appendChild(singleCard)
//             singleCard.id = product._id
//             singleCard.className = 'card'
//             singleCard.style.width = '40em'
//             // singleCard.style.border = '2px solid red' // DEV ONLY

//             const singleImg = document.createElement('img')
//             singleCard.appendChild(singleImg)
//             singleImg.className = 'card-img-top'
//             singleImg.src = product.imageUrl
//             singleImg.alt = product.name

//             const singleHeader = document.createElement('div')
//             singleImg.after(singleHeader)
//             singleHeader.className = 'card-header'

//             const singleTitle = document.createElement('h3')
//             singleHeader.appendChild(singleTitle)
//             singleTitle.className = 'card-title'
//             singleTitle.innerText = product.name

//             const singleDesc = document.createElement('p')
//             singleTitle.after(singleDesc)
//             singleDesc.className = 'card-text'
//             singleDesc.innerText = product.description

//             const singleBody = document.createElement('div')
//             singleHeader.after(singleBody)
//             singleBody.className = 'card-body'

//             const singleChoiceTitle = document.createElement('h5')
//             singleBody.appendChild(singleChoiceTitle)
//             singleChoiceTitle.innerText = 'Chois de la lentille'
            
//             const singleLenses = product.lenses

//             for (let i = 0; i < singleLenses.length; i++) {
//                 const singleChoiseContainer = document.createElement("div")
//                 singleChoiceTitle.after(singleChoiseContainer)
//                 singleChoiseContainer.className = 'form-check form-check-inline'

//                 const singleChoiceRadio = document.createElement('input')
//                 singleChoiseContainer.appendChild(singleChoiceRadio)
//                 singleChoiceRadio.className = 'form-check-input'
//                 singleChoiceRadio.type = 'radio'
//                 singleChoiceRadio.name = 'singleChoiseRadio'
//                 singleChoiceRadio.id = singleLenses[i]
//                 singleChoiceRadio.value = singleLenses[i]

//                 const singleChoiseLabel = document.createElement('label')
//                 singleChoiceRadio.after(singleChoiseLabel)
//                 singleChoiseLabel.className = 'form-check-label'
//                 singleChoiseLabel.htmlFor = singleLenses[i]
//                 singleChoiseLabel.innerText = singleLenses[i]
//             }

//             const singleSeparator = document.createElement('hr')
//             singleBody.appendChild(singleSeparator)

//             const singlePriceContainer = document.createElement('div')
//             singleSeparator.after(singlePriceContainer)
//             singlePriceContainer.className = "d-flex justify-content-between align-items-center"

//             const singlePrice = document.createElement('h5')
//             singlePriceContainer.appendChild(singlePrice)
//             singlePrice.innerText = 'Prix : ' + product.price / 100 + ',00 €'

//             const singleQuantityLabel = document.createElement('label')
//             singlePrice.after(singleQuantityLabel)
//             singleQuantityLabel.className = 'd-inline-flex align-items-center pe-1'
//             singleQuantityLabel.htmlFor = 'quantite'
//             singleQuantityLabel.innerText = 'Quantité'

//             const singleQuantitySelect = document.createElement('select')
//             singleQuantityLabel.appendChild(singleQuantitySelect)
//             singleQuantitySelect.className = 'form-select ms-3'
//             singleQuantitySelect.name = 'quantite'
//             singleQuantitySelect.htmlFor = 'quantite'

//             var q = 0
//             while (q < 5) {
//               q++
//               const singleQuantitySelectOption = document.createElement('option')
//               singleQuantitySelect.appendChild(singleQuantitySelectOption)
//               singleQuantitySelectOption.value = q
//               singleQuantitySelectOption.innerText = q

//             }

//             const singleFooter = document.createElement('div')
//             singleBody.after(singleFooter)
//             singleFooter.className = 'card-footer d-grid gap-2'

//             const singleFooterButton = document.createElement('button')
//             singleFooter.appendChild(singleFooterButton)
//             singleFooterButton.className = 'btn btn-dark btn-outline-dark-hover'
//             singleFooterButton.id = 'btn-add-cart'
//             singleFooterButton.type = 'button'
//             singleFooterButton.innerText = 'Ajouter au panier'

//       }
//     } catch (error) {
//       console.log("Erreur : " + error);
//     }
//   })()
    
// });
