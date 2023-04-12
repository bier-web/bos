/* BOS - BierOnStack - File Reserved */
usersTag = function (opts) {
	this.on('mount', function () {
		var gridUsers = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'Usuários',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {
					if (data.isActive) $(element).find('td:first').addClass('grid-item-active');
				},
				item_changed: function (element, data) {},
				postRender: function (element, data) {},
				showFilter: true,
				commandButtons: [helpersWebApp.both().actions.add, helpersWebApp.both().actions.filter, helpersWebApp.both().actions.export],
				addEditTag: 'user',
				mainContainer: '.users-container',
				actionRow: true,
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				filterColumns: [
					{
						name: 'username',
						type: 'text',
						title: 'Usuário'
					},
					{
						name: 'fullName',
						type: 'text',
						title: 'Nome'
					}
				],
				dataColumns: [
					{
						name: 'isRoot',
						weight: 'one',
						type: 'icon',
						icon: function (data) {
							return data.isRoot ? 'icon large user doctor yellow' : 'icon large user green';
						},
						class: 'center aligned',
						title: {
							type: 'text',
							content: 'Tipo',
							class: 'bold'
						}
					},
					{
						name: 'username',
						weight: 'one',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Usuário',
							class: 'bold'
						}
					},
					{
						name: 'fullName',
						weight: 'five',
						type: 'text',
						title: {
							type: 'text',
							content: 'Nome',
							class: 'bold'
						}
					},
					{
						name: 'id',
						class: 'center aligned',
						type: 'button',
						weight: 'one',
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
				name: 'users',
				reportLabel: 'Usuários',
				queryOptions: {
					$sort: { username: 1 },
					customOptions: {
						exportDefinition: 'Usuários'
					}
				}
			}
		};
		riot.mount('#grid-users', 'grid', gridUsers);
	});
};
