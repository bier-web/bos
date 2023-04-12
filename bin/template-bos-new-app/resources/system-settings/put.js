try {
	var helpers = requireModule('helpers');
	var systemSettingsBusiness = requireModule('system-settings-business');
	var _systemSetting = this;

	helpers.log('systemSettings -> onPut -> begin');
	helpers.log('systemSettings -> onPut -> Validando permissões');
	cancelUnless(me || internal, 'Você não está logado', 401);

	helpers.log('systemSettings -> onPut -> É chamada interna?');
	if (!internal) {
		helpers.log('systemSettings -> onPut -> Chamando systemSettingsBusiness -> canGet');
		systemSettingsBusiness.canPost(ctx, dpd, me, _systemSetting, function (canPut) {
			if (canPut) {
				systemSettingsBusiness.onPut(ctx, dpd, me, _systemSetting, function (systemSettingToPut) {
					_systemSetting = systemSettingToPut;
				});
			}

			cancelIf(!canPut, 'Usuário não autorizado');
		});
	}

	helpers.log('systemSettings -> onPut -> end');
} catch (error) {
	helpers.notifyException('systemSettings -> onPut -> Erro desconhecido ->');
	helpers.notifyException(error);
}
