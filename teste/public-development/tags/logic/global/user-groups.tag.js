/* BOS - BierOnStack - File Reserved */
userGroupsTag = function (opts) {
	this.on('mount', function () {
		var gridUserGroups = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'Grupo de Usuários',
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
				addEditTag: 'user-group',
				mainContainer: '.user-groups-container',
				actionRow: true,
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				filterColumns: [
					{
						name: 'name',
						type: 'text',
						title: 'Nome do Grupo'
					}
				],
				dataColumns: [
					{
						name: 'id',
						weight: 'two',
						type: 'text',
						title: {
							type: 'text',
							content: 'Id',
							class: 'bold'
						}
					},
					{
						name: 'name',
						weight: 'twelve',
						type: 'text',
						title: {
							type: 'text',
							content: 'Nome do Grupo',
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
				name: 'usergroups',
				queryOptions: {
					$sort: { name: 1 }
				}
			}
		};

		riot.mount('#grid-user-groups', 'grid', gridUserGroups);
	});
};
