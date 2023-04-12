var helpers = requireModule('helpers');
var auditBusiness = requireModule('audit-business');
var securityBusiness = requireModule('security-business');

var canGet = function (ctx, dpd, loggedUser, userGroupUser, callback) {
	try {
		helpers.helperServer.showLog('BierOnStack: Recurso UserGroupUsersBusinesss :: Evento :: canGet :: Ação :: Begin');
		securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, userGroupUser, 'usergroups', helpers.helperServer.both.actions.read, function (canRead) {
			helpers.helperServer.showLog('BierOnStack: Recurso UserGroupUsersBusinesss :: Evento :: canGet :: Ação :: End retornando autorização ');
			callback(canRead);
		});
	} catch (error) {
		helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso UserGroupUsers :: Evento :: canGet :: Exceção :: {0}', error.message));
	}
};

var canPost = function (ctx, dpd, loggedUser, objectItem, callback) {
	try {
		helpers.helperServer.showLog('BierOnStack: Recurso UserGroupUsersBusinesss :: Evento :: canPost :: Ação :: Begin');
		securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, objectItem, 'usergroups', helpers.helperServer.both.actions.add, function (canAdd) {
			if (canAdd) {
				callback(true);
			} else {
				callback(false, 'Usuário não tem permissão');
			}
			helpers.helperServer.showLog('BierOnStack: Recurso UserGroupUsersBusinesss :: Evento :: canPost :: Ação :: End');
		});
	} catch (error) {
		helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso UserGroupUsers :: Evento :: canPost :: Exceção :: {0}', error.message));
	}
};

var onPost = function (ctx, dpd, loggedUser, objectItem, callback) {
	try {
		helpers.helperServer.showLog('BierOnStack: Recurso UserGroupUsersBusinesss :: Evento :: onPost :: Ação :: Begin');
		auditBusiness.logAction(dpd, helpers.helperServer.both.actions.add, loggedUser, 'Usuário no Grupo  ', '(' + objectItem.id + ') - ' + objectItem.name, ctx.req.headers['x-real-ip']);
		helpers.helperServer.showLog('BierOnStack: Recurso UserGroupUsersBusinesss :: Evento :: onPost :: Ação :: End');
	} catch (error) {
		helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso UserGroupUsers :: Evento :: onPost :: Exceção :: {0}', error.message));
	}
};

var canPut = function (ctx, dpd, loggedUser, userGroupUser, callback) {
	try {
		helpers.helperServer.showLog('BierOnStack: Recurso UserGroupUsersBusinesss :: Evento :: canPut :: Ação :: Begin');
		securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, userGroupUser, 'usergroups', helpers.helperServer.both.actions.edit, function (canEdit) {
			if (canEdit) {
				helpers.log('userGroupUsersBusiness -> canPut -> Registrando log de auditoria');
				auditBusiness.logAction(dpd, helpers.helperServer.both.actions.edit, loggedUser, 'Usuário no Grupo ', '(' + userGroupUser.id + ') - Usuário: ' + userGroupUser.userId + '  - Grupo: ' + userGroupUser.userGroupId, ctx.req.headers['x-real-ip']);
			}
			callback(canEdit);
			helpers.helperServer.showLog('BierOnStack: Recurso UserGroupUsersBusinesss :: Evento :: canPut :: Ação :: End');
		});
	} catch (error) {
		helpers.helperServer.showException(helpers.helperServer.both.formatString('BierOnStack: Recurso UserGroupUsers :: Evento :: canPut :: Exceção :: {0}', error.message));
	}
};

var canDelete = function (ctx, dpd, loggedUser, objectItem, callback) {
	try {
		securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, objectItem, 'usergroups', helpers.helperServer.both.actions.remove, function (canRemove) {
			if (canRemove) {
				callback(true);
			} else {
				callback(false, 'Usuário não tem permissão');
			}
		});
	} catch (error) {
		helpers.notifyException('userGroupUsersBusiness -> canDelete -> erro desconhecido ->');
		helpers.notifyException(error);
	}
};

var onDelete = function (ctx, dpd, loggedUser, objectItem, callback) {
	try {
		auditBusiness.logAction(dpd, helpers.helperServer.both.actions.remove, loggedUser, 'Usuário no Grupo ', '(' + objectItem.id + ') - ' + objectItem.name, ctx.req.headers['x-real-ip']);
	} catch (error) {
		helpers.notifyException('userGroupUsersBusiness -> onDelete -> erro desconhecido ->');
		helpers.notifyException(error);
	}
};

module.exports = {
	canGet: canGet,
	canPost: canPost,
	canPut: canPut,
	canDelete: canDelete,
	onDelete: onDelete,
	onPost: onPost
};
