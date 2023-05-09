// BOS - BierOnStack - File Reserved
week-days-times.week-days-times-tag
	div.ui.relaxed.divided.list.main-list
		div.item(each=' { sortedWeekDays() } ')
			i.large.calendar.alternate.outline.middle.aligned.icon
			div.middle.aligned.content
				div.description { helpersWebApp.both().formatString('{0} das {1} até {2}', helpersWebApp.both().daysOfWeekData[weekDayId].name, startDayTime, endDayTime) }
			i.link.large.calendar.times.outline.red.middle.aligned.icon(click='{ removeClick }')
	div.ui.relaxed.divided.list
		div.item
			div.middle.aligned.content
					form#week-day-time-form
						div.ui.grid.wide.middle.aligned
							div.row
								div.column
									div#week-day-id
										div.lookup-combobox-tag
							div.row.three.columns
								div.column
									field Hora Inicial
									div.ui.input
										input#week-day-start-time(type='time')
								div.column
									field Hora Final
									div.ui.input
										input#week-day-end-time(type='time')
								div.column
									i.link.large.calendar.plus.outline.blue.middle.aligned.icon(click='{ submitClick }')
	script weekDaysTimesTag.call(this, this.opts)

