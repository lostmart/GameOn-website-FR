function editNav() {
	var x = document.getElementById("myTopnav")
	if (x.className === "topnav") {
		x.className += " responsive"
	} else {
		x.className = "topnav"
	}
}

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const formData = document.querySelectorAll(".formData")
const closeBtn = document.querySelector(".close")
const modalContent = document.querySelector(".content")

// form elements
const form = document.querySelector("form")
const firstName = document.querySelector("#first")
const lastName = document.querySelector("#last")
const email = document.querySelector("#email")
const birthdate = document.querySelector("#birthdate")
const numberOfTimes = document.querySelector("#quantity")
const radioLocationArray = document.querySelectorAll("input[type='radio']")
const conditions = document.querySelector("#checkbox1")
const modalBody = document.querySelector(".modal-body")

/* EVENT LISTENERS  */
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// listens to the click on the close btn
closeBtn.addEventListener("click", closeModal)

// listens for form submission
form.addEventListener("submit", (e) => validate(e))

// form listerners
firstName.addEventListener("change", () => firstNameValidation())

lastName.addEventListener("change", () => lastNameValidation())

email.addEventListener("change", () => emailValidation())

// launch modal form
function launchModal() {
	modalbg.style.display = "block"
}
// add unfocus to check
/// -------------------

// close modal
function closeModal() {
	modalbg.style.animation = "modalclose 650ms ease-in-out"
	setTimeout(() => {
		modalbg.style.display = "none"
		modalbg.style.animation = "modalopen 850ms"
	}, 655)
}

//validate form
function validate(e) {
	e.preventDefault()
	firstNameValidation()
	lastNameValidation()
	emailValidation()
}

// firstName validation
function firstNameValidation() {
	if (!firstName.value) {
		try {
			clearError(firstName)
		} catch (err) {
			console.log(err)
		}
		errorMsg(errorMsgObj.firstNameError, firstName)
	} else if (firstName.value.length < 2) {
		try {
			clearError(firstName)
		} catch (err) {
			console.log(err)
		}
		errorMsg(errorMsgObj.firstNameErrorShort, firstName)
	} else {
		clearError(firstName)
	}
}

// lastName validation
function lastNameValidation() {
	if (!lastName.value) {
		try {
			clearError(lastName)
		} catch (err) {
			console.log(err)
		}
		errorMsg(errorMsgObj.lastNameError, lastName)
	} else if (lastName.value.length < 2) {
		try {
			clearError(lastName)
		} catch (err) {
			console.log(err)
		}
		errorMsg(errorMsgObj.lastNameErrorShort, lastName)
	} else {
		clearError(lastName)
	}
}

// email validation
function emailValidation(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
}

// creates and inserts errorMessgae into the Dom
// expects a string and a DOM element
// after 2.5 secs celars the error from the DOM
function errorMsg(msg, element) {
	const cont = document.createElement("span")
	element.style.border = "2px solid #fe142f"
	cont.classList.add("error_msg")
	cont.innerText = msg
	element.insertAdjacentElement("afterend", cont)
	element.focus()
}

// eliminates error message
// expects a DOM element
function clearError(element) {
	element.style.border = "2px solid #4caf50"
	const errorElemArray = document.querySelectorAll(".error_msg ")
	errorElemArray.forEach((elem) => {
		elem.parentNode.removeChild(elem)
	})
}

// error messages
const errorMsgObj = {
	firstNameError: "Le champ prénom ne peut pas être vide",
	firstNameErrorShort:
		"Veuillez entrer 2 caractères ou plus pour le champ du prénom",
	lastNameError: "Le champ Nom ne peut pas être vide",
	lastNameErrorShort:
		"Veuillez entrer 2 caractères ou plus pour le champ du nom",
	emailError: "L'adresse email est invalide.",
	birthdateError: "La date de naissance est invalide.",
	concoursError: "Veuillez entrer un nombre valide entre 0 et 99.",
	locationError: "Vous devez sélectionner une ville.",
	conditionsError: "Vous devez accepter les conditions d'utilisations.",
}
