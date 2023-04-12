/* BOS - BierOnStack */
let helpers = requireModule('helpers');
let externalSystem = this;
try {
	helpers.helperServer.showLog('BierOnStack: Recurso ExternalSystems :: Evento :: aftercommit :: Ação :: Begin');
	if (!internal) {
		dpd.viewexternalsystems.get({ id: externalSystem.id, paginationSettings: { skip: 0, limit: 1 } }, function (externalSystems) {
			emit('external-systems:changed', externalSystems.data[0]);
			helpers.helperServer.showLog('BierOnStack: Recurso ExternalSystems :: Evento :: aftercommit :: Ação :: End');
		});
	}
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso ExternalSystems :: Evento :: AfterCommit :: Exceção :: {0}', error.message));
}
