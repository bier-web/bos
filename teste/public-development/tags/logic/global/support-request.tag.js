/* BOS - BierOnStack - File Reserved */
supportRequestTag = function (opts) {
	let _self = this;
	let _gridCommandOrigin = opts.gridCommandOrigin;

	this.mixin(mixForCrudScreens, opts);
	this.on('mount', function () {
		if (opts.action == helpersWebApp.both().actions.add) {
			app.loading(true);
			dpd.supportrequests.post({}, function (supportRequest) {
				_self.load(supportRequest);
			});
		}

		if (!opts.onlyBusiness) {
			_self.prepareForm();
		}
	});

	this.prepareForm = function () {
		$('.support-request-tag .support-request-form').form({
			on: 'submit',
			inline: true,
			fields: {
				supportPriority: {
					identifier: 'supportPriorityId',
					rules: [
						{
							type: 'empty',
							prompt: 'Campo obrigatório'
						}
					]
				},
				supportStatus: {
					identifier: 'supportStatusId',
					rules: [
						{
							type: 'empty',
							prompt: 'Campo obrigatório'
						}
					]
				},
				title: {
					identifier: 'support-request-title',
					rules: [
						{
							type: 'empty',
							prompt: 'Campo obrigatório'
						}
					]
				},
				description: {
					identifier: 'support-request-description',
					rules: [
						{
							type: 'empty',
							prompt: 'Campo obrigatório'
						}
					]
				}
			},
			onSuccess: function (e) {
				e.preventDefault();
				e.stopPropagation();
				app.loading(true);

				dpd.supportrequests.post(
					{
						id: $('.support-request-tag .support-request-form #support-request-id').val(),
						title: $('.support-request-tag .support-request-form #support-request-title').val(),
						description: $('.support-request-tag .support-request-form #support-request-description').val(),
						supportStatusId: $('.support-request-tag .support-request-form #support-request-support-status-id .dropdown').dropdown('get value')[0],
						supportPriorityId: $('.support-request-tag .support-request-form #support-request-support-priority-id .dropdown').dropdown('get value')[0],
						comments: _self.supportRequest.comments
					},
					function (supportRequestSaved, error) {
						if (error) {
							// caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
							app.loading(false);
							helpersWebApp.showErrors($('.support-request-tag .support-request-form'), error);
							$('.support-request-tag .support-request-form .firstFocus').focus();
						} else {
							app.loading(false);
							// notifica a grid que o item foi salvado, para fechar a tela;
							_gridCommandOrigin.itemSaved(supportRequestSaved, opts.action);
						}
					}
				);
			}
		});
	};

	this.saveClick = function () {
		$('.support-request-tag .support-request-form').submit();
	};

	this.cancelClick = function () {
		if (opts.action == helpersWebApp.both().actions.add) {
			_self.removeItem($('#support-request-id').val());
		}
	};

	this.load = function (supportRequest) {
		_self.supportRequest = supportRequest;
		$('.support-request-tag .support-request-form #support-request-id').val(supportRequest.id);
		$('.support-request-tag .support-request-form #support-request-title').val(supportRequest.title);
		$('.support-request-tag .support-request-form #support-request-description').val(supportRequest.description);
		$('.support-request-tag .support-request-form #support-request-created-at').val(moment(supportRequest.createdAt).format('lll'));
		$('.support-request-tag .support-request-form #support-request-username-created').val(supportRequest.userNameCreated);
		$('.support-request-tag .support-request-form #support-request-last-move-at').val(moment(supportRequest.lastMoveAt).format('lll'));
		$('.support-request-tag .support-request-form #support-request-last-move-username').val(supportRequest.lastMoveUserName);

		app.loading(true);
		riot.mount($('.support-request-tag #support-request-support-status-id .lookup-combobox'), 'lookup-combobox', {
			placeholder: 'Status do Chamado',
			lookupName: 'Lista de Status',
			collection: {
				viewName: 'viewsupportstatuses',
				dataType: helpersWebApp.both().dataType.singleView,
				name: 'supportstatuses',
				queryOptions: {}
			},
			fieldId: 'id',
			formFieldId: 'supportStatusId',
			fieldDescription: 'name',
			isDisabled: supportRequest.systemIsPost || supportRequest.isConcluded,
			onLoad: function (lookupItem) {
				lookupItem.dropdown('set selected', supportRequest.supportStatusId);
				app.loading(false);
			}
		});

		app.loading(true);
		riot.mount($('.support-request-tag #support-request-support-priority-id .lookup-combobox'), 'lookup-combobox', {
			placeholder: 'Prioridade do Chamado',
			lookupName: 'Lista de Prioridades',
			collection: {
				viewName: 'viewsupportpriorities',
				dataType: helpersWebApp.both().dataType.singleView,
				name: 'supportpriorities',
				queryOptions: {}
			},
			fieldId: 'id',
			formFieldId: 'supportPriorityId',
			fieldDescription: 'name',
			isDisabled: supportRequest.isConcluded,
			onLoad: function (lookupItem) {
				lookupItem.dropdown('set selected', supportRequest.supportPriorityId);
				app.loading(false);
			}
		});

		riot.mount($('.support-request-tag #support-request-comments'), 'comments', {
			comments: supportRequest.comments,
			onComment: function (newComment, commentsComponent) {
				newComment.author = window.loggedUser.username;
				supportRequest.comments.push(newComment);
				commentsComponent.update({
					comments: supportRequest.comments,
					onComment: this
				});
			}
		});

		if (supportRequest.isConcluded) {
			$('.support-request-form :input').prop('readonly', true);
			$('.datetime-calendar').calendar({
				isDisabled: function (date, mode) {
					return readOnly;
				}
			});
		}

		_self.prepareForm();
		_self.update();
		app.loading(false);
	};

	(this.removeItem = function (id) {
		dpd.supportrequests.del(id, function (result, error) {
			if (error) {
				// caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
				app.loading(false);
				iziToast.error({
					title: 'Erro ao remover o item',
					message: error.message,
					position: 'center'
				});
			} else {
				app.loading(false);
				// notifica a grid que o item foi salvado, para fechar a tela;
				_gridCommandOrigin.itemSaved(undefined, helpersWebApp.both().actions.remove);
			}
		});
	}),
		(this.uniqueId = function () {
			return typeof _self.supportRequest != 'undefined' ? _self.supportRequest.uniqueId : '#';
		});
};
