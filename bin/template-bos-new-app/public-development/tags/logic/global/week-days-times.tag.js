/* BOS - BierOnStack - File Reserved */
weekDaysTimesTag = function (opts) {
	let _self = this;
	this.mountLookupDays = function () {
		riot.mount($('.week-days-times-tag #week-day-id .lookup-combobox-tag'), 'lookup-combobox', {
			placeholder: 'Dia da Semana',
			lookupName: 'Lista de Dias',
			data: helpersWebApp.both().daysOfWeekData.filter((dayOfWeek) => opts.weekDaysTimes.map((wdt) => wdt.weekDayId).indexOf(dayOfWeek.id) < 0),
			onChange: function (newValue) {},
			fieldId: 'id',
			formFieldId: 'weekDayId',
			fieldDescription: 'name',
			fullTextSearch: true,
			onLoad: function (lookupItem) {
				app.loading(false);
			}
		});
	};

	this.on('mount', function () {
		app.loading(true);
		_self.mountLookupDays();

		$('.week-days-times-tag #week-day-time-form').form({
			on: 'submit',
			fields: {
				message: {
					identifier: 'message-text',
					rules: [
						{
							type: 'empty',
							prompt: 'É necessário escrever um comentário!'
						}
					]
				}
			},
			onSuccess: function (e) {
				e.preventDefault();
				e.stopPropagation();
				let newWeekDay = {
					weekDayId: parseInt($('#week-day-time-form #week-day-id .dropdown').dropdown('get value')[0]),
					startDayTime: $('#week-day-time-form #week-day-start-time').val(),
					endDayTime: $('#week-day-time-form #week-day-end-time').val()
				};
				opts.weekDaysTimes.push(newWeekDay);
				opts.onChangeWeekDays(opts.weekDaysTimes);
				_self.update();
				$('#week-day-time-form #week-day-start-time').val('');
				$('#week-day-time-form #week-day-end-time').val('');
				_self.mountLookupDays();
				return false;
			}
		});
	});

	this.on('update', function () {
		// console.log(opts);
	});

	this.submitClick = function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('#week-day-time-form').submit();
	};

	this.removeClick = function (e) {
		e.preventDefault();
		e.stopPropagation();
		opts.weekDaysTimes = opts.weekDaysTimes.filter((weekDay) => weekDay.weekDayId != e.item.weekDayId);
		opts.onChangeWeekDays(opts.weekDaysTimes);
		app.loading(true);
		_self.mountLookupDays();
	};

	this.sortedWeekDays = function () {
		return opts.weekDaysTimes.sort((a, b) => a.weekDayId - b.weekDayId);
	};
};
