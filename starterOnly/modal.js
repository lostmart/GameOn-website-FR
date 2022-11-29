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
firstName.addEventListener('change', () => firstNameValidation())

lastName.addEventListener('change', () => lastNameValidation())

email.addEventListener('change', () => emailValidation())

birthdate.addEventListener('change', () => birthDateValidation())

numberOfTimes.addEventListener('change', () => numberOfTimesValidation())

radioLocationArray.forEach((location) => {
	location.addEventListener('change', () => locationValidation())
})

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
	let readyToSend = false
	firstNameValidation() ? true : readyToSend

	!lastNameValidation() ? (readyToSend = false) : (readyToSend = true)
	!emailValidation() ? (readyToSend = false) : (readyToSend = true)
	!birthDateValidation() ? (readyToSend = false) : (readyToSend = true)
	!numberOfTimesValidation() ? (readyToSend = false) : (readyToSend = true)
	!locationValidation() ? !(readyToSend = false) : (readyToSend = true)

	if (readyToSend) {
		form.style.display = 'none'
		readyToSend = false
		// confirm message
		const parag = document.createElement('p')
		parag.textContent = 'Merci pour votre inscription'
		parag.classList.add('confim_msg')
		form.insertAdjacentElement('afterend', parag)

		// close modal button
		const btn = document.createElement('button')
		btn.classList.add('btn-close')
		btn.textContent = 'Fermer'
		modalBody.appendChild(btn)
		btn.addEventListener('click', () => {
			closeModal()
			setTimeout(() => {
				form.style.display = 'block'
				form.reset()
				location.reload()
			}, 852)
		})
	}
}

// firstName validation
function firstNameValidation() {
	if (!firstName.value || firstName.value.trim().length < 2) {
		errorMsg(errorMsgObj.firstNameError, firstName)
	} else {
		clearError(firstName)
		return true
	}
}

// lastName validation
function lastNameValidation() {
	if (!lastName.value || lastName.value.trim().length < 2) {
		errorMsg(errorMsgObj.lastNameError, lastName)
	} else {
		clearError(lastName)
		return true
	}
}

// email validation
const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/
function emailValidation() {
	if (email.value === '' || emailFormat.test(email.value) === false) {
		errorMsg(errorMsgObj.emailError, email)
		// console.log('not passeed')
	} else {
		clearError(email)
		return true
		// console.log('pased ! ')
	}
}

// date of birth validation
function birthDateValidation() {
	if (!birthdate.value) {
		errorMsg(errorMsgObj.birthdateError, birthdate)
	} else {
		clearError(birthdate)
		return true
	}
}

// numberOfTimes validation
function numberOfTimesValidation() {
	if (!numberOfTimes.value) {
		errorMsg(errorMsgObj.concoursError, numberOfTimes)
	} else {
		clearError(numberOfTimes)
		return true
	}
}

// radioLocationArray validation
let locations = []

function locationValidation() {
	radioLocationArray.forEach((location) => {
		location.checked ? locations.push(location) : location
	})
	if (locations.length === 0) {
		errorMsg(
			errorMsgObj.locationError,
			document.querySelectorAll('.formData')[5]
		)
	} else {
		document.querySelectorAll('.formData')[5].style.border = 'none'
		return true
	}
}

// creates and inserts errorMessgae into the Dom
// expects a string and a DOM element
// after 2.5 secs celars the error from the DOM
function errorMsg(msg, element) {
	const cont = document.createElement('span')
	element.style.border = '2px solid #fe142f'
	cont.classList.add('error_msg')
	cont.innerText = msg
	// checks if there is an error and erases it
	element.nextSibling.childNodes.length === 0
		? element
		: element.parentNode.removeChild(element.nextSibling)
	element.insertAdjacentElement('afterend', cont)
	element.focus()
}

// eliminates error message
// expects a DOM element
function clearError(element) {
	element.style.border = '2px solid #4caf50'
	const errorElemArray = document.querySelectorAll('.error_msg ')
	errorElemArray.forEach((elem) => {
		elem.parentNode.removeChild(elem)
	})
}

// reset form
function resetForm() {}

// error messages
const errorMsgObj = {
	firstNameError:
		'Le champ prénom ne peut pas être vide ou au moins avec deux caractères ',
	lastNameError:
		'Le champ nom ne peut pas être vide ou au moins avec deux caractères',
	emailError: "L'adresse email est invalide ou vide",
	birthdateError: 'La date de naissance est invalide.',
	concoursError: 'Veuillez entrer un nombre valide entre 0 et 99.',
	locationError: 'Vous devez sélectionner une ville.',
	conditionsError: "Vous devez accepter les conditions d'utilisations.",
}
