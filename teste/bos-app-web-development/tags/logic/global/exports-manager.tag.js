/* BOS - BierOnStack - File Reserved */
exportsManagerTag = function (opts) {
	let _grid = undefined;
	this.on('mount', function () {
		var gridExportsManager = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				label: 'Relatórios ficam disponíveis por 24 horas',
				name: 'Relatórios',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {},
				item_changed: function (element, data) {},
				postRender: function (element, data) {},
				showFilter: true,
				commandButtons: [helpersWebApp.both().actions.filter],
				addEditTag: '',
				mainContainer: '.exports-manager-container',
				actionRow: true,
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				filterColumns: [
					{
						name: 'name',
						type: 'text',
						title: 'Nome',
						searchContains: true
					}
				],
				dataColumns: [
					{
						name: 'exportedReportAt',
						weight: 'two',
						type: 'date',
						format: 'DD/MM/YYYY - HH:mm',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Solicitado em',
							class: 'bold'
						}
					},
					{
						name: 'name',
						weight: 'eigth',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Nome',
							class: 'bold'
						}
					},
					{
						weight: 'two',
						type: 'icon',
						name: 'operationStatusId',
						class: 'center aligned large',
						tooltip: function (data) {
							switch (data.operationStatusId) {
								case helpersWebApp.both().operationStatus.queued.id:
									return helpersWebApp.both().operationStatus.queued.tooltip;
									break;
								case helpersWebApp.both().operationStatus.running.id:
									return helpersWebApp.both().operationStatus.running.tooltip;
									break;
								case helpersWebApp.both().operationStatus.completed.id:
									return helpersWebApp.both().operationStatus.completed.tooltip;
									break;
								case helpersWebApp.both().operationStatus.fail.id:
									return helpersWebApp.both().operationStatus.fail.tooltip;
									break;
							}
						},
						icon: function (data) {
							switch (data.operationStatusId) {
								case helpersWebApp.both().operationStatus.queued.id:
									return helpersWebApp.both().operationStatus.queued.icon;
									break;
								case helpersWebApp.both().operationStatus.running.id:
									return helpersWebApp.both().operationStatus.running.icon;
									break;
								case helpersWebApp.both().operationStatus.completed.id:
									return helpersWebApp.both().operationStatus.completed.icon;
									break;
								case helpersWebApp.both().operationStatus.fail.id:
									return helpersWebApp.both().operationStatus.fail.icon;
									break;
							}
						},
						title: {
							type: 'text',
							content: 'Status',
							class: 'center aligned bold'
						}
					},
					{
						name: 'id',
						class: 'center aligned',
						type: 'button',
						weight: 'four',
						title: {
							type: 'icon',
							content: '',
							class: 'setting big center aligned'
						},
						actionButtons: [
							{
								type: helpersWebApp.both().actions.download,
								enabled: true,
								onClick: function (data, gridItem) {
									window.open(data.exportedReportPath);
								}
							}
						]
					}
				]
			},
			collection: {
				name: 'exportsmanager',
				viewName: 'viewexportsmanager',
				dataType: helpersWebApp.both().dataType.paginatedViewCollection,
				reportLabel: 'relatórios',
				queryOptions: {
					$sort: { exportedReportAt: -1 },
					customOptions: {}
				}
			}
		};

		_grid = riot.mount('#grid-exports-manager', 'grid', gridExportsManager)[0];
	});
};
