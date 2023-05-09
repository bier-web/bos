var auditBusiness = requireModule("audit-business");
var helpers = requireModule("helpers");
var securityBusiness = requireModule("security-business");

var canGet = function (ctx, bbc, loggedUser, userGroup, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso UserGroupsBusiness :: Evento :: canGet :: Ação :: Begin");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, userGroup, "usergroups", helpers.helperServer.both.actions.read, function (canRead) {
            helpers.helperServer.showLog("BierOnStack: Recurso UserGroupsBusiness :: Evento :: canGet :: Ação :: End");
            callback(canRead);
        });
    } catch (error) {
        helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupBusiness :: Evento :: canGet :: Exceção :: {0}", error.message));
    }
};

var canPost = function (ctx, bbc, loggedUser, userGroup, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso UserGroupsBusiness :: Evento :: post :: Ação :: Begin");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, userGroup, "usergroups", helpers.helperServer.both.actions.add, function (canAdd) {
            if (canAdd) {
                helpers.helperServer.showLog("BierOnStack: Recurso UserGroupsBusiness :: Evento :: post :: Ação :: End usuário autorizado");
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.add,
                    loggedUser,
                    "Grupo de Usuário ",
                    "(" + userGroup.id + ") - " + userGroup.name,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canAdd);
            helpers.helperServer.showLog("BierOnStack: Recurso UserGroupsBusiness :: Evento :: post :: Ação :: End");
        });
    } catch (error) {
        helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupsBusiness :: Evento :: canPost :: Exceção :: {0}", error.message));
    }
};

var canPut = function (ctx, bbc, loggedUser, userGroup, callback) {
    try {
        helpers.log("userGroups -> canPut -> begin");

        helpers.log("userGroups -> canPut -> Chamando securityBusiness -> hasPermissionToAction");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, userGroup, "usergroups", helpers.helperServer.both.actions.edit, function (canEdit) {
            if (canEdit) {
                helpers.log("userGroups -> canPut -> Registrando log de auditoria");
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.edit,
                    loggedUser,
                    "Grupo de Usuário ",
                    "(" + userGroup.id + ") - " + userGroup.name,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canEdit);
        });

        helpers.log("userGroups -> canPut -> end");
    } catch (error) {
        helpers.notifyException("userGroups -> canPut -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canDelete = function (ctx, bbc, loggedUser, userGroup, callback) {
    try {
        helpers.log("userGroups -> canDelete -> begin");

        helpers.log("userGroups -> canDelete -> Chamando securityBusiness -> hasPermissionToAction");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, userGroup, "usergroups", helpers.helperServer.both.actions.remove, function (canDelete) {
            if (canDelete) {
                var _error = 0;

                helpers.log("UserGroupsBusiness -> canDelete -> Verificando se existem usuários vinculados ao grupo");
                bbc.usergroupusers.get({ userGroupId: userGroup.id, isAllowed: true }, function (userGroupUsers, error) {
                    if (error) {
                        helpers.notifyException("userGroups -> canDelete -> Erro desconhecido ->");
                        helpers.notifyException(error);
                        callback(false, "Erro ao apagar o grupo de usuário: " + error);
                    } else {
                        if (userGroupUsers.length > 0) {
                            _error = 1;
                        }

                        switch (_error) {
                            case 0:
                                callback(true);
                                break;

                            case 1:
                                callback(false, "Existem usuários vinculados ao grupo!");
                                break;
                        }
                    }
                });
            }

            callback(canDelete);
        });

        helpers.log("userGroups -> canDelete -> end");
    } catch (error) {
        helpers.notifyException("userGroups -> canDelete -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onDelete = function (ctx, bbc, loggedUser, userGroup, callback) {
    try {
        helpers.log("UserGroupsBusiness -> onDelete -> Apagando vínculo com permissões");
        bbc.usergrouppermissions.get({ userGroupId: userGroup.id }, function (userGroupPermissions, error) {
            userGroupPermissions.forEach((userGroupPermission) => {
                bbc.usergrouppermissions.del(userGroupPermission.id, function (userGroupPermission, error) {
                    if (error) {
                        helpers.notifyException("UserGroupsBusiness -> onDelete -> Erro Apagando vínculo com permissões");
                        helpers.notifyException(error);
                    }
                });
            });
        });

        helpers.log("UserGroupsBusiness -> onDelete -> Apagando vínculo com menus");
        bbc.usergroupmenus.get({ userGroupId: userGroup.id }, function (userGroupMenus, error) {
            userGroupMenus.forEach((userGroupMenu) => {
                bbc.usergroupmenus.del(userGroupMenu.id, function (userGroupMenu, error) {
                    if (error) {
                        helpers.notifyException("UserGroupsBusiness -> onDelete -> Erro Apagando vínculo com menus");
                        helpers.notifyException(error);
                    }
                });
            });
        });

        helpers.log("UserGroupsBusiness -> onDelete -> Apagando vínculo com dimensões");
        bbc.usergroupdimensions.get({ userGroupId: userGroup.id }, function (userGroupDimensions, error) {
            userGroupDimensions.forEach((userGroupDimension) => {
                bbc.usergroupdimensions.del(userGroupDimension.id, function (userGroupDimension, error) {
                    if (error) {
                        helpers.notifyException("UserGroupsBusiness -> onDelete -> Erro Apagando vínculo com dimensões");
                        helpers.notifyException(error);
                    }
                });
            });
        });

        helpers.log("UserGroupsBusiness -> onDelete -> Apagando vínculo com usuários");
        bbc.usergroupusers.get({ userGroupId: userGroup.id }, function (userGroupUsers, error) {
            userGroupUsers.forEach((userGroupUser) => {
                bbc.usergroupusers.del(userGroupUser.id, function (userGroupUser, error) {
                    if (error) {
                        helpers.notifyException("UserGroupsBusiness -> onDelete -> Erro Apagando vínculo com usuários");
                        helpers.notifyException(error);
                    }
                });
            });
        });

        helpers.log("userGroups -> canDelete -> Registrando log de auditoria");
        auditBusiness.logAction(
            bbc,
            helpers.helperServer.both.actions.remove,
            loggedUser,
            "Grupo de Usuário ",
            "(" + userGroup.id + ") - " + userGroup.name,
            ctx.req.headers["x-real-ip"]
        );
    } catch (error) {
        helpers.log("UserGroupsBusiness -> onPost -> Erro inesperado ->");
        helpers.log(error);
    }
};

var onPost = function (ctx, bbc, loggedUser, userGroup, callback) {
    try {
        helpers.log("UserGroupsBusiness -> onPost -> begin");
        helpers.log("UserGroupsBusiness -> onPost -> end");
    } catch (error) {
        helpers.notifyException("UserGroupsBusiness -> onPost -> Erro inesperado ->");
        helpers.notifyException(error);
    }
};

module.exports = {
    canGet: canGet,
    canPost: canPost,
    canPut: canPut,
    canDelete: canDelete,
    onPost: onPost,
    onDelete: onDelete
};
