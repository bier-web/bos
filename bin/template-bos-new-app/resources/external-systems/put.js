let helpers = requireModule('helpers');
let externalSystemsBusiness = requireModule('external-systems-business');
let externalSystem = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso ExternalSystem :: Evento :: Put :: Ação :: Begin');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	externalSystemsBusiness.canPut(ctx, dpd, me, externalSystem, function (canPut, message) {
		if (canPut) {
			externalSystemsBusiness.onPut(ctx, dpd, me, externalSystem, function (objectoToPost) {
				externalSystem = objectoToPost;
			});
		} else {
			cancel(message);
		}
		helpers.helperServer.showLog('BierOnStack: Recurso ExternalSystem :: Evento :: Put :: Ação :: End');
	});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso ExternalSystem :: Evento :: Put :: Exceção :: {0}', error.message));
}
