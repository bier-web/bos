let helpers = requireModule('helpers');
let externalSystemsBusiness = requireModule('external-systems-business');
let externalSystemType = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso ExternalSystems :: Evento :: Post :: Ação :: Begin');
	cancelUnless(me || internal, 'Usuário não autorizado!', 401);
	externalSystemsBusiness.prepareObjectToPost(ctx, dpd, me, externalSystemType, function (objectItemToPost) {
		externalSystemsBusiness.canPost(ctx, dpd, me, objectItemToPost, function (canPost, message) {
			if (canPost) {
				externalSystemsBusiness.onPost(ctx, dpd, me, objectItemToPost);
			} else {
				cancel(message);
			}
			helpers.helperServer.showLog('BierOnStack: Recurso ExternalSystems :: Evento :: Post :: Ação :: End');
		});
	});
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso ExternalSystems :: Evento :: Post :: Exceção :: {0}', error.message));
}
