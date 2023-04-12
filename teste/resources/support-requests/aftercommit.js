let helpers = requireModule('helpers');
let supportRequest = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso SupportRequests :: Evento :: aftercommit :: Ação :: Begin');
	if (!internal) {
		dpd.viewsupportrequests.get({ uniqueId: supportRequest.uniqueId, paginationSettings: { skip: 0, limit: 1 } }, function (supportRequests) {
			emit('support-requests:changed', supportRequests.data[0]);
			helpers.helperServer.showLog('BierOnStack: Recurso SupportRequests :: Evento :: aftercommit :: Ação :: End');
		});
	}
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso SupportRequests :: Evento :: aftercommit :: Exceção :: {0}', error.message));
}
