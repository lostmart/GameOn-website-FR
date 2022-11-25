function editNav() {
	var x = document.getElementById('myTopnav')
	if (x.className === 'topnav') {
		x.className += ' responsive'
	} else {
		x.className = 'topnav'
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')
const closeBtn = document.querySelector('.close')
const modalContent = document.querySelector('.content')

// form elements
const form = document.querySelector('form')
const firstName = document.querySelector('#first')
const lastName = document.querySelector('#last')
const email = document.querySelector('#email')
const birthdate = document.querySelector('#birthdate')
const numberOfTimes = document.querySelector('#quantity')
const radioLocationArray = document.querySelectorAll("input[type='radio']")
const conditions = document.querySelector('#checkbox1')
const modalBody = document.querySelector('.modal-body')

/* EVENT LISTENERS  */
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))

// listens to the click on the close btn
closeBtn.addEventListener('click', closeModal)

// listens for form submission
form.addEventListener('submit', (e) => validate(e))

// form listerners
firstName.addEventListener('change', (e) => validate(e))

// launch modal form
function launchModal() {
	modalbg.style.display = 'block'
}
// add unfocus to check
/// -------------------

// close modal
function closeModal() {
	modalbg.style.animation = 'modalclose 650ms ease-in-out'
	setTimeout(() => {
		modalbg.style.display = 'none'
		modalbg.style.animation = 'modalopen 850ms'
	}, 655)
}

//validate form
function validate(e) {
	e.preventDefault()
	firstNameValidation()
	lastNameValidation()
	/*
	if (firstName.value === '') {
		errorMsg(errorMsgObj.firstNameError, firstName)
	} else if (firstName.value.length < 2) {
		errorMsg(errorMsgObj.firstNameErrorShort, firstName)
	} else if (lastName.value === '') {
		errorMsg(errorMsgObj.lastNameError, lastName)
	} else if (lastName.value.length < 2) {
		errorMsg(errorMsgObj.lastNameErrorShort, lastName)
	} else if (email.value === '') {
		errorMsg('Le champ email ne peut pas être vide', email)
	} else if (!validateEmail(email.value)) {
		errorMsg('email invalide !', email)
	} else if (birthdate.value === '') {
		errorMsg('Vous devez entrer votre date de naissance', birthdate)
	} else if (numberOfTimes.value === '') {
		errorMsg('À combien GameOn avez-vous déjà participé', numberOfTimes)
	}
	// check location checks
	let locations = []
	radioLocationArray.forEach((location) => {
		location.checked ? locations.push(location) : locations
	})
	if (locations.length === 0) {
		errorMsg(
			'Vous devez choisir une option de localisation',
			document.querySelectorAll('.formData')[5]
		)
	} else if (!conditions.checked) {
		errorMsg(
			'Vous devez vérifier que vous acceptez les termes et conditions',
			conditions
		)
	} else {
		modalBody.innerHTML = ' ok ok '
	}


	*/
}

// firstName validation
function firstNameValidation() {
	if (!firstName.value) {
		errorMsg(errorMsgObj.firstNameError, firstName)
	} else if (firstName.value.length < 2) {
		errorMsg(errorMsgObj.firstNameErrorShort, firstName)
	} else {
		clearError(firstName)
	}
}

// lastName validation
function lastNameValidation() {
	if (!lastName.value) {
		errorMsg(errorMsgObj.lastNameError, lastName)
	} else if (lastName.value.length < 2) {
		errorMsg(errorMsgObj.lastNameErrorShort, lastName)
	} else {
		clearError(lastName)
	}
}

// email validation
function validateEmail(email) {
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
	const cont = document.createElement('span')
	element.style.border = '2px solid #fe142f'
	cont.style.color = '#fe142f'
	cont.style.fontSize = '0.7em'
	cont.innerText = msg
	element.insertAdjacentElement('afterend', cont)
	element.focus()
}

// eliminates error message
// expects a DOM element
function clearError(element) {
	element.style.border = '2px solid #4caf50'
	element.parentNode.removeChild(element.nextSibling)
}

// error messages
const errorMsgObj = {
	firstNameError: 'Le champ prénom ne peut pas être vide',
	firstNameErrorShort:
		'Veuillez entrer 2 caractères ou plus pour le champ du prénom',
	lastNameError: 'Le champ Nom ne peut pas être vide',
	lastNameErrorShort:
		'Veuillez entrer 2 caractères ou plus pour le champ du nom',
	emailError: "L'adresse email est invalide.",
	birthdateError: 'La date de naissance est invalide.',
	concoursError: 'Veuillez entrer un nombre valide entre 0 et 99.',
	locationError: 'Vous devez sélectionner une ville.',
	conditionsError: "Vous devez accepter les conditions d'utilisations.",
}
