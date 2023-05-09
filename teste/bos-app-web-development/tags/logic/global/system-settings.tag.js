/* BOS - BierOnStack - File Reserved */
systemSettingsTag = function (opts) {
	this.on('mount', function () {
		var gridSystemSettings = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'Configurações Internas',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {},
				item_changed: function (element, data) {},
				postRender: function (element, data) {},
				showFilter: true,
				commandButtons: [helpersWebApp.both().actions.add, helpersWebApp.both().actions.filter],
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				addEditTag: 'system-setting',
				mainContainer: '.system-settings-container',
				actionRow: true,
				filterColumns: [
					{
						name: 'description',
						type: 'text',
						title: 'Descrição',
						searchContains: true
					},
					{
						name: 'name',
						type: 'text',
						title: 'Configuração'
					},
					{
						name: 'value',
						type: 'text',
						title: 'Valor'
					}
				],
				dataColumns: [
					{
						name: 'name',
						weight: 'three',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Configuração',
							class: 'bold'
						}
					},
					{
						name: 'description',
						weight: 'five',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Descrição',
							class: 'bold'
						}
					},
					{
						name: 'value',
						weight: 'six',
						type: 'text',
						title: {
							type: 'text',
							content: 'Valor',
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
				name: 'systemsettings',
				queryOptions: {
					$sort: { name: 1 }
				}
			}
		};

		riot.mount('#grid-system-settings', 'grid', gridSystemSettings);
	});
};
