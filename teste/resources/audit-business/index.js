/* BOS - BierOnStack */
var helpers = requireModule('helpers');
let securityBusiness = requireModule('security-business');

module.exports = {
	canGet: function (ctx, dpd, loggedUser, audit, callback) {
		try {
			helpers.helperServer.showLog('BierOnStack: Recurso AuditBusiness :: Evento :: canGet :: Ação :: begin');
			securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, audit, 'audit', helpers.helperServer.both.read, function (canRead) {
				helpers.helperServer.showLog('BierOnStack: Recurso AuditBusiness :: Evento :: canGet :: Ação :: end');
				callback(canRead);
			});
		} catch (error) {
			helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso AuditBusiness :: Evento :: canGet :: Exceção :: {0}', error.message));
		}
	},
	logAction: function (dpd, action, user, objectType, objectId, origin, objectOld, objectNew) {
		try {
			// helpers.helperServer.showLog("BierOnStack: Recurso AuditBusiness :: Evento :: logAction :: Ação :: Begin");
			if (user.isAuditable || action == helpers.helperServer.both.actions.tryLogin) {
				// helpers.helperServer.showLog("BierOnStack: Recurso AuditBusiness :: Evento :: logAction :: Ação :: Registrando log da ação");

				dpd.audit.post(
					{
						actionId: action.index,
						actionAt: new Date().toISOString(),
						actionBy: user.username,
						objectType: objectType,
						objectId: objectId,
						originRequest: origin,
						oldObjectJson: objectOld,
						newObjectJson: objectNew
					},
					function (audit, error) {
						if (error) {
							helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso AuditBusiness :: Evento :: logAction :: Exceção :: {0}', error.message));
						} else {
							// helpers.helperServer.showLog("BierOnStack: Recurso AuditBusiness :: Evento :: logAction :: Ação :: End log registrado com sucesso!");
						}
					}
				);
			}
		} catch (error) {
			helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso AuditBusiness :: Evento :: logAction :: Exceção :: {0}', error.message));
		}
	}
};
