/* BOS - BierOnStack - File Reserved */
supportStatusesTag = function (opts) {
	let _grid = undefined;
	this.on('mount', function () {
		var gridSupportStatuses = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'support-statuses',
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
				addEditTag: 'support-status',
				mainContainer: '.support-statuses-container',
				actionRow: true,
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				filterColumns: [
					{
						name: 'name',
						type: 'text',
						title: 'Nome'
					}
				],
				dataColumns: [
					{
						name: 'id',
						weight: 'two',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Id',
							class: 'bold'
						}
					},
					{
						name: 'name',
						weight: 'five',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Nome',
							class: 'bold'
						}
					},
					{
						name: 'cssClassIcon',
						weight: 'five',
						type: 'text',
						class: 'bold italic large',
						title: {
							type: 'text',
							content: 'Classe CSS',
							class: 'bold'
						}
					},
					{
						name: 'statusIcon',
						weight: 'two',
						type: 'icon',
						class: 'center aligned large',
						tooltip: function (data) {
							return data.name;
						},
						icon: function (data) {
							return data.cssClassIcon;
						},
						title: {
							type: 'text',
							content: 'Ícone Status',
							class: 'center aligned large'
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
				name: 'supportstatuses',
				queryOptions: {
					$sort: { name: 1 }
				}
			}
		};

		_grid = riot.mount('#grid-support-statuses', 'grid', gridSupportStatuses)[0];
	});
};
