var calendar;
var start;
var end;
function addDate () {
	console.log("start")
	console.log(start+$("#start").val())
	console.log(new Date(start+$("#start").val()))
	console.log("end")
	console.log(start+$("#end").val())
	console.log(new Date(start+$("#end").val()))
	calendar.addEvent(
		{
			title: $("#title").val(),
			start: new Date(start+$("#start").val()),
			end: new Date(start+$("#end").val()),
			allDay: false
		}
	);
	console.log("new event added")
	$("#dialog").dialog("close")
}
document.addEventListener('DOMContentLoaded', function() {
		var date = new Date();
		var calendarEl = document.getElementById('calendar');
		console.log(calendarEl)
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		calendar = new FullCalendar.Calendar(calendarEl, {
			plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay'
			},
			defaultView: 'dayGridMonth',
			editable: true,
			selectable: true,
			select: function(info) {
				start = info.start.toISOString().split("T")[0]+"T";
				end = info.end.toISOString().split("T")[0]+"T";
				$("#dialog").dialog();
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
			events: []
		});
		calendar.render()
		function getEvents() {
			if (calendar.getEvents() !== 0) {
				//console.log(calendar.getEvents())
			}
			setTimeout(getEvents, 1000);
		}
		

		getEvents();
});