/* BOS - BierOnStack - File Reserved */
userGroupUsersTag = function (opts) {
	let _self = this;
	let _grid = undefined;
	_self.userGroup = opts.userGroup;
	_self.user = opts.user;

	_self.on('mount', function () {
		let gridUserGroupUsers;

		if (opts.showType == 'users') {
			gridUserGroupUsers = {
				properties: {
					gridType: helpersWebApp.gridType.crud,
					mainParent: _self,
					showHeader: false,
					name: 'usuários do grupo',
					class: 'striped',
					size: 'wide',
					item_tap: function (element, data) {},
					item_postRender: function (element, data) {},
					postRender: function (element, data) {
						if (opts.postRender != undefined) opts.postRender(element, data);
					},
					onDelete: function (item) {},
					showFilter: true,
					commandButtons: [helpersWebApp.both().actions.filter],
					mainContainer: '.user-group-users-container',
					actionRow: true,
					filterColumns: [
						{
							name: 'username',
							type: 'text',
							title: 'Usuário'
						},
						{
							type: 'text',
							name: 'fullName',
							title: 'Nome Completo'
						}
					],
					dataColumns: [
						{
							name: 'username',
							weight: 'three',
							type: 'text',
							class: 'center aligned',
							title: {
								type: 'text',
								content: 'Usuário',
								class: 'bold'
							}
						},
						{
							weight: 'six',
							type: 'text',
							name: 'fullName',
							title: {
								type: 'text',
								content: 'Nome Completo',
								class: 'bold'
							}
						},
						{
							weight: 'two',
							type: 'checkbox',
							name: 'userGroupUserIsAllowed',
							class: 'center aligned',
							onClick: function (isChecked, data) {
								_grid.showLoading(true);

								if (isChecked) {
									dpd.usergroupusers.post(
										{
											userGroupId: _self.userGroup.id,
											userId: data.id
										},
										function (userGroupUser, error) {
											_grid.showLoading(false);

											if (error) {
												iziToast.error({
													title: 'Erro ao salvar usuário no grupo',
													message: String.Format('Erro ao salvar grupo para o usuário: {0}', error.message),
													position: 'center'
												});
											}
										}
									);
								} else {
									dpd.usergroupusers.del(data.userGroupUserId, function (userGroupUser, error) {
										_grid.showLoading(false);

										if (error) {
											iziToast.error({
												title: 'Erro ao salvar usuário no grupo',
												message: String.Format('Erro ao salvar grupo para o usuário: {0}', error.message),
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
					name: 'users',
					queryOptions: {
						userGroupId: opts.userGroup.id,
						include: 'usergroupusers',
						$sort: { username: 1 }
					}
				}
			};
		} else if (opts.showType == 'groups') {
			gridUserGroupUsers = {
				properties: {
					gridType: helpersWebApp.gridType.crud,
					mainParent: _self,
					showHeader: false,
					name: 'grupos do usuário',
					class: 'striped',
					size: 'wide',
					item_tap: function (element, data) {},
					item_postRender: function (element, data) {},
					postRender: function (element, data) {
						if (opts.postRender != undefined) opts.postRender(element, data);
					},
					onDelete: function (item) {},
					showFilter: false,
					commandButtons: [helpersWebApp.both().actions.filter],
					mainContainer: '.user-group-users-container',
					actionRow: true,
					dataColumns: [
						{
							weight: 'ten',
							type: 'text',
							name: 'name',
							title: {
								type: 'text',
								content: 'Nome do Grupo',
								class: 'bold'
							}
						},
						{
							weight: 'two',
							type: 'checkbox',
							name: 'userGroupUserIsAllowed',
							class: 'center aligned',
							onClick: function (isChecked, data) {
								_grid.showLoading(true);

								if (isChecked) {
									dpd.usergroupusers.post(
										{
											userGroupId: data.id,
											userId: _self.user.id
										},
										function (userGroupUser, error) {
											_grid.showLoading(false);

											if (error) {
												iziToast.error({
													title: 'Erro ao salvar usuário no grupo',
													message: String.Format('Erro ao salvar grupo para o usuário: {0}', error.message),
													position: 'center'
												});
											}
										}
									);
								} else {
									dpd.usergroupusers.del(data.userGroupUserId, function (userGroupUser, error) {
										_grid.showLoading(false);

										if (error) {
											iziToast.error({
												title: 'Erro ao salvar usuário no grupo',
												message: String.Format('Erro ao salvar grupo para o usuário: {0}', error.message),
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
					name: 'usergroups',
					queryOptions: {
						userId: opts.user.id,
						include: 'usergroupusers',
						$sort: { name: 1 }
					}
				}
			};
		}

		_grid = riot.mount('#grid-user-group-users', 'grid', gridUserGroupUsers)[0];
	});
};
