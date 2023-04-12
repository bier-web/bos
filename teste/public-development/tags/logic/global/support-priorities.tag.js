/* BOS - BierOnStack - File Reserved */
supportPrioritiesTag = function (opts) {
	let _grid = undefined;
	this.on('mount', function () {
		var gridSupportPriorities = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'support-priorities',
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
				addEditTag: 'support-priority',
				mainContainer: '.support-priorities-container',
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
						weight: 'seven',
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
						weight: 'three',
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
						weight: 'one',
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
						name: 'isToNotification',
						weight: 'one',
						type: 'icon',
						class: 'center aligned large',
						tooltip: function (data) {
							return '';
						},
						icon: function (data) {
							if (data.isToNotification) {
								return types.itsTrue.icon;
							} else {
								return types.itsFalse.icon;
							}
						},
						title: {
							type: 'text',
							content: 'Notificação?',
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
				name: 'supportpriorities',
				queryOptions: {
					$sort: {
						name: 1
					}
				}
			}
		};

		_grid = riot.mount('#grid-support-priorities', 'grid', gridSupportPriorities)[0];
	});
};
