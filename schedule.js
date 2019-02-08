(function(){

	// TODO
		//- figure out precise height based on time
		//- figure out right top based on minuets in hour
		//- output current red line
		//- update month header
		//- output all event detail in eventBlock
		//- onhover bring up event edit box

	var events = [
		{
			date: new Date(2019, 1, 14, 10, 20),
			time_from: '1000',
			time_to: '1200',
			duration: 2, // hours
			label: 'valentines'
		},
		{
			date: new Date(2019, 1, 14, 10, 20),
			time_from: '1400',
			time_to: '1530',
			duration: 2, // hours
			label: 'pay bill'
		},
		{
			date: new Date(2019, 0, 26, 10, 20),
			time_from: '1430',
			time_to: '1530',
			duration: 1, // hours
			label: 'otherthing'
		}
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
			month: 'Feb',
			events: events
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
							weekEvents.push(cEvent);
						}
					}
				}
				this.hours = this.updateHours(weekEvents);
			},
			updateHours: function(weekEvents){
				var hourArr = createHoursArray();
				for(i=0;i<weekEvents.length;i++){
					var cEvent = weekEvents[i];
					var hourIndex = Number(this.getHour(cEvent.time_from));
					hourArr[hourIndex - 7].events.push(weekEvents[i]);
				}
				return hourArr;
			},
			getHour: function(time){
				time = time.substring(0, 2);
				if(time[0] == '0'){
					time = time.substring(1, 2);
				}
				return time;
			}
		}
	});

	vueSchedule.loadEvents();

})();