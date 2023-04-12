/* BOS - BierOnStack - File Reserved */
exportDefinitionTag = function (opts) {
	var _self = this;
	var _gridCommandOrigin = opts.gridCommandOrigin;

	// adiciona na tag os métodos dinâmicos que configuram automaticamente algumas ações / opções do form;
	this.mixin(mixForCrudScreens, opts);

	this.on('mount', function () {
		// caso seja uma adição, insere um novo registro no banco (se for cancelado, o registro é apagado);
		if (opts.action == helpersWebApp.both().actions.add) {
			app.loading(true);
			dpd.exportdefinitions.post({}, function (exportDefinition) {
				_self.load(exportDefinition);
			});
		}
		// Monte seu form
		if (!opts.onlyBusiness) {
			_self.prepareForm();
		}
	});

	this.prepareForm = function () {
		$('.export-definition-tag .export-definition-form').form({
			on: 'submit',
			inline: true,
			fields: {
				name: {
					identifier: 'export-definition-name',
					rules: [
						{
							type: 'empty',
							prompt: 'Digite o nome'
						}
					]
				}
			},

			onSuccess: function (e) {
				e.preventDefault();
				e.stopPropagation();
				app.loading(true);

				dpd.exportdefinitions.post(
					{
						id: $('#export-definition-id').val(),
						name: $('#export-definition-name').val(),
						collectionName: $('#export-definition-collection-name').val(),
						exportDefinitions: JSON.parse($('#export-definition-export-definitions').val())
					},
					function (exportDefinitions, error) {
						if (error) {
							// caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
							app.loading(false);
							helpersWebApp.showErrors($('.export-definition-tag .export-definition-form'), error);
							$('.export-definition-tag .export-definition-form .firstFocus').focus();
						} else {
							app.loading(false);
							// notifica a grid que o item foi salvado, para fechar a tela;
							_gridCommandOrigin.itemSaved(exportDefinitions, opts.action);
						}
					}
				);
			}
		});
	};

	this.saveClick = function () {
		$('.export-definition-tag .export-definition-form').submit();
	};

	this.cancelClick = function () {
		if (opts.action == helpersWebApp.both().actions.add) {
			_self.removeItem($('#export-definition-id').val());
		}
	};

	this.load = function (exportDefinition) {
		_self.exportDefinition = exportDefinition;
		// carrega as informações do cliente na tela;
		$('#export-definition-id').val(exportDefinition.id);
		$('#export-definition-name').val(exportDefinition.name);
		$('#export-definition-collection-name').val(exportDefinition.collectionName);
		$('#export-definition-export-definitions').val(JSON.stringify(exportDefinition.exportDefinitions));

		_self.prepareForm();
		app.loading(false);
	};

	this.removeItem = function (id) {
		dpd.exportdefinitions.del(id, function (result, error) {
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
	};
};
