(function(){

	var events = [
		{
			date: new Date(2019, 1, 14, 10, 20),
			time_from: '1000',
			time_to: '1200',
			label: 'valentines'
		},
		{
			date: new Date(2019, 0, 26, 10, 20),
			time_from: '1430',
			time_to: '1530',
			label: 'otherthing'
		}
	];

	function createHoursArray(){
		var arr = [];
		for(i=0;i<24;i++){
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
					if(moment(cEvent.date).isBetween(this.days[0], this.days[6], 'days', '[]')){
						console.log('the ', cEvent.label, ' is this week');
						weekEvents.push(cEvent);
					}
				}
				this.updateHours(weekEvents);
			},
			updateHours: function(weekEvents){
				var hourArr = createHoursArray();
				for(i=0;i<weekEvents.length;i++){
					var cEvent = weekEvents[i];
					var hourIndex = Number(this.getHour(cEvent.time_from));
					hourArr[hourIndex].events.push(weekEvents[i]);
				}
				console.log(hourArr);
				this.hours = hourArr;
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

})();