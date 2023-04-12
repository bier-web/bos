var auditBusiness = requireModule('audit-business');
var securityBusiness = requireModule('security-business');
var helpers = requireModule('helpers');

var canGet = function (ctx, dpd, loggedUser, permission, callback) {
	try {
		helpers.helperServer.showLog('BierOnStack: Recurso PermissionsBusiness :: Evento :: canGet :: Ação :: Begin');
		securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, permission, 'permissions', helpers.helperServer.both.actions.read, function (canRead) {
			helpers.helperServer.showLog('BierOnStack: Recurso PermissionsBusiness :: Evento :: canGet :: Ação :: End');
			callback(canRead);
		});
	} catch (error) {
		helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso PermissionsBusiness :: Evento :: canGet :: Exceção :: {0}', error.message));
	}
};

var canGetByUserPermission = function (ctx, dpd, loggedUser, permission, collectionPermission, callback) {
	helpers.helperServer.showLog('BierOnStack: Recurso PermissionsBusiness :: Evento :: canGetByUserPermission :: Ação :: Begin');
	try {
		securityBusiness.hasPermissionToActionInCollection(ctx, dpd, loggedUser, permission, collectionPermission, function (canRead) {
			helpers.helperServer.showLog('BierOnStack: Recurso PermissionsBusiness :: Evento :: canGetByUserPermission :: Ação :: End');
			callback(canRead);
		});
	} catch (error) {
		helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso PermissionsBusiness :: Evento :: canGetByUserPermission :: Exceção :: {0}', error.message));
	}
};

module.exports = {
	canGet: canGet,
	canGetByUserPermission: canGetByUserPermission
};
