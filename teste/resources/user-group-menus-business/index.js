var helpers = requireModule("helpers");
var auditBusiness = requireModule("audit-business");
var securityBusiness = requireModule("security-business");

var canGet = function (ctx, bbc, loggedUser, userGroupMenu, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso UserGroupMenusBusiness :: Evento :: canGet :: Ação :: Begin");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, userGroupMenu, "usergroups", helpers.helperServer.both.actions.read, function (canRead) {
            callback(canRead);
        });
        helpers.helperServer.showLog("BierOnStack: Recurso UserGroupMenusBusiness :: Evento :: canGet :: Ação :: End");
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupMenusBusiness :: Evento :: canGet :: Exceção :: {0}", error.message)
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
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupMenusBusiness :: Evento :: canPost :: Exceção :: {0}", error.message)
        );
    }
};

var onPost = function (ctx, bbc, loggedUser, objectItem, callback) {
    try {
        auditBusiness.logAction(
            bbc,
            helpers.helperServer.both.actions.add,
            loggedUser,
            "Menu no Grupo ",
            "(" + objectItem.id + ") - " + objectItem.name,
            ctx.req.headers["x-real-ip"]
        );
        helpers.log("userGroupMenusBusiness -> onPost -> end");
    } catch (error) {
        helpers.notifyException("userGroupMenusBusiness -> onPost -> erro desconhecido ->");
        helpers.notifyException(error);
        throw "Erro ao chamar onPost";
    }
};

var canPut = function (ctx, bbc, loggedUser, userGroupMenu, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, userGroupMenu, "usergroups", helpers.helperServer.both.actions.edit, function (canEdit) {
            if (canEdit) {
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.edit,
                    loggedUser,
                    "Menu no Grupo de Usuário ",
                    "(" + userGroupMenu.userGroupId + ") - Menu - " + userGroupMenu.menuId,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canEdit);
        });
    } catch (error) {
        helpers.notifyException("userGroupMenusBusiness -> canPut -> Erro desconhecido ->");
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
        helpers.notifyException("userGroupMenusBusiness -> canDelete -> erro desconhecido ->");
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
            "Menu no Grupo ",
            "(" + objectItem.id + ") - " + objectItem.name,
            ctx.req.headers["x-real-ip"]
        );
    } catch (error) {
        helpers.notifyException("userGroupMenusBusiness -> onDelete -> erro desconhecido ->");
        helpers.notifyException(error);
        throw "Erro ao chamar onDelete";
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
