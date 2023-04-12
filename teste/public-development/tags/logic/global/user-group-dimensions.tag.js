/* BOS - BierOnStack - File Reserved */
userGroupDimensionsTag = function (opts) {
	let _self = this;
	let _grid = undefined;
	_self.userGroup = opts.userGroup;

	_self.on('mount', function () {
		let gridUserGroupDimensions = {
			properties: {
				gridType: helpersWebApp.gridType.crud,
				mainParent: _self,
				showHeader: false,
				name: 'dimensões do grupo',
				class: 'striped',
				size: 'wide',
				item_tap: function (element, data) {},
				item_postRender: function (element, data) {
					if (opts.postRender != undefined) opts.postRender(element, data);
				},
				postRender: function (element, data) {},
				onDelete: function (item) {},
				showFilter: false,
				commandButtons: [helpersWebApp.both().actions.filter],
				mainContainer: '.user-group-dimensions-container',
				actionRow: true,
				dataColumns: [
					{
						weight: 'ten',
						type: 'text',
						name: 'name',
						title: {
							type: 'text',
							content: 'Dimensão',
							class: 'bold'
						}
					},
					{
						weight: 'two',
						type: 'checkbox',
						name: 'userGroupDimensionIsFiltered',
						class: 'center aligned',
						onClick: function (isChecked, data) {
							_grid.showLoading(true);

							if (isChecked) {
								dpd.usergroupdimensions.post(
									{
										userGroupId: _self.userGroup.id,
										dimensionId: data.id
									},
									function (userGroupDimension, error) {
										_grid.showLoading(false);

										if (error) {
											iziToast.error({
												title: 'Erro ao salvar dimensão no grupo',
												message: String.Format('Erro ao salvar dimensão para o grupo: {0}', error.message),
												position: 'center'
											});
										}
									}
								);
							} else {
								dpd.usergroupdimensions.del(data.userGroupDimensionId, function (userGroupDimension, error) {
									_grid.showLoading(false);

									if (error) {
										iziToast.error({
											title: 'Erro ao salvar dimensão no grupo',
											message: String.Format('Erro ao salvar dimensão para o grupo: {0}', error.message),
											position: 'center'
										});
									}
								});
							}
						},
						title: {
							type: 'icon',
							content: '',
							class: 'setting big center aligned'
						}
					}
				]
			},
			collection: {
				name: 'dimensions',
				queryOptions: {
					userGroupId: opts.userGroup.id,
					include: 'usergroupdimensions',
					$sort: { name: 1 }
				}
			}
		};

		_grid = riot.mount('#grid-user-group-dimensions', 'grid', gridUserGroupDimensions)[0];
	});
};
