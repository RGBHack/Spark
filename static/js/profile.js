var config = {
	apiKey: 'AIzaSyAFsWpVKy1bjsOM07arnzk5UYIUZz7qxGY',
	authDomain: 'spark-2121.firebaseapp.com',
	databaseURL: 'https://spark-2121.firebaseio.com',
	projectId: 'spark-2121',
	storageBucket: 'spark-2121.appspot.com',
	messagingSenderId: '115390923810',
	appId: '1:115390923810:web:82727423f6479500d9367b',
	measurementId: 'G-R304JKHRPK',
}
if (firebase.apps.length === 0) {
	firebase.initializeApp(config)
	console.log('worked')
}
const auth = firebase.auth()
const db = firebase.firestore()
var displ = null
var email = null
var tuser = null
var workspaces = null
auth.onAuthStateChanged(function (user) {
	document.getElementById('email').value = user.email
	email = user.email
	tuser = user
	db.collection('users')
		.doc(user.uid)
		.get()
		.then(function (doc) {
			document.getElementById('display_name').value = doc.data().name
			displ = doc.data().name
			workspaces = doc.data().sparkrooms
			if (doc.data().google === true) {
				document.getElementById('formstuff').style.display = 'none'
				document.getElementById('google').style.display = 'inline-block'
			}
		})
})
var form = document.getElementById('form')
form.onreset = function (e) {
	e.preventDefault()
	if (displ === null) {
		console.log('wtf')
		return
	}
	document.getElementById('display_name').value = displ
	document.getElementById('email').value = email
	document.getElementById('password').value = ''
	document.getElementById('password2').value = ''
}
form.onsubmit = function (e) {
	e.preventDefault()
	if (tuser === null) {
		return
	}
	if (displ === null) {
		return
	}
	if (document.getElementById('display_name').value !== displ) {
		db.collection('users')
			.doc(tuser.uid)
			.update({
				name: document.getElementById('display_name').value,
			})
		if (workspaces !== null) {
			for (var i = 0; i < workspaces.length; i++) {
				var docref23 = db.collection('sparkrooms').doc(workspaces[i])
				docref23.get().then(function (doc) {
					var users = doc.data().users
					for (var j = 0; j < users.length; j++) {
						if (users[j].user === tuser.uid) {
							users[j].uname = document.getElementById(
								'display_name'
							).value
						}
					}
					docref23.update({
						users: users,
					})
				})
			}
		}
		displ = document.getElementById('display_name').value
	}
	if (document.getElementById('email').value !== email) {
		tuser
			.updateEmail(document.getElementById('email').value)
			.catch(function (err) {
				$('#exampleModalCenter').modal()
			})
		email = document.getElementById('email').value
	}
	if (
		document.getElementById('password').value !== '' &&
		document.getElementById('password').value ===
			document.getElementById('password2').value
	) {
		tuser
			.updatePassword(document.getElementById('password').value)
			.catch(function (err) {
				$('#exampleModalCenter').modal()
			})
	}
}

function signin() {
	auth.signOut()
}
