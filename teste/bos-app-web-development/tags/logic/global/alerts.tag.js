/* BOS - BierOnStack - File Reserved */
alertsTag = function (opts) {
	this.on('mount', function () {
		var gridAlerts = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'alertas',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {
					if (data.isActive) $(element).find('td:first').addClass('grid-item-active');
				},
				item_changed: function (element, data) {},
				postRender: function (element, data) {},
				showFilter: true,
				commandButtons: [helpersWebApp.both().actions.add, helpersWebApp.both().actions.filter],
				addEditTag: 'alert',
				mainContainer: '.alerts-container',
				actionRow: true,
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				filterColumns: [
					{
						name: 'typeId',
						type: 'icon',
						searchName: 'typeId',
						searchType: 'lookup',
						searchData: [alertTypes.warning, alertTypes.news, alertTypes.urgent],
						title: 'Tipo'
					},
					{
						name: 'title',
						type: 'text',
						searchContains: true,
						title: 'Título'
					},
					{
						name: 'alert',
						searchContains: true,
						type: 'text',
						title: 'Alerta'
					}
				],
				dataColumns: [
					{
						name: 'typeId',
						weight: 'one',
						type: 'icon',
						icon: function (data) {
							switch (data.typeId) {
								case alertTypes.warning.id:
									return alertTypes.warning.icon;
									break;

								case alertTypes.urgent.id:
									return alertTypes.urgent.icon;
									break;

								case alertTypes.news.id:
									return alertTypes.news.icon;
									break;
							}
						},
						tooltip: function (data) {
							switch (data.typeId) {
								case alertTypes.warning.id:
									return alertTypes.warning.name;
									break;

								case alertTypes.urgent.id:
									return alertTypes.urgent.name;
									break;

								case alertTypes.news.id:
									return alertTypes.news.name;
									break;
							}
						},
						class: 'center aligned',
						title: {
							type: 'text',
							content: 'Tipo',
							class: 'bold'
						}
					},
					{
						name: 'title',
						weight: 'two',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Título',
							class: 'bold'
						}
					},
					{
						toFilter: true,
						name: 'alert',
						weight: 'five',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Alerta',
							class: 'bold'
						}
					},
					{
						name: 'startDate',
						weight: 'two',
						type: 'date',
						format: 'll',
						title: {
							type: 'text',
							content: 'Data Inicial',
							class: 'bold'
						}
					},
					{
						name: 'endDate',
						weight: 'two',
						type: 'date',
						format: 'll',
						title: {
							type: 'text',
							content: 'Data Final',
							class: 'bold'
						}
					},
					{
						name: 'id',
						class: 'center aligned',
						type: 'button',
						weight: 'two',
						title: {
							type: 'icon',
							content: '',
							class: 'setting big center aligned'
						},
						actionButtons: [
							{
								type: helpersWebApp.both().actions.edit
							},
							{
								type: helpersWebApp.both().actions.remove
							}
						]
					}
				]
			},
			collection: {
				name: 'alerts',
				reportLabel: 'Alertas / Avisos',
				queryOptions: {
					$sort: { startDate: -1, isActive: 1 },
					customOptions: {
						exportDefinition: 'Alerts'
					}
				}
			}
		};

		riot.mount('#grid-alerts', 'grid', gridAlerts);
	});
};
