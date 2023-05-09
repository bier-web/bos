var helpers = requireModule("helpers");
var auditBusiness = requireModule("audit-business");
var securityBusiness = requireModule("security-business");

var canGet = function (ctx, bbc, loggedUser, userGroupDimension, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensionsBusiness :: Evento :: canGet :: Ação :: Begin");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, userGroupDimension, "usergroups", helpers.helperServer.both.actions.read, function (canRead) {
            callback(canRead);
        });
        helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensionsBusiness :: Evento :: canGet :: Ação :: End");
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupDimensionsBusiness :: Evento :: canGet :: Exceção :: {0}", error.message)
        );
    }
};

var canPost = function (ctx, bbc, loggedUser, objectItem, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, objectItem, "usergroups", helpers.helperServer.both.actions.add, function (canAdd) {
            if (canAdd) {
                callback(true);
            } else {
                callback(false, "Usuário não tem permissão");
            }
        });
    } catch (error) {
        helpers.notifyException("userGroupDimenssionsBusiness -> canPost -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onPost = function (ctx, bbc, loggedUser, objectItem, callback) {
    try {
        auditBusiness.logAction(
            bbc,
            helpers.helperServer.both.actions.add,
            loggedUser,
            "Dimensão no Grupo ",
            "(" + objectItem.id + ") - " + objectItem.name,
            ctx.req.headers["x-real-ip"]
        );
    } catch (error) {
        helpers.notifyException("userGroupDimenssionsBusiness -> onPost -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onPut = function (ctx, bbc, loggedUser, userGroupPermission, callback) {
    try {
        securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, userGroupPermission, "usergroups", function (userGroupDimensionToPost) {
            callback(userGroupDimensionToPost);
        });
    } catch (error) {
        helpers.notifyException("userGroupDimensionsBusiness -> onPut -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canPut = function (ctx, bbc, loggedUser, userGroupPermission, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, userGroupPermission, "usergroups", helpers.helperServer.both.actions.edit, function (canEdit) {
            if (canEdit) {
                helpers.log("userGroupDimensionsBusiness -> canPut -> Registrando log de auditoria");
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.edit,
                    loggedUser,
                    "Usuário na Dimensão ",
                    "(" + userGroupPermission.id + ") - Usuário: " + userGroupPermission.userId + "  - Dimensão: " + userGroupPermission.dimensionId,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canEdit);
        });
    } catch (error) {
        helpers.notifyException("userGroupDimensionsBusiness -> canPut -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canDelete = function (ctx, bbc, loggedUser, objectItem, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, objectItem, "usergroups", helpers.helperServer.both.actions.remove, function (canRemove) {
            if (canRemove) {
                callback(true);
            } else {
                callback(false, "Usuário não tem permissão");
            }
        });
    } catch (error) {
        helpers.notifyException("userGroupDimensionsBusiness -> canDelete -> erro desconhecido ->");
        helpers.notifyException(error);
        throw "Erro ao chamar canDelete";
    }
};

var onDelete = function (ctx, bbc, loggedUser, objectItem, callback) {
    try {
        auditBusiness.logAction(
            bbc,
            helpers.helperServer.both.actions.remove,
            loggedUser,
            "Dimensão no Grupo ",
            "(" + objectItem.id + ") - " + objectItem.name,
            ctx.req.headers["x-real-ip"]
        );
    } catch (error) {
        helpers.notifyException("userGroupDimensionsBusiness -> onDelete -> erro desconhecido ->");
        helpers.notifyException(error);
        throw "Erro ao chamar onDelete";
    }
};

module.exports = {
    canGet: canGet,
    canPost: canPost,
    onPost: onPost,
    canPut: canPut,
    onPut: onPut,
    canDelete: canDelete,
    onDelete: onDelete
};
