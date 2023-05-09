/* BOS - BierOnStack - File Reserved */
auditsTag = function (opts) {
	this.on('mount', function () {
		app.loading(true);
		var gridAuditsProps = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'Auditoria',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {},
				postRender: function (element, data) {},
				showFilter: true,
				commandButtons: [helpersWebApp.both().actions.filter, helpersWebApp.both().actions.export],
				mainContainer: '.audits-container',
				actionRow: true,
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				filterColumns: [
					{
						name: 'actionId',
						type: 'icon',
						class: 'center aligned',
						title: 'Ação',
						searchName: 'actionId',
						searchType: 'lookup',
						searchData: [
							{ id: 0, name: 'Inseriu Registro' },
							{ id: 1, name: 'Editou Registro' },
							{ id: 2, name: 'Apagou Registro' },
							{ id: 9, name: 'Entrou no Sistema' },
							{ id: 17, name: 'Tentou logar' },
							{ id: 18, name: 'Tentou acessar recurso' }
						]
					},
					{
						type: 'text',
						searchName: 'actionId',
						searchType: 'lookup',
						searchData: [
							{ id: 0, name: 'Inseriu Registro' },
							{ id: 1, name: 'Editou Registro' },
							{ id: 2, name: 'Apagou Registro' },
							{ id: 9, name: 'Entrou no Sistema' },
							{ id: 17, name: 'Tentou logar' },
							{ id: 18, name: 'Tentou acessar recurso' }
						],
						name: 'actionDescription',
						title: 'O que fez?'
					},
					{
						type: 'text',
						name: 'actionBy',
						title: 'Quem?',
						searchContains: true
					},
					{
						type: 'text',
						name: 'objectType',
						title: 'O que?',
						searchContains: true
					},
					{
						type: 'text',
						name: 'objectId',
						searchContains: true,
						title: 'Qual?'
					},
					{
						type: 'text',
						name: 'originRequest',
						title: 'De onde?'
					},
					{
						type: 'date',
						name: 'actionAt',
						title: 'Quando?'
					}
				],
				dataColumns: [
					{
						weight: 'one',
						type: 'text',
						name: 'actionDescription',
						title: {
							type: 'text',
							content: 'O que fez?',
							class: 'bold'
						}
					},
					{
						weight: 'one',
						type: 'text',
						name: 'actionBy',
						title: {
							type: 'text',
							content: 'Quem?',
							class: 'bold'
						}
					},
					{
						weight: 'one',
						type: 'text',
						name: 'objectType',
						title: {
							type: 'text',
							content: 'O que?',
							class: 'bold'
						}
					},
					{
						weight: 'two',
						type: 'text',
						name: 'objectId',
						title: {
							type: 'text',
							content: 'Qual?',
							class: 'bold'
						}
					},
					{
						weight: 'one',
						type: 'date',
						format: 'lll',
						name: 'actionAt',
						title: {
							type: 'text',
							content: 'Quando?',
							class: 'bold'
						}
					},
					{
						weight: 'two',
						type: 'text',
						name: 'originRequest',
						title: {
							type: 'text',
							content: 'De onde?',
							class: 'bold'
						}
					}
				]
			},
			collection: {
				name: 'audit',
				reportLabel: 'Auditoria Interna',
				queryOptions: {
					$sort: { actionAt: -1 },
					customOptions: {
						exportDefinition: 'Audits'
					}
				}
			}
		};

		riot.mount('#grid-audits', 'grid', gridAuditsProps);
	});
};
