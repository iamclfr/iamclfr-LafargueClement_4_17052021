window.addEventListener("load", () => {
	// Récupération de l'ID du produit
	let params = new URL(document.location).searchParams;
	let getProductId = params.get("id");

	// Récupération du produit via l'API + ID
	(async function() {
		try {
			let response = await fetch(apiUrl + getProductId);
			if (response.ok) {
				let product = await response.json();

				document.querySelector('title').innerText = product.name + ' - Orinoco'
				document.querySelector(".card").id = product._id;
				document.querySelector(".card-img-top").src = product.imageUrl;
				document.querySelector(".card-img-top").alt = product.name;
				document.querySelector(".card-title").innerText = product.name;
				document.querySelector(".card-text").innerText = product.description;

				const singleProductLenses = product.lenses;
				const lenses = document.querySelector("#lensesSelector");

				for (let i = 0; i < singleProductLenses.length; i++) {
					lenses.insertAdjacentHTML("beforeend", `<option value="${singleProductLenses[i]}">${singleProductLenses[i]}</option>`);
				}

				document.querySelector(".card-price").innerText = "Prix : " + formatCurrency(product.price);

				document.querySelector("#btn-add-cart").addEventListener("click", function() {
					(document.querySelector(".toast").style = "opacity"), "1";
				})

				const addToCart = document.querySelector("#btn-add-cart");

				addToCart.addEventListener("click", function() {
					let cartContent = JSON.parse(localStorage.getItem("cart") || "{}");

					let productQuantity = Number(
						document.querySelector("#quantitySelector").value
					);

					if (cartContent[product._id]) {
						cartContent[product._id] += productQuantity;
					} else {
						cartContent[product._id] = productQuantity;
					}

					let cartContentSerialized = JSON.stringify(cartContent);

					localStorage.setItem("cart", cartContentSerialized);
					window.location.reload();
				})
			}
		} catch (error) {
			console.log("Erreur : " + error);
		}
	})()
})