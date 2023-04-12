/* BOS - BierOnStack - File Reserved */
systemSettingTag = function (opts) {
	var _self = this;
	var _gridCommandOrigin = opts.gridCommandOrigin;

	// adiciona na tag os métodos dinâmicos que configuram automaticamente algumas ações / opções do form;
	this.mixin(mixForCrudScreens, opts);

	this.on('mount', function () {
		// caso seja uma adição, insere um novo registro no banco (se for cancelado, o registro é apagado);
		if (opts.action == helpersWebApp.both().actions.add) {
			app.loading(true);
			dpd.systemsettings.post({}, function (newItem) {
				_self.load(newItem);
				app.loading(false);
			});
		}

		if (!opts.onlyBusiness) {
			$('.system-setting-tag .system-setting-form').form({
				on: 'submit',
				inline: true,
				fields: {
					systemSettingName: {
						identifier: 'system-setting-name',
						rules: [
							{
								type: 'empty',
								prompt: 'Digite o nome da configuração'
							}
						]
					},
					systemSettingDescription: {
						identifier: 'system-setting-description',
						rules: [
							{
								type: 'empty',
								prompt: 'Digite a descrição da configuração'
							}
						]
					},
					systemSettingValue: {
						identifier: 'system-setting-value',
						rules: [
							{
								type: 'empty',
								prompt: 'Digite o valor da configuração'
							}
						]
					}
				},
				onSuccess: function (e) {
					e.preventDefault();
					e.stopPropagation();
					app.loading(true);

					dpd.systemsettings.post(
						{
							id: $('.system-setting-tag .system-setting-form #system-setting-id').val(),
							name: $('.system-setting-tag .system-setting-form #system-setting-name').val(),
							description: $('.system-setting-tag .system-setting-form #system-setting-description').val(),
							value: $('.system-setting-tag .system-setting-form #system-setting-value').val()
						},
						function (systemSetting, error) {
							if (error) {
								// caso ocorra algum erro ao salvar, não fecha a tela e exibe os erros;
								app.loading(false);
								helpersWebApp.showErrors($('.system-setting-tag .system-setting-form'), error);
								$('.system-setting-tag .system-setting-form .firstFocus').focus();
							} else {
								app.loading(false);
								// notifica a grid que o item foi salvado, para fechar a tela;
								_gridCommandOrigin.itemSaved(systemSetting, opts.action);
							}
						}
					);
				}
			});
		}
	});

	this.saveClick = function () {
		$('.system-setting-tag .system-setting-form').submit();
	};

	this.cancelClick = function () {
		if (opts.action == helpersWebApp.both().actions.add) {
			_self.removeItem($('.system-setting-tag .system-setting-form #system-setting-id').val());
		}
	};

	this.load = function (systemSetting) {
		_self.systemSetting = systemSetting;
		// carrega as informações do cliente na tela;
		$('.system-setting-tag .system-setting-form #system-setting-id').val(systemSetting.id);
		$('.system-setting-tag .system-setting-form #system-setting-name').val(systemSetting.name);
		$('.system-setting-tag .system-setting-form #system-setting-description').val(systemSetting.description);
		$('.system-setting-tag .system-setting-form #system-setting-value').val(systemSetting.value);
	};

	this.removeItem = function (id) {
		dpd.systemsettings.del(id, function (result, error) {
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
