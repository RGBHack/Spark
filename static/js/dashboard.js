const body = document.body
const menuLinks = document.querySelectorAll('.admin-menu a')
const collapseBtn = document.querySelector('.admin-menu .collapse-btn')
const toggleMobileMenu = document.querySelector('.toggle-mob-menu')
const collapsedClass = 'collapsed'
var profileElement = document.getElementById('profile-iframe')
var calendarElement = document.getElementById('calendar-iframe')
var tasksElement = document.getElementById('tasks-iframe')
var messagesElement = document.getElementById('messages-iframe')
var projectsElement = document.getElementById('projects-iframe')
var meetingsElement = document.getElementById('meetings-iframe')
var teamElement = document.getElementById('members-iframe')
var discussionsElement = document.getElementById('discussions-iframe')

var roomnum = 0
if (sparkroom !== '') {
	var groupelem = document.getElementsByClassName('group-elem')
	for (var i = 0; i < groupelem.length; i++) {
		groupelem[i].style.display = 'list-item'
	}
	teamElement.src = '/members/' + sparkroom
	messagesElement.src = '/chat/' + sparkroom /*test*/
	$('#sparkroomname').html(sparkroom.toUpperCase() + ' &#x25b6;')
}

var config = {
	apiKey: 'AIzaSyAFsWpVKy1bjsOM07arnzk5UYIUZz7qxGY',
	authDomain: 'httpsspark-2121.web.app/',
	databseURL: 'https://spark-2121.firebaseio.com/',
	projectId: 'spark-2121',
}
if (firebase.apps.length === 0) {
	firebase.initializeApp(config)
	console.log('worked')
}
const auth = firebase.auth()
const db = firebase.firestore()

collapseBtn.addEventListener('click', function () {
	this.getAttribute('aria-expanded') == 'true'
		? this.setAttribute('aria-expanded', 'false')
		: this.setAttribute('aria-expanded', 'true')
	this.getAttribute('aria-label') == 'collapse menu'
		? this.setAttribute('aria-label', 'expand menu')
		: this.setAttribute('aria-label', 'collapse menu')
	body.classList.toggle(collapsedClass)
})

toggleMobileMenu.addEventListener('click', function () {
	this.getAttribute('aria-expanded') == 'true'
		? this.setAttribute('aria-expanded', 'false')
		: this.setAttribute('aria-expanded', 'true')
	this.getAttribute('aria-label') == 'open menu'
		? this.setAttribute('aria-label', 'close menu')
		: this.setAttribute('aria-label', 'open menu')
	body.classList.toggle('mob-menu-opened')
})

for (const link of menuLinks) {
	link.addEventListener('mouseenter', function () {
		body.classList.contains(collapsedClass) &&
		window.matchMedia('(min-width: 768px)').matches
			? this.setAttribute('title', this.textContent)
			: this.removeAttribute('title')
	})
}

function logout() {
	auth.signOut()
	window.location.pathname = '/'
}

function renderProfile() {
	if (profileElement.style.display == 'none') {
		profileElement.style.display = 'inline-block'
		calendarElement.style.display = 'none'
		tasksElement.style.display = 'none'
		messagesElement.style.display = 'none'
		projectsElement.style.display = 'none'
		meetingsElement.style.display = 'none'
		teamElement.style.display = 'none'
		discussionsElement.style.display = 'none'
	}
}

function renderCalendar() {
	if (calendarElement.style.display == 'none') {
		calendarElement.style.display = 'inline-block'
		tasksElement.style.display = 'none'
		messagesElement.style.display = 'none'
		projectsElement.style.display = 'none'
		meetingsElement.style.display = 'none'
		teamElement.style.display = 'none'
		discussionsElement.style.display = 'none'
		profileElement.style.display = 'none'
	}
}

function renderTasks() {
	if (tasksElement.style.display == 'none') {
		tasksElement.style.display = 'inline-block'
		calendarElement.style.display = 'none'
		messagesElement.style.display = 'none'
		projectsElement.style.display = 'none'
		meetingsElement.style.display = 'none'
		teamElement.style.display = 'none'
		discussionsElement.style.display = 'none'
		profileElement.style.display = 'none'
	}
}

function renderMessages() {
	if (messagesElement.style.display == 'none') {
		messagesElement.style.display = 'block'
		messagesElement.contentWindow.scrollTo(0, 999999)
		calendarElement.style.display = 'none'
		tasksElement.style.display = 'none'
		projectsElement.style.display = 'none'
		meetingsElement.style.display = 'none'
		teamElement.style.display = 'none'
		discussionsElement.style.display = 'none'
		profileElement.style.display = 'none'
	}
}

function renderProjects() {
	if (projectsElement.style.display == 'none') {
		projectsElement.style.display = 'inline-block'
		calendarElement.style.display = 'none'
		tasksElement.style.display = 'none'
		messagesElement.style.display = 'none'
		meetingsElement.style.display = 'none'
		teamElement.style.display = 'none'
		discussionsElement.style.display = 'none'
		profileElement.style.display = 'none'
	}
}

function renderMeetings() {
	if (meetingsElement.style.display == 'none') {
		meetingsElement.style.display = 'inline-block'
		calendarElement.style.display = 'none'
		tasksElement.style.display = 'none'
		messagesElement.style.display = 'none'
		projectsElement.style.display = 'none'
		teamElement.style.display = 'none'
		discussionsElement.style.display = 'none'
		profileElement.style.display = 'none'
	}
}

function renderTeam() {
	if (teamElement.style.display == 'none') {
		projectsElement.style.display = 'none'
		calendarElement.style.display = 'none'
		tasksElement.style.display = 'none'
		messagesElement.style.display = 'none'
		meetingsElement.style.display = 'none'
		teamElement.style.display = 'inline-block'
		discussionsElement.style.display = 'none'
		profileElement.style.display = 'none'
	}
}

function renderDiscussions() {
	if (discussionsElement.style.display == 'none') {
		projectsElement.style.display = 'none'
		calendarElement.style.display = 'none'
		tasksElement.style.display = 'none'
		messagesElement.style.display = 'none'
		meetingsElement.style.display = 'none'
		teamElement.style.display = 'none'
		discussionsElement.style.display = 'inline-block'
		profileElement.style.display = 'none'
	}
}

function create() {
	window.location.pathname = '/create'
}

function join() {
	window.location.pathname = '/join'
}
auth.onAuthStateChanged(function (user) {
	if (user === null) {
		window.location.pathname = '/login'
	} else {
		var docRef = db.collection('users').doc(user.uid)
		docRef.get().then(function (doc) {
			if (doc.exists) {
				if (doc.data().sparkrooms !== undefined) {
					for (var i = 0; i < doc.data().sparkrooms.length; i++) {
						roomnum++
						console.log(doc.data().sparkrooms[i])
						var li = document.createElement('li')
						li.innerHTML = doc.data().sparkrooms[i]
						document.getElementById('rooms').appendChild(li)
						li.onclick = function (e) {
							window.location.pathname =
								'/dashboard/' + e.target.innerHTML
						}
					}
				}
			}
		})
	}
})

$(document).ready(function () {
	$('[data-toggle="popover"]').popover()
})
