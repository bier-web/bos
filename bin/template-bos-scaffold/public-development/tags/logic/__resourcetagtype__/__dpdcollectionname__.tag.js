/* BOS - BierOnStack */
__collectioncamelcase__Tag = function (opts) {
	let _grid = undefined;
	this.on('mount', function () {
		var grid__collectioncamelcase__ = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: '__boscollectionname__',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {},
				item_changed: function (element, data) {},
				postRender: function (element, data) {},
				showFilter: true,
				commandButtons: [helpersWebApp.both().actions.add],
				addEditTag: '__collectionnamesingular__',
				mainContainer: '.__boscollectionname__-container',
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
						name: 'id',
						class: 'center aligned',
						type: 'button',
						weight: 'fourteen',
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
				name: '__collection__',
				viewName: '__viewname__',
				dataType: helpersWebApp.both().dataType.paginatedViewCollection,
				reportLabel: '__description__',
				queryOptions: {
					$sort: {
						name: 1
					}
				}
			}
		};

		_grid = riot.mount('#grid-__boscollectionname__', 'grid', grid__collectioncamelcase__)[0];
	});
};
