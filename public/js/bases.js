/**
 * Check if is Home page
 * @returns {Bool}
 */
function homepagecheck() {
  return document.location.pathname === "/";
}

/**
 * @param {Number} price
 * @returns {String} price / 100 in €
 */
function formatCurrency(price) {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
}

/**
 * Form profile validator
 * @returns {Bool} false if empty
 */
function formProfileValidator(forms) {
  let inputProfileA = document.forms["formProfile"]["lastname"].value;
  let inputProfileB = document.forms["formProfile"]["firstname"].value;
  let inputProfileC = document.forms["formProfile"]["email"].value;
  let inputProfileD = document.forms["formProfile"]["phone"].value;
  let inputProfileE = document.forms["formProfile"]["adress"].value;
  let inputProfileF = document.forms["formProfile"]["city"].value;
  let inputProfileG = document.forms["formProfile"]["citycode"].value;

  if (
    inputProfileA == null ||
    inputProfileA == "" ||
    inputProfileB == null ||
    inputProfileB == "" ||
    inputProfileC == null ||
    inputProfileC == "" ||
    inputProfileD == null ||
    inputProfileD == "" ||
    inputProfileD.length != 10 ||
    inputProfileE == null ||
    inputProfileE == "" ||
    inputProfileF == null ||
    inputProfileF == "" ||
    inputProfileG == null ||
    inputProfileG == "" ||
    inputProfileG.length != 5
  ) {
    return false;
  }
  if (
    Number(inputProfileA) ||
    Number(inputProfileB) ||
    Number(inputProfileC) ||
    isNaN(inputProfileD) ||
    Number(inputProfileF) ||
    isNaN(inputProfileG)
  ) {
    return false;
  }
  return {
    lastname: inputProfileA,
    firstname: inputProfileB,
    email: inputProfileC,
    phone: inputProfileD,
    adress: inputProfileE,
    city: inputProfileF,
    citycode: inputProfileG,
  };
}

/**
 * Form credit card validator
 * @returns False if empty
 */
function formCreditValidator() {
  let inputCreditA = document.forms["formCredit"]["creditname"].value;
  let inputCreditB = document.forms["formCredit"]["creditnumber"].value;
  let inputCreditC = document.forms["formCredit"]["creditdate"].value;
  let inputCreditD = document.forms["formCredit"]["creditcvc"].value;

  if (
    inputCreditA == null ||
    inputCreditA == "" ||
    inputCreditB == null ||
    inputCreditB == "" ||
    inputCreditC == null ||
    inputCreditC == "" ||
    inputCreditD == null ||
    inputCreditD == ""
  ) {
    return false;
  }
  if (Number(inputCreditA) || isNaN(inputCreditB) || isNaN(inputCreditD)) {
    return false;
  }
  return {
    creditname: inputCreditA,
    creditnumber: Number(inputCreditB),
    creditdate: inputCreditC,
    creditcvc: Number(inputCreditD),
  };
}

/**
 * Return data of an user
 */
function userProfile() {
  let user = JSON.parse(localStorage.getItem("profile"));
  document.querySelector("#lastname").value = user["lastname"];
  document.querySelector("#firstname").value = user["firstname"];
  document.querySelector("#email").value = user["email"];
  document.querySelector("#phone").value = user["phone"];
  document.querySelector("#adress").value = user["adress"];
  document.querySelector("#city").value = user["city"];
  document.querySelector("#citycode").value = user["citycode"];
}

/**
 * Return data credit card of an user
 */
function userCreditCard() {
  let userCreditCard = JSON.parse(localStorage.getItem("creditCard"));

  document.querySelector("#creditname").value = userCreditCard["creditname"];
  document.querySelector("#creditnumber").value =
    userCreditCard["creditnumber"];
  document.querySelector("#creditdate").value = userCreditCard["creditdate"];
  document.querySelector("#creditcvc").value = userCreditCard["creditcvc"];
  btnCreateCredit.innerText = "Changer de carte banquaire";
}

window.addEventListener("load", () => {
  console.log("ALLRIGTH");
  if (!window.homepagecheck()) {
    const mainMargin = document.querySelector("main");
    mainMargin.style.marginTop = "5em";

    const btnDismissSuccess = document.querySelector(".btn-close-success");
    const btnDismissWarning = document.querySelector(".btn-close-warning");

    btnDismissSuccess.addEventListener("click", function () {
      document.querySelector("#formSuccess").classList.add("d-none");
    });
    btnDismissWarning.addEventListener("click", function () {
      document.querySelector("#formErrorAlert").classList.add("d-none");
    });
  }

  const productsCounter = document.querySelector("#productsCounter");
  let cart = JSON.parse(localStorage.getItem("cart") || "{}");
  let productsCounterTotal = Object.keys(cart).length;
  if (productsCounterTotal > 0) {
    productsCounter.textContent = productsCounterTotal;
  }

  document.addEventListener(
    "click",
    function (clickHeart) {
      if (!clickHeart.target.matches(".addWishlist i")) return;
      clickHeart.preventDefault();
      clickHeart.target.classList.toggle("active");
      // document.querySelector('#alertEvent').classList.add('show')
    },
    false
  );

// Logout
document.querySelector('#logout').addEventListener('click', function() {
  localStorage.clear()
})

});