/* BOS - BierOnStack - File Reserved */
supportRequestsTag = function (opts) {
	let _grid = undefined;
	this.on('mount', function () {
		var gridSupportRequests = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				name: 'Chamados',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {
					if (data.isConcluded) {
						$(element).find('td:first').addClass('grid-item-active');
						$(element).addClass('grid-item-through');
					}
				},
				item_changed: function (element, data) {},
				postRender: function (element, data) {},
				showFilter: true,
				commandButtons: [helpersWebApp.both().actions.add, helpersWebApp.both().actions.filter, helpersWebApp.both().actions.export],
				addEditTag: 'support-request',
				mainContainer: '.support-requests-container',
				actionRow: true,
				showPagination: {
					pageSize: helpersWebApp.gridPageSize.normal
				},
				filterColumns: [
					{
						name: 'uniqueId',
						searchContains: true,
						type: 'text',
						title: 'ID'
					},
					{
						name: 'title',
						searchContains: true,
						type: 'text',
						title: 'Título'
					},
					{
						name: 'description',
						searchContains: true,
						type: 'text',
						title: 'Descrição'
					},
					{
						name: 'supportStatus',
						searchName: 'supportStatusId',
						searchType: 'lookup',
						searchFieldId: 'id',
						searchFullTextSearch: true,
						searchFieldDescription: 'name',
						searchIsAllowMultiple: true,
						searchCollection: {
							viewName: 'viewsupportstatuses',
							dataType: helpersWebApp.both().dataType.singleView,
							name: 'supportstatuses',
							queryOptions: {}
						},
						type: 'text',
						title: 'Status'
					},
					{
						name: 'supportPriotiry',
						searchName: 'supportPriorityId',
						searchType: 'lookup',
						searchFieldId: 'id',
						searchFullTextSearch: true,
						searchFieldDescription: 'name',
						searchIsAllowMultiple: true,
						searchCollection: {
							viewName: 'viewsupportpriorities',
							dataType: helpersWebApp.both().dataType.singleView,
							name: 'supportpriorities',
							queryOptions: {}
						},
						type: 'text',
						title: 'Prioridade'
					}
				],
				dataColumns: [
					{
						name: 'uniqueId',
						weight: 'one',
						type: 'text',
						class: 'bold center aligned italic',
						title: {
							type: 'text',
							content: '#',
							class: 'bold center aligned'
						}
					},
					{
						name: 'statusName',
						weight: 'two',
						type: 'icon',
						class: 'center aligned large',
						tooltip: function (data) {
							return data.supportStatusName;
						},
						icon: function (data) {
							return data.supportStatusCssClassIcon;
						},
						title: {
							type: 'text',
							content: 'Status',
							class: 'center aligned bold'
						}
					},
					{
						name: 'priorityName',
						weight: 'two',
						type: 'icon',
						class: 'center aligned large',
						tooltip: function (data) {
							return data.supportPriorityName;
						},
						icon: function (data) {
							return data.supportPriorityCssClassIcon;
						},
						title: {
							type: 'text',
							content: 'Prioridade',
							class: 'center aligned bold'
						}
					},
					{
						name: 'userNameCreated',
						weight: 'one',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Criação',
							class: 'bold'
						}
					},
					{
						name: 'createdAt',
						weight: 'two',
						type: 'date',
						format: 'DD/MM/YYYY - HH:mm',
						class: 'bold italic',
						title: {
							type: 'text',
							content: '',
							class: 'bold'
						}
					},
					{
						name: 'title',
						weight: 'six',
						type: 'text',
						class: 'bold italic',
						title: {
							type: 'text',
							content: 'Título',
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
				viewName: 'viewsupportrequests',
				name: 'supportrequests',
				dataType: helpersWebApp.both().dataType.paginatedViewCollection,
				reportLabel: 'chamados de suporte',
				queryOptions: {
					customOptions: {
						exportDefinition: 'Support_Requests'
					}
				}
			}
		};

		_grid = riot.mount('#grid-support-requests', 'grid', gridSupportRequests)[0];
	});
};
