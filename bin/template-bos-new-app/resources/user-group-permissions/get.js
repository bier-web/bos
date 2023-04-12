var helpers = requireModule('helpers');
var userGroupPermissionsBusiness = requireModule('user-group-permissions-business');
var _userGroupPermission = this;

try {
	helpers.helperServer.showLog('BierOnStack: Recurso Permissions :: Evento :: get :: Ação :: Begin');
	cancelUnless(me || internal, 'Você não está logado', 401);

	if (!internal) {
		userGroupPermissionsBusiness.canGet(ctx, dpd, me, _userGroupPermission, function (canGet) {
			helpers.helperServer.showLog('BierOnStack: Recurso Permissions :: Evento :: get :: Ação :: End usuário não autorizado');
			cancelIf(!canGet, 'Usuário não autorizado');
		});
	}

	if (typeof query.include !== 'undefined' && query.include.indexOf('permission') > -1) {
		dpd.permissions.get(_userGroupPermission.permissionId, function (permission, error) {
			if (error) {
				helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso Permissions :: Evento :: get :: Exceção :: {0}', error.message));
			} else {
				helpers.helperServer.showLog('BierOnStack: Recurso Permissions :: Evento :: get :: Ação :: Inserindo dados da permissão');
				_userGroupPermission.permissionActionId = permission.actionId;
				_userGroupPermission.permissionDescription = permission.description;
				_userGroupPermission.permissionCollection = permission.collection;
				_userGroupPermission.permissionId = permission.id;
			}
		});
	}
	helpers.helperServer.showLog('BierOnStack: Recurso Permissions :: Evento :: get :: Ação :: End');
} catch (error) {
	helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso Permissions :: Evento :: get :: Exceção :: {0}', error.message));
}
