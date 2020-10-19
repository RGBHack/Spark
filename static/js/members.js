var curuid = null

function myFunction() {
  var input, filter, ul, li, a, i, txtValue
  input = document.getElementById('myInput')
  filter = input.value.toUpperCase()
  ul = document.getElementById('myUL')
  li = ul.getElementsByTagName('li')
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('a')[0]
    txtValue = a.textContent || a.innerText
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ''
    } else {
      li[i].style.display = 'none'
    }
  }
}

var config = {
  apiKey: 'AIzaSyAFsWpVKy1bjsOM07arnzk5UYIUZz7qxGY',
  authDomain: 'https://spark-2121.web.app/',
  databseURL: 'https://spark-2121.firebaseio.com/',
  projectId: 'spark-2121',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()
const auth = firebase.auth()

var theuser = null

$(document).ready(function () {
  $('#copy').click(function () {
    $('#alrt').toggleClass('hidden')
    var copyText = document.getElementById('ctext')
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand('copy')
  })
  $('#dismiss').click(function () {
    $('#alrt').toggleClass('hidden')
  })
  $('#promote').click(function () {
    if (curuid !== null) {
      var docRef = db.collection('sparkrooms').doc(sparkroom)
      docRef.get().then(function (doc) {
        var usersarr = doc.data().users
        console.log(usersarr)
        for (var i = 0; i < usersarr.length; i++) {
          console.log(doc.data().users[i].user)
          console.log(curuid)
          if (doc.data().users[i].user === curuid) {
            console.log(curuid + 'upgraded to admin')
            usersarr[i].admin = true
          }
        }
        docRef
          .update({
            users: usersarr,
          })
          .then(function () {
            window.location.pathname = window.location.pathname
          })
      })
    }
  })
  $('#demote').click(function () {
    if (curuid !== null) {
      var docRef = db.collection('sparkrooms').doc(sparkroom)
      docRef.get().then(function (doc) {
        var usersarr = doc.data().users
        for (var i = 0; i < usersarr.length; i++) {
          if (doc.data().users[i].user === curuid) {
            usersarr[i].admin = false
          }
        }
        docRef
          .update({
            users: usersarr,
          })
          .then(function () {
            window.location.pathname = window.location.pathname
          })
      })
    }
  })
  $('#remove').click(function () {
    if (curuid !== null) {
      var docRef = db.collection('sparkrooms').doc(sparkroom)
      docRef.get().then(function (doc) {
        var usersarr = []
        for (var i = 0; i < doc.data().users.length; i++) {
          if (doc.data().users[i].user !== curuid) {
            usersarr.push(doc.data().users[i])
          }
        }
        docRef
          .update({
            users: usersarr,
          })
          .then(function () {
            var docRef2 = db.collection('users').doc(curuid)
            docRef2.get().then(function (doc) {
              var sparkrooms = []
              for (
                var i = 0;
                i < doc.data().sparkrooms.length;
                i++
              ) {
                if (doc.data().sparkrooms[i] !== sparkroom) {
                  workspaces.push(doc.data().sparkrooms[i])
                }
              }
              docRef2
                .update({
                  sparkrooms: sparkrooms,
                })
                .then(function () {
                  window.location.pathname =
                    window.location.pathname
                })
            })
          })
      })
    }
  })
  auth.onAuthStateChanged(function (user) {
    if (user !== null) {
      theuser = user
      var docRef = db.collection('sparkrooms').doc(sparkroom)
      docRef.get().then(function (doc) {
        var users = doc.data().users
        var password = doc.data().password
        $('#ctext').val(
          'Hey there, want to join my SparkRoom?\nJust click this link: https://spark-2121.herokuapp.com/join/' +
            sparkroom +
            ':' +
            password +
            '\nThe room name is ' +
            sparkroom +
            ' and the password is ' +
            password
        )
        var settings1 = ''
        var settings2 = ''
        for (var i = 0; i < users.length; i++) {
          if (users[i].user === theuser.uid) {
            if (users[i].admin) {
              console.log('ADMIN!!!')
              settings1 = '<span id="svg'
              settings2 =
                '"><svg><use xlink:href="#settings"></use></svg></span></li>'
            }
          }
        }
        for (var i = 0; i < users.length; i++) {
          var user1 = users[i]
          var uname = user1.uname
          var id = user1.user
          var admin = user1.admin
          var creator = user1.creator
          var li = document.createElement('li')
          li.id = id
          var setonclick = true
          if (creator !== undefined) {
            li.innerHTML =
              '<a>' +
              uname +
              ' </a>' +
              '<span class="badge badge-success">ADMIN</span> <span class="badge badge-success">CREATOR</span>'
            setonclick = false
          } else if (admin) {
            var a = i.toString()
            if (settings1 === '') {
              a = ''
            }
            if (id === user.uid) {
              li.innerHTML =
                '<a>' +
                uname +
                ' </a>' +
                '<span class="badge badge-success">ADMIN</span>'
            } else {
              li.innerHTML =
                '<a>' +
                uname +
                ' </a>' +
                '<span class="badge badge-success">ADMIN</span>' +
                settings1 +
                a +
                settings2
            }
          } else {
            var a = i.toString()
            if (settings1 === '') {
              a = ''
            }
            if (id === user.uid) {
              li.innerHTML = '<a>' + uname
            } else {
              li.innerHTML =
                '<a>' + uname + settings1 + a + settings2
            }
          }
          li.classList = 'list-group-item'
          document.getElementById('myUL').appendChild(li)
          if (setonclick && settings1 !== '' && id !== user.uid) {
            if (admin) {
              document.getElementById(
                'svg' + i.toString()
              ).onclick = function (e) {
                var a = e.target
                while (a.nodeName !== 'LI') {
                  a = a.parentElement
                }
                var name = a.childNodes[0].innerHTML
                $('#modal-mem').modal('toggle')
                $('#name-header').html(name)
                $('#promote').attr('disabled', true)
                $('#demote').attr('disabled', false)
                curuid = a.id
                console.log(curuid)
              }
            } else {
              document.getElementById(
                'svg' + i.toString()
              ).onclick = function (e) {
                var a = e.target
                while (a.nodeName !== 'LI') {
                  a = a.parentElement
                }
                var name = a.childNodes[0].innerHTML
                $('#modal-mem').modal('toggle')
                $('.modal-header').html(name)
                $('#promote').attr('disabled', false)
                $('#demote').attr('disabled', true)
                curuid = a.id
                console.log(curuid)
              }
            }
          }
        }
      })
    }
  })
})