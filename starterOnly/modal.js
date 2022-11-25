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
const firstName = document.querySelector('#first')
const lastName = document.querySelector('#last')
const email = document.querySelector('#email')
const birthdate = document.querySelector('#birthdate')
const numberOfTimes = document.querySelector('#quantity')
const radioLocationArray = document.querySelectorAll("input[type='radio']")
const conditions = document.querySelector('#checkbox1')

/* EVENT LISTENERS  */
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))

// listens to the click on the close btn
closeBtn.addEventListener('click', closeModal)

// launch modal form
function launchModal() {
	modalbg.style.display = 'block'
}

// close modal
function closeModal() {
	modalbg.style.animation = 'modalclose 650ms ease-in-out'
	setTimeout(() => {
		modalbg.style.display = 'none'
		modalbg.style.animation = 'modalopen 850ms'
	}, 655)
}

//validate form
function validate() {
	if (firstName.value === '') {
		// alert('Le champ Prénom ne peut pas être vide')
		errorMsg('Le champ prénom ne peut pas être vide', firstName)
		return false
	} else if (firstName.value.length < 2) {
		errorMsg(
			'Veuillez entrer 2 caractères ou plus pour le champ du prénom',
			firstName
		)
		return false
	} else if (lastName.value === '') {
		errorMsg('Le champ Nom ne peut pas être vide', lastName)
		return false
	} else if (lastName.value.length < 2) {
		errorMsg(
			'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
			lastName
		)
		return false
	} else if (email.value === '') {
		errorMsg('Le champ email ne peut pas être vide', email)
		return false
	} else if (!validateEmail(email.value)) {
		errorMsg('email invalide !', email)
		return false
	} else if (birthdate.value === '') {
		errorMsg('Vous devez entrer votre date de naissance', birthdate)
		return false
	} else if (numberOfTimes.value === '') {
		errorMsg('À combien GameOn avez-vous déjà participé', numberOfTimes)
		return false
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
		return false
	} else if (!conditions.checked) {
		errorMsg(
			'Vous devez vérifier que vous acceptez les termes et conditions',
			conditions
		)
		return false
	} else {
		alert('Merci ! Votre réservation a été reçue')
		return true
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
// accepts a string and a DOM element
// after 2.5 secs celars the error from the DOM
function errorMsg(msg, element) {
	const cont = document.createElement('span')
	cont.style.color = '#fe142f'
	cont.innerText = msg
	element.insertAdjacentElement('afterend', cont)
	element.focus()
	setTimeout(() => element.parentNode.removeChild(element.nextSibling), 2500)
}
