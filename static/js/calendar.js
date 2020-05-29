var calendar;
var start;
var end;
var uid = null;
var db;
function addDate () {
	console.log("start")
	console.log(start+$("#start").val())
	console.log(new Date(start+$("#start").val()))
	console.log("end")
	console.log(start+$("#end").val())
	console.log(new Date(start+$("#end").val()))
	if (new Date().toISOString().split("T")[0]+"T" === start) {
		calendar.addEvent(
			{
				title: $("#title").val(),
				start: new Date(start+$("#start").val()),
				end: new Date(start+$("#end").val()),
				allDay: false,
				color: '#1a252f'
			}
		);
		var docRef = db.collection("users").doc(uid)
		docRef.update({
			events : firebase.firestore.FieldValue.arrayUnion({
				title: $("#title").val(),
				start: new Date(start+$("#start").val()),
				end: new Date(start+$("#end").val()),
				allDay: false,
				color: '#1a252f'
			})
		})
	}
	else {
		calendar.addEvent(
			{
				title: $("#title").val(),
				start: new Date(start+$("#start").val()),
				end: new Date(start+$("#end").val()),
				allDay: false
			}
		);
		var docRef = db.collection("users").doc(uid)
		docRef.update({
			events : firebase.firestore.FieldValue.arrayUnion({
				title: $("#title").val(),
				start: new Date(start+$("#start").val()),
				end: new Date(start+$("#end").val()),
				allDay: false
			})
		})
	}
	console.log("new event added")
	$("#title").val("")
	$("#start").val("")
	$("#end").val("")
	$("#modal-container").modal('hide')
}
document.addEventListener('DOMContentLoaded', function() {
		var date = new Date();
		var calendarEl = document.getElementById('calendar');
		console.log(calendarEl)
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		var config = {
            apiKey: "AIzaSyAFsWpVKy1bjsOM07arnzk5UYIUZz7qxGY",
            authDomain: "https://spark-2121.web.app/",
            databseURL: "https://spark-2121.firebaseio.com/",
            projectId: "spark-2121"
        }
        if (firebase.apps.length === 0) {
            firebase.initializeApp(config)
            console.log("worked")
        }
        const auth = firebase.auth();
		db = firebase.firestore();
		auth.onAuthStateChanged(function (user) {
			if (user !== null) {
				uid = user.uid
				var docRef = db.collection("users").doc(user.uid)
				docRef.get().then(function (doc) {
					if (doc.exists) {
						if (doc.data().events === undefined) {
							docRef.update({
								events: []
							})
							setup([],calendarEl)
						}
						else {
							var newarr = []
							for (var i = 0; i < doc.data().events.length; i++) {
								console.log(Object.assign(doc.data().events[i]))
								newarr.push(Object.assign(doc.data().events[i]))
								newarr[i].start = newarr[i].start.toDate()
								newarr[i].end = newarr[i].end.toDate()
								newarr[i].color = '#cbced6'
							}
							console.log(newarr)
							setup(newarr,calendarEl)
						}
					}
				})
			}
		})
		
		
});

function setup (arr,calendarEl) {
	calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'bootstrap' ],
		/*theme: true,
		themeSystem: 'bootstrap4',*/
		eventColor: '#2C3E50',
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},
		defaultView: 'dayGridMonth',
		editable: true,
		selectable: true,
		select: function(info) {
			console.log("hi")
			start = info.start.toISOString().split("T")[0]+"T";
			end = info.end.toISOString().split("T")[0]+"T";
			$("#modal-container").modal('show');
			calendar.unselect();
		},
		droppable: true,
		drop: function(date, allDay) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = allDay;
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
			
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
			
		},
		events: arr
	});
	calendar.render()
	function getEvents() {
		if (calendar.getEvents() !== 0) {
			//console.log(calendar.getEvents())
		}
		setTimeout(getEvents, 1000);
	}
	

	getEvents();
}