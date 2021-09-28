window.addEventListener("load", () => {

    if ('orderId' in localStorage) {
        const orderId = JSON.parse(localStorage.getItem('orderId'))
        console.log(orderId)
    
        const orderTotal = JSON.parse(localStorage.getItem('totalPrice'))
        console.log(orderTotal)
    
        document.querySelector('#orderId').textContent = 'Commande N° ' + orderId
    
        document.querySelector('#total-price').textContent = orderTotal
    
        document.querySelector('#adress').disabled = true
        document.querySelector('#city').disabled = true
        document.querySelector('#citycode').disabled = true
    
        let user = JSON.parse(localStorage.getItem("profile"));
        document.querySelector("#adress").value = user["adress"];
        document.querySelector("#city").value = user["city"];
        document.querySelector("#citycode").value = user["citycode"];
    } else {
        document.querySelector('main').innerHTML = `<div class="alert alert-danger mx-2" id="formErrorAlert" role="alert" style="position: fixed; top: 6em; right: 0; left:0; z-index: 999;"><strong>Aiie !</strong> Vous ne pouvez pas accéder à cette page pour le moment ! Vous allez être rediriger. <span class="emojiWave">😲</span></div>` 
        var delayInMilliseconds = 5000; //5 second
        setTimeout(function() {
            window.location.href = "/cart.html";
        }, delayInMilliseconds);
    }
})