window.addEventListener('load', () => {
    if ("cart" in localStorage) {
        const btnFormCreator = document.querySelector('#btnCreateProfile')
        const formInformationError = document.querySelector('#formErrorAlert')
        const formInformationSuccess = document.querySelector('#formSuccess')
        const btnCreateCredit = document.querySelector('#btnCreateCredit')

        const btnConfirmNextPaiement = document.querySelector('#confirm-next-paiement')
        const btnConfirmNextConfirm = document.querySelector('#confirm-next-confirm')
        const btnConfirmBuy = document.querySelector('#confirm-buy')
        const btnConfirmCancelPaiement = document.querySelector('#confirm-cancel-paiement')
        const btnConfirmCancelConfirm = document.querySelector('#confirm-cancel-confirm')

        if ("profile" in localStorage) {
            userProfile()
        } else {
            btnFormCreator.innerText = 'Enregistrer mes informations'
            document.querySelector('#lastname').disabled = false
            document.querySelector('#firstname').disabled = false
            document.querySelector('#email').disabled = false
            btnConfirmNextPaiement.disabled = true
        }

        if ("creditCard" in localStorage) {
            userCreditCard()
        } else {
            btnCreateCredit.innerText = 'Enregistrer ma carte banquaires'
            btnConfirmNextConfirm.disabled = true
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
                btnConfirmNextPaiement.disabled = false
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
                btnConfirmNextConfirm.disabled = false
            }
        })

        btnConfirmNextPaiement.addEventListener('click', function() {
            if ("profile" in localStorage) {
                document.querySelector('#comfirm-information').classList.add('d-none')
                document.querySelector('#confirm-paiement').classList.remove('d-none')
            }
        })

        btnConfirmNextConfirm.addEventListener('click', function() {
            if ("creditCard" in localStorage) {
                document.querySelector('#confirm-paiement').classList.add('d-none')
                document.querySelector('#confirm-confirm').classList.remove('d-none')
            }
        })

        btnConfirmCancelPaiement.addEventListener('click', function() {
            document.querySelector('#comfirm-information').classList.remove('d-none')
            document.querySelector('#confirm-paiement').classList.add('d-none')
        })

        btnConfirmCancelConfirm.addEventListener('click', function() {
            document.querySelector('#confirm-paiement').classList.remove('d-none')
            document.querySelector('#confirm-confirm').classList.add('d-none')
        })
        const totalPriceLocation = document.querySelector('#total-price')
            totalPriceLocation.textContent = JSON.parse(localStorage.getItem('totalPrice'))

        btnConfirmBuy.addEventListener('click', function() {
            let user = JSON.parse(localStorage.getItem("profile"));
            let contact = {
                'firstName':    user['firstname'],
                'lastName':     user['lastname'],
                'address':      user['adress'],
                'city':         user['city'],
                'email':        user['email']
            }

            let products = JSON.parse(localStorage.getItem("cart"));

            let contactContentSerialized = JSON.stringify(contact)
            
            localStorage.setItem('contact', contactContentSerialized)

            // console.log(JSON.parse(localStorage.getItem('contact')))

            fetch(apiUrl + "order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({contact, products:Object.keys(products)}),
            })
                .then((response) => response.json())
                .then(response => {
                    let orderId = response.orderId
                    console.log(orderId)
                    localStorage.setItem('orderId', JSON.stringify(orderId))
                    localStorage.removeItem('cart')
                    window.location.href = '/order.html?orderId=' + orderId
                })
                .catch((error) => console.log(error));
        })

    } else {
        document.querySelector('main').innerHTML = `<div class="alert alert-danger mx-2" id="formErrorAlert" role="alert" style="position: fixed; top: 6em; right: 0; left:0; z-index: 999;"><strong>Aiie !</strong> Vous ne pouvez pas accéder à cette page pour le moment ! Vous allez être rediriger. <span class="emojiWave">😲</span></div>` 
        var delayInMilliseconds = 5000; //5 second
        setTimeout(function() {
            window.location.href = "/cart.html";
        }, delayInMilliseconds);
    }
});