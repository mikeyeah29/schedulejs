(function(){

	var events = [
		{
			date: new Date(2019, 0, 26, 10, 20),
			time_from: 1000,
			time_to: 1200,
			label: 'Open House: 40 Holdenhurst Rd, Bournemouth, BH8 8AD'
		},
		{
			date: new Date(2019, 0, 26, 10, 20),
			time_from: 1430,
			time_to: 1530,
			label: 'Open House: 40 Holdenhurst Rd, Bournemouth, BH8 8AD'
		}
	];

	var vueSchedule = new Vue({
		el: '.vueSchedule',
		data: {
			day1: moment(),
			day2: moment().add(1, 'days'),
			day3: moment().add(2, 'days'),
			day4: moment().add(3, 'days'),
			day5: moment().add(4, 'days'),
			day6: moment().add(5, 'days'),
			day7: moment().add(6, 'days'),
			currentDay: moment(),
			month: 'Feb'
		},
		methods: {
			loadPrevWeek: function(){	
				alert('prev');
			},
			loadNextWeek: function(){
				// change month
				// change events
				// change days
				this.day1 = moment(this.day1).add(1, 'days');
				this.day2 = moment(this.day2).add(1, 'days');
			}
		}
	});

})();