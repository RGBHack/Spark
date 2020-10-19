var cardnum = 0
var tuser = null
var config = {
  apiKey: 'AIzaSyAFsWpVKy1bjsOM07arnzk5UYIUZz7qxGY',
  authDomain: 'https://spark-2121.web.app/',
  databaseURL: 'https://spark-2121.firebaseio.com/',
  projectId: 'spark-2121',
}
if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
  console.log('worked')
}
const auth = firebase.auth()
const database = firebase.database()
const firestore = firebase.firestore()
var uname = null
auth.onAuthStateChanged(function (user) {
  if (user !== null) {
    tuser = user
    var docRef = firestore.collection('users').doc(user.uid)
    docRef.get().then(function (doc) {
      uname = doc.data().name
      var docRef3 = database.ref('/projects/' + group)
      docRef3.on('child_added', function (data) {
        addcard2(data.val().content, data.key, data.val().list)
      })
      docRef3.on('child_removed', function (data) {
        removecard(data.key)
      })
    })
  }
})

function allowDrop(ev) {
  ev.preventDefault() // default is not to allow drop
}

function dragStart(ev) {
  // The 'text/plain' is referring the Data Type (DOMString)
  // of the Object being dragged.
  // ev.target.id is the id of the Object being dragged
  ev.dataTransfer.setData('text/plain', ev.target.id)
}

function dropIt(ev) {
  if (tuser === null) {
    return
  }
  ev.preventDefault() // default is not to allow drop
  let sourceId = ev.dataTransfer.getData('text/plain')
  let sourceIdEl = document.getElementById(sourceId)
  let sourceIdParentEl = sourceIdEl.parentElement
  // ev.target.id here is the id of target Object of the drop
  let targetEl = document.getElementById(ev.target.id)
  let targetParentEl = targetEl.parentElement

  // Compare List names to see if we are going between lists
  // or within the same list
  if (targetParentEl.id !== sourceIdParentEl.id) {
    // If the source and destination have the same
    // className (card), then we risk dropping a Card in to a Card
    // That may be a cool feature, but not for us!
    if (targetEl.className === sourceIdEl.className) {
      // Append to parent Object (list), not to a
      // Card in the list
      // This is in case you drag and drop a Card on top
      // of a Card in a different list
      targetParentEl.appendChild(sourceIdEl)
      var docRef = database.ref(
        '/projects/' + group + '/' + sourceIdEl.id
      )
      docRef.update({
        list: targetParentEl.id,
        id: tuser.uid,
      })
    } else {
      // Append to the list
      targetEl.appendChild(sourceIdEl)
      var docRef = database.ref(
        '/projects/' + group + '/' + sourceIdEl.id
      )
      docRef.update({
        list: targetEl.id,
        id: tuser.uid,
      })
    }
  }
}

function addcard() {
  if (uname === null) {
    return
  }
  var docRef = database.ref('/projects/' + group)
  var docRef2 = docRef.push()
  docRef2.set({
    id: '',
    list: 'list1',
    content: $('#projName').val(),
  })
}
var car = null

function addcard2(name, id, list) {
  cardnum = cardnum + 1
  var cardnumsafe = cardnum
  var bediv =
    '<div style="display: table; height: 25px; width: 150px; overflow: hidden;"><div style="display: table-cell; vertical-align: middle;"><div>'
  var afdiv = '</div></div></div>'
  var divthing = document.createElement('div')
  divthing.id = id
  divthing.innerHTML =
    bediv +
    name +
    afdiv +
    "<span class='close' id='closeabcd" +
    cardnum.toString() +
    "'>×</span>"
  divthing.classList = 'card'
  divthing.setAttribute('draggable', 'true')
  divthing.setAttribute('ondragstart', 'dragStart(event)')
  document.getElementById(list).appendChild(divthing)
  document.getElementById(
    'closeabcd' + cardnum.toString()
  ).onclick = function (event) {
    database
      .ref('projects/' + group + '/' + event.target.parentNode.id)
      .remove()
  }
  var docRef3 = database.ref('projects/' + group + '/' + id)
  docRef3.on('child_changed', function (data) {
    if (data.val().id !== tuser.uid) {
      //console.log(data.parent().key)
      document
        .getElementById(data.val())
        .appendChild(
          document.getElementById(data.getRef().parent.key)
        )
    }
  })
}

function removecard(id) {
  document.getElementById(id).style.display = 'none'
}