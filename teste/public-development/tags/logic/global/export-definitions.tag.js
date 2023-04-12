/* BOS - BierOnStack - File Reserved */
exportDefinitionsTag = function (opts) {
	var _grid = undefined;

	this.on('mount', function () {
		var gridexportDefinitions = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'Definições de Exportação',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {},
				item_changed: function (element, data) {},
				postRender: function (element, data) {},
				showFilter: true,
				commandButtons: [helpersWebApp.both().actions.add, helpersWebApp.both().actions.filter],
				addEditTag: 'export-definition',
				mainContainer: '.export-definitions-container',
				actionRow: true,
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				filterColumns: [
					{
						name: 'name',
						type: 'text',
						title: 'Nome'
					},
					{
						name: 'collectionName',
						type: 'text',
						title: 'Nome da Coleção'
					},
					{
						name: 'exportDefinitions',
						type: 'object',
						title: 'Configuração da Definição'
					}
				],
				dataColumns: [
					{
						name: 'name',
						weight: 'two',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Nome',
							class: 'bold'
						}
					},
					{
						name: 'collectionName',
						weight: 'two',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Nome da Coleção',
							class: 'bold'
						}
					},
					{
						name: 'exportDefinitions',
						weight: 'six',
						type: 'object',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Configuração da Definição',
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
				name: 'exportdefinitions',
				queryOptions: {
					$sort: { name: 1 }
				}
			}
		};

		_grid = riot.mount('#grid-export-definitions', 'grid', gridexportDefinitions)[0];
	});
};
