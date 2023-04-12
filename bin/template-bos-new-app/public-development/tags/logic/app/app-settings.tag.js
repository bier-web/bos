/* BOS - BierOnStack - File Reserved: ToChange */
appSettingsTag = function (opts) {
	var _self = this;
	this.on('mount', function () {
		app.loading(true);
		dpd.appsettings.get(function (appSettings) {
			app.loading(false);
			var gridAppSettings = {
				properties: {
					gridType: helpersWebApp.gridType.crud,
					showFilter: false,
					name: 'configuração da aplicação',
					class: 'striped',
					size: 'wide',
					item_tap: function (element, data) {},
					item_postRender: function (element, data) {
						if (data.isActive) $(element).addClass('grid-item-active');
					},
					postRender: function (element, data) {},
					commandButtons: appSettings.length === 0 ? [helpersWebApp.both().actions.add] : [],
					commandButtonsAfterSave: [],
					addEditTag: 'app-setting',
					mainContainer: '.app-settings-container',
					actionRow: true,
					showPagination: {
						pageSize: helpersWebApp.gridPageSize.normal
					},
					dataColumns: [
						{
							weight: 'ten',
							type: 'text',
							name: 'name',
							title: {
								type: 'text',
								content: 'Nome das Configurações',
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
								}
							]
						}
					]
				},
				collection: {
					name: 'appsettings',
					reportLabel: 'configurações New eDealer'
				}
			};

			riot.mount('#grid-app-settings', 'grid', gridAppSettings);
		});
	});
};
