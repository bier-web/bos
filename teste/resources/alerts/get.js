var helpers = requireModule('helpers');
var moment = require('moment-timezone');
var alertsBusiness = requireModule('alerts-business');
var alert = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso Alerts :: Evento :: get :: Ação :: Begin');
	cancelUnless(me || internal, 'Você não está logado', 401);

	if (!internal) {
		alertsBusiness.canGet(ctx, dpd, me, alert, function (canGet) {
			if (!canGet) {
				cancelIf(alert.usersIds.indexOf(me.id) < 0);
			}
		});
	}
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso alerts :: Evento :: get :: Exceção :: {0}', error.message));
}
