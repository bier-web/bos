let helpers = requireModule('helpers');
let appSettingsBusiness = requireModule('app-settings-business');
let appSetting = this;

try {
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);

	appSettingsBusiness.canGet(ctx, dpd, me, appSetting, function (canGet) {
		if (canGet) {
			cancelIf(!canGet);
		} else {
			cancel('Usuário não autorizado');
		}
	});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso AppSettings :: Evento :: Get :: Exceção :: {0}', error.message));
}
