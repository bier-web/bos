try {
	var helpers = requireModule('helpers');
	var appSettingsBusiness = requireModule('app-settings-business');
	var _appSetting = this;

	if (!internal) {
		emit('app-settings:changed', _appSetting);
	}
} catch (error) {
	helpers.notifyException('appSettings -> afterCommit -> Erro desconhecido ->');
	helpers.notifyException(error);
}
