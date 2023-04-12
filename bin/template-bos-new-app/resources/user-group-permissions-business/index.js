var helpers = requireModule('helpers');
var auditBusiness = requireModule('audit-business');
var securityBusiness = requireModule('security-business');

var canGet = function (ctx, dpd, loggedUser, userGroupPermission, callback) {
	try {
		securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, userGroupPermission, 'usergroups', helpers.helperServer.both.actions.read, function (canRead) {
			callback(canRead);
		});
	} catch (error) {
		helpers.notifyException('userGroupPermissionsBusiness -> canGet -> Erro desconhecido ->');
		helpers.notifyException(error);
	}
};

var canPost = function (ctx, dpd, loggedUser, objectItem, callback) {
	try {
		securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, objectItem, 'usergroups', helpers.helperServer.both.actions.add, function (canAdd) {
			if (canAdd) {
				callback(true);
			} else {
				callback(false, 'Usuário não tem permissão');
			}
		});
	} catch (error) {
		helpers.notifyException('userGroupPermissionsBusiness -> canPost -> erro desconhecido ->');
		helpers.notifyException(error);
		throw 'Erro ao chamar canPost';
	}
};

var onPost = function (ctx, dpd, loggedUser, objectItem, callback) {
	try {
		auditBusiness.logAction(dpd, helpers.helperServer.both.actions.add, loggedUser, 'Permissão no Grupo ', '(' + objectItem.id + ') - ' + objectItem.name, ctx.req.headers['x-real-ip']);
	} catch (error) {
		helpers.notifyException('userGroupPermissionsBusiness -> onPost -> erro desconhecido ->');
		helpers.notifyException(error);
		throw 'Erro ao chamar onPost';
	}
};

var canPut = function (ctx, dpd, loggedUser, userGroupPermission, callback) {
	try {
		securityBusiness.hasPermissionToAction(ctx, dpd, loggedUser, userGroupPermission, 'usergroups', helpers.helperServer.both.actions.edit, function (canEdit) {
			if (canEdit) {
				auditBusiness.logAction(dpd, helpers.helperServer.both.actions.edit, loggedUser, 'Permissão em Grupo Usuário', '(' + userGroupPermission.userGroupId + ') - Permissão - ' + userGroupPermission.name, ctx.req.headers['x-real-ip']);
			}

			callback(canEdit);
		});
	} catch (error) {
		helpers.notifyException('userGroupPermissionsBusiness -> canPut -> Erro desconhecido ->');
		helpers.notifyException(error);
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
		helpers.notifyException('userGroupPermissionsBusiness -> canDelete -> erro desconhecido ->');
		helpers.notifyException(error);
		throw 'Erro ao chamar canDelete';
	}
};

var onDelete = function (ctx, dpd, loggedUser, objectItem, callback) {
	try {
		auditBusiness.logAction(dpd, helpers.helperServer.both.actions.remove, loggedUser, 'Permissão no Grupo ', '(' + objectItem.id + ') - ' + objectItem.name, ctx.req.headers['x-real-ip']);
	} catch (error) {
		helpers.notifyException('userGroupPermissionsBusiness -> onDelete -> erro desconhecido ->');
		helpers.notifyException(error);
		throw 'Erro ao chamar onDelete';
	}
};

module.exports = {
	canGet: canGet,
	canPost: canPost,
	onPost: onPost,
	canPut: canPut,
	canDelete: canDelete,
	onDelete: onDelete
};
