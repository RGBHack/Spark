var calendar;
document.addEventListener('DOMContentLoaded', function() {
		var date = new Date();
		var calendarEl = document.getElementById('calendar');
		console.log(calendarEl)
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		calendar = new FullCalendar.Calendar(calendarEl, {
			plugins: [ 'dayGrid' ],
			defaultView: 'dayGridMonth'
		});
		calendar.render()
		function getEvents() {
			if (calendar.getEvents() !== 0) {
				console.log(calendar.getEvents())
			}
			setTimeout(getEvents, 1000);
		}
		
		getEvents();
	});