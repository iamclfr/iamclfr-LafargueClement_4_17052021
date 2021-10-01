window.addEventListener('load', () => {

	;
	(async function() {
		try {
			let response = await fetch(apiUrl)
			if (response.ok) {
				let cameras = await response.json()

				const productsCartZone = document.querySelector('#products-cart-zone')
				const btnConfirmPurchaseCard = document.querySelector('.btn-confirm-purchase-card')
				const btnConfirmPurchasePaypal = document.querySelector('.btn-confirm-purchase-paypal')
				const btnConfirmPurchaseCheck = document.querySelector('.btn-confirm-purchase-check')

				const cartTemplate = document.querySelector('#cart-template')
				let cart = JSON.parse(localStorage.getItem("cart") || "{}");
				let totalPrice = 0
				if ("cart" in localStorage) {
					for (let camera of cameras) {
						if (cart[camera._id]) {
							let quantity = cart[camera._id]
							let element = document.importNode(cartTemplate.content, true);

							element.id = camera._id
							element.querySelector('.card-body').id = camera._id
							element.querySelector('.img-cart').src = camera.imageUrl
							element.querySelector('.cart-product-name').textContent = camera.name
							element.querySelector('.input-number').value = quantity
							element.querySelector('.cart-product-price').textContent = formatCurrency(camera.price)
							element.querySelector('.product-cart-trash').id = camera._id

							productsCartZone.appendChild(element)

							totalPrice += camera.price * quantity
						}
					}

					const totalPriceLocation = document.querySelector('#total-price')
					totalPriceLocation.textContent = 'Total : ' + formatCurrency(totalPrice)
					localStorage.setItem('totalPrice', JSON.stringify(formatCurrency(totalPrice)))

					document.querySelectorAll('.product-cart-trash i').forEach(item => {
						item.addEventListener('click', event => {
							let parentDiv = item.parentNode;
							let id = parentDiv.getAttribute("id");

							let cartContent = JSON.parse(localStorage.getItem("cart") || "{}");
							console.log(cartContent)
							console.log(id)

							if (cartContent[id]) {
								localStorage.removeItem('cart', id)
							}
						})
					})



				} else {
					productsCartZone.innerHTML = `<div class="alert alert-light" role="alert" style="margin:1em;"><strong>Alerte générale !!</strong><br> Votre panier est vide, retournez vite sur la boutique !</div>`
					btnConfirmPurchaseCard.disabled = true
					btnConfirmPurchasePaypal.disabled = true
					btnConfirmPurchaseCheck.disabled = true
					document.querySelector('#cart-paiement').classList = 'd-none'
				}

			} else {
				console.error(response.status)
			}
		} catch (error) {
			console.log("Erreur : " + error)
			const productsCartZone = document.querySelector('#products-cart-zone')
			productsCartZone.innerHTML = `<div class="alert alert-warning" role="alert" style="margin:1em;"><strong>Aiie !</strong> Impossible d'afficher les produits de votre panier, merci de réessayer ultérieurement</div>`
		}
	})()

	const btnFormCreator = document.querySelector('#btnCreateProfile')
	const formInformationError = document.querySelector('#formErrorAlert')
	const formInformationSuccess = document.querySelector('#formSuccess')

	if ("profile" in localStorage) {
		userProfile()
	} else {
		btnFormCreator.innerText = 'Créer mon compte'
		document.querySelector('#lastname').disabled = false
		document.querySelector('#firstname').disabled = false
		document.querySelector('#email').disabled = false
	}

	btnFormCreator.addEventListener('click', function(storeProfile) {
		storeProfile.preventDefault()

		if (formProfileValidator() === false) {
			formInformationError.classList.remove('d-none')
			formInformationSuccess.classList.add('d-none')
		} else {
			let profileContentSerialized = JSON.stringify(formProfileValidator())
			localStorage.setItem("profile", profileContentSerialized)
			formInformationSuccess.classList.remove('d-none')
			formInformationError.classList.add('d-none')
			document.querySelector('#lastname').disabled = true
			document.querySelector('#firstname').disabled = true
			document.querySelector('#email').disabled = true
			btnFormCreator.innerText = 'Modifier mes informations'
		}
	})
});