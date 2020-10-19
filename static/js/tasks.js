var config = {
  apiKey: 'AIzaSyAFsWpVKy1bjsOM07arnzk5UYIUZz7qxGY',
  authDomain: 'httpsspark-2121.web.app/',
  databaseURL: 'https://spark-2121.firebaseio.com/',
  projectId: 'spark-2121',
}
if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}
var group = 'cyberaegis'
var database = firebase.database()
var firestore = firebase.firestore()
const auth = firebase.auth()
var uid = null
auth.onAuthStateChanged(function (user) {
  if (user === null) {
    window.location.pathname = '/'
  } else {
    uid = user.uid
    var docRef = firestore.collection('users').doc(uid)
    docRef.get().then(function (doc) {
      console.log('made it')
      if (doc.data().tasks !== undefined) {
        for (var i = 0; i < doc.data().tasks.length; i++) {
          console.log(doc.data().tasks[i].text)
          newElementByValue(
            doc.data().tasks[i].text,
            doc.data().tasks[i].checked
          )
        }
      } else {
        docRef.update({
          tasks: [],
        })
      }
    })
    document.getElementById('formEE').onsubmit = function (e) {
      newElement(e)
    }
  }
})

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName('LI')
var i
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement('SPAN')
  var txt = document.createTextNode('\u00D7')
  span.className = 'close'
  span.appendChild(txt)
  myNodelist[i].appendChild(span)
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName('close')
var i
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement
    div.style.display = 'none'
    var taskname = div.innerHTML.split('<span')[0]
    if (uid === null) {
      return
    }
    var docRef = firestore.collection('users').doc(uid)
    if (div.classList.contains('checked')) {
      docRef.update({
        tasks: firebase.firestore.FieldValue.arrayRemove({
          text: taskname,
          checked: true,
        }),
      })
    } else {
      docRef.update({
        tasks: firebase.firestore.FieldValue.arrayRemove({
          text: taskname,
          checked: false,
        }),
      })
    }
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul')
list.addEventListener(
  'click',
  function (ev) {
    if (uid === null) {
      return
    }
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked')
      var docRef = firestore.collection('users').doc(uid)
      var taskname = ev.target.innerHTML.split('<span')[0]
      console.log(taskname)
      if (ev.target.classList.contains('checked')) {
        docRef
          .update({
            tasks: firebase.firestore.FieldValue.arrayRemove({
              text: taskname,
              checked: false,
            }),
          })
          .then(
            docRef.update({
              tasks: firebase.firestore.FieldValue.arrayUnion({
                text: taskname,
                checked: true,
              }),
            })
          )
      } else {
        docRef
          .update({
            tasks: firebase.firestore.FieldValue.arrayRemove({
              text: taskname,
              checked: true,
            }),
          })
          .then(
            docRef.update({
              tasks: firebase.firestore.FieldValue.arrayUnion({
                text: taskname,
                checked: false,
              }),
            })
          )
      }
    }
  },
  false
)

// Create a new list item when clicking on the "Add" button
function newElement(e) {
  e.preventDefault()
  if (uid === null) {
    return
  }
  var li = document.createElement('li')
  var inputValue = document.getElementById('myInput').value
  var t = document.createTextNode(inputValue)
  li.appendChild(t)
  if (inputValue === '') {
    alert("You can't add a blank task, sorry.")
  } else {
    document.getElementById('myUL').appendChild(li)
  }
  document.getElementById('myInput').value = ''

  var span = document.createElement('SPAN')
  var txt = document.createTextNode('\u00D7')
  span.className = 'close'
  span.appendChild(txt)
  li.appendChild(span)

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement
      div.style.display = 'none'
      var taskname = div.innerHTML.split('<span')[0]
      if (uid === null) {
        return
      }
      var docRef = firestore.collection('users').doc(uid)
      if (div.classList.contains('checked')) {
        docRef.update({
          tasks: firebase.firestore.FieldValue.arrayRemove({
            text: taskname,
            checked: true,
          }),
        })
      } else {
        docRef.update({
          tasks: firebase.firestore.FieldValue.arrayRemove({
            text: taskname,
            checked: false,
          }),
        })
      }
    }
  }
  var docRef = firestore.collection('users').doc(uid)
  console.log('added element!')
  docRef.get().then(function (doc) {
    if (doc.data().tasks === undefined) {
      console.log('update1')
      docRef.update({
        tasks: [
          {
            text: inputValue,
            checked: false,
          },
        ],
      })
    } else {
      console.log('update2')
      docRef.update({
        tasks: firebase.firestore.FieldValue.arrayUnion({
          text: inputValue,
          checked: false,
        }),
      })
    }
  })
}

function newElementByValue(inputValue, checked) {
  var li = document.createElement('li')
  var t = document.createTextNode(inputValue)
  li.appendChild(t)
  if (inputValue === '') {
    alert("You can't add a blank task, sorry.")
  } else {
    child = document.getElementById('myUL').appendChild(li)
  }
  if (checked) {
    child.classList.toggle('checked')
  }
  document.getElementById('myInput').value = ''

  var span = document.createElement('SPAN')
  var txt = document.createTextNode('\u00D7')
  span.className = 'close'
  span.appendChild(txt)
  li.appendChild(span)

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement
      div.style.display = 'none'
      var taskname = div.innerHTML.split('<span')[0]
      if (uid === null) {
        return
      }
      var docRef = firestore.collection('users').doc(uid)
      if (div.classList.contains('checked')) {
        docRef.update({
          tasks: firebase.firestore.FieldValue.arrayRemove({
            text: taskname,
            checked: true,
          }),
        })
      } else {
        docRef.update({
          tasks: firebase.firestore.FieldValue.arrayRemove({
            text: taskname,
            checked: false,
          }),
        })
      }
    }
  }
}
