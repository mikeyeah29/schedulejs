(function(){

	// TODO
		//- DONE figure out precise height based on time
		//- DONE figure out right top based on minuets in hour
		//- DONE output current red line
		//- DONE update month header
		//- output all event detail in eventBlock
		//- onhover bring up event edit box

	// IMPROVE
		//- Update current time every 10 mins 

	var purple = '#C9B1D8';
	var lightGreen = '#DFF2CA';
	var darkGreen = '#A3E35E';
	var blue = '#E5F1F7';
	var grey = '#F2F2F2';

	var events = [
		// TODAY
		{
			date: new Date(),
			time_from: 700,
			time_to: 2000,
			duration: 13, // hours
			label: 'All Day - No Availability',
			person: 'NC',
			color: grey
		},
		{
			date: new Date(),
			time_from: 1000,
			time_to: 1030,
			duration: 0.5, // hours
			label: 'Valuation BH8…',
			person: 'SV',
			color: purple
		},
		{
			date: new Date(2019, 0, 26, 10, 20),
			time_from: 1430,
			time_to: 1530,
			duration: 1, // hours
			label: 'otherthing'
		}
		// DAY 2
		// DAY 3
		// DAY 4
		// DAY 5
		// DAY 6
		// DAY 7
	];

	function createHoursArray(){
		var arr = [];
		for(i=7;i<21;i++){
			arr.push({ events: [], time: i });
		}	
		return arr;
	}

	var vueSchedule = new Vue({
		el: '.vueSchedule',
		data: {
			days: [
				moment(), 
				moment().add(1, 'days'),
				moment().add(2, 'days'),
				moment().add(3, 'days'),
				moment().add(4, 'days'),
				moment().add(5, 'days'),
				moment().add(6, 'days')
			],
			hours: createHoursArray(),
			currentDay: moment(),
			month: moment().format('MMMM'),
			events: events,
			timebar_top: '0px'
		},
		methods: {
			loadPrevWeek: function(){	
				var prevWeekDays = [];
				for(i=0;i<this.days.length;i++){
					prevWeekDays.push( moment(this.days[i]).subtract(1, 'days') );
				}
				this.days = prevWeekDays;
				this.loadEvents();
			},
			loadNextWeek: function(){
				var nextWeekDays = [];
				for(i=0;i<this.days.length;i++){
					nextWeekDays.push( moment(this.days[i]).add(1, 'days') );
				}
				this.days = nextWeekDays;
				this.loadEvents();
			},
			loadEvents: function(){
				var weekEvents = [];
				for(i=0;i<this.events.length;i++){
					var cEvent = this.events[i];
					var eventDate = moment(cEvent.date).format('MMM Do YY');
					for(j=0;j<7;j++){
						if(this.days[j].format('MMM Do YY') == eventDate){
							cEvent.left = (j * 100) + 'px';
							cEvent.height = (cEvent.duration * 70) + 'px';
							cEvent.top = this.getTopFromMins(cEvent.time_from) + 'px';
							weekEvents.push(cEvent);
						}
					}
				}
				this.month = this.days[0].format('MMMM');
				this.hours = this.updateHours(weekEvents);
			},
			updateHours: function(weekEvents){
				var hourArr = createHoursArray();
				for(i=0;i<weekEvents.length;i++){
					var cEvent = weekEvents[i];
					var hourIndex = this.getHour(cEvent.time_from);
					hourArr[hourIndex - 7].events.push(weekEvents[i]);
				}
				return hourArr;
			},
			getHour: function(time){
				time = time.toString();
				if(time.length < 4){
					time = '0' + time;
				}
				time = time.substring(0, 2);
				if(time[0] == '0'){
					time = time.substring(1, 2);
				}
				return Number(time);
			},
			getTopFromMins: function(time){
				time = time.toString();
				if(time.length < 4){
					time = '0' + time;
				}
				var mins = time.slice(-2);
				var dec = (mins / 60);
				return Math.round(dec * 70);
			},
			updateTimeBar: function(){
				var hour = moment().format('H');
				var mins = moment().format('m')
				var top = (70 * (hour - 7)) + this.getTopFromMins(mins);
				this.timebar_top = top + 'px';
			}
		}
	});

	vueSchedule.loadEvents();
	vueSchedule.updateTimeBar();

})();