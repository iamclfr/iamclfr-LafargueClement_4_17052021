window.addEventListener('load', () => {

	const btnFormCreator = document.querySelector('#btnCreateProfile')
	const formInformationError = document.querySelector('#formErrorAlert')
	const formInformationSuccess = document.querySelector('#formSuccess')
	const btnCreateCredit = document.querySelector('#btnCreateCredit')

	if ("profile" in localStorage) {
		userProfile()
	} else {
		document.querySelector('.card-title').innerText = 'Créez voter profil'
		btnFormCreator.innerText = 'Enregistrer mes informations'
		document.querySelector('#lastname').disabled = false
		document.querySelector('#firstname').disabled = false
		document.querySelector('#email').disabled = false
	}

	if ("creditCard" in localStorage) {
		userCreditCard()
	} else {
		btnCreateCredit.innerText = 'Enregistrer ma carte banquaires'
	}

	btnFormCreator.addEventListener('click', function(storeProfile) {
		storeProfile.preventDefault()

		if (formProfileValidator() === false) {
			console.log("MyVar")
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

	const btnFormCredit = document.querySelector('#btnCreateCredit')

	btnFormCredit.addEventListener('click', function(storeCreditCard) {
		storeCreditCard.preventDefault()

		if (formCreditValidator() === false) {
			formInformationError.classList.remove('d-none')
			formInformationSuccess.classList.add('d-none')
		} else {
			let CreditContentSerialized = JSON.stringify(formCreditValidator())
			localStorage.setItem("creditCard", CreditContentSerialized)
			formInformationSuccess.classList.remove('d-none')
			formInformationError.classList.add('d-none')
		}
	})
});