let securityBusiness = requireModule('security-business');
let helpers = requireModule('helpers');

module.exports = {
	canGetData: function (ctx, dpd, loggedUser, collectionSettings, callback) {
		try {
			helpers.helperServer.showLog('BierOnStack: Recurso BosWrapperGetDataBusiness :: Evento :: canGetData :: Ação :: Begin');
			securityBusiness.canGetData(ctx, dpd, loggedUser, collectionSettings.viewName || collectionSettings.name, function (canRead) {
				helpers.helperServer.showLog('BierOnStack: Recurso BosWrapperGetDataBusiness :: Evento :: canGetData :: Ação :: End');
				callback(canRead);
			});
		} catch (error) {
			helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso BosWrapperGetDataBusiness :: Evento :: applySecurityRoles :: Exceção :: {0}', error.message));
		}
	},
	applySecurityRoles: function (ctx, dpd, loggedUser, collectionSettings, queryOptions, callback) {
		try {
			helpers.helperServer.showLog('BierOnStack: Recurso BosWrapperGetDataBusiness :: Evento :: applySecurityRoles :: Ação :: Begin');
			securityBusiness.applyDimensionsToQuery(ctx, dpd, loggedUser, collectionSettings, queryOptions, function (securityQueryOptions) {
				helpers.helperServer.showLog(helpers.helperServer.both.formatString('BierOnStack: Recurso BosWrapperGetDataBusiness :: Evento :: applySecurityRoles :: Ação :: End {0}', JSON.stringify(securityQueryOptions)));
				callback(securityQueryOptions);
			});
		} catch (error) {
			helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso BosWrapperGetDataBusiness :: Evento :: applySecurityRoles :: Exceção :: {0}', error.message));
		}
	}
};
