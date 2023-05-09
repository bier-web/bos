var auditBusiness = requireModule("audit-business");
var securityBusiness = requireModule("security-business");
var helpers = requireModule("helpers");

var canGet = function (ctx, bbc, loggedUser, dimension, callback) {
    try {
        callback(true);
    } catch (error) {
        helpers.notifyException("dimensionsBusiness -> canGet -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canPost = function (ctx, bbc, loggedUser, dimension, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, dimension, "dimensions", helpers.helperServer.both.actions.add, function (canAdd) {
            if (canAdd) {
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.add,
                    loggedUser,
                    "Dimensão ",
                    "(" + dimension.id + ") - " + dimension.name,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canAdd);
        });
    } catch (error) {
        helpers.notifyException("dimensionsBusiness -> canPost -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canPut = function (ctx, bbc, loggedUser, dimension, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, dimension, "dimensions", helpers.helperServer.both.actions.edit, function (canEdit) {
            if (canEdit) {
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.edit,
                    loggedUser,
                    "Dimensão ",
                    "(" + dimension.id + ") - " + dimension.name,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canEdit);
        });
    } catch (error) {
        helpers.notifyException("dimensionsBusiness -> canPut -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canDelete = function (ctx, bbc, loggedUser, dimension, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, dimension, "actors", helpers.helperServer.both.actions.remove, function (canRemove) {
            if (canRemove) {
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.remove,
                    loggedUser,
                    "Dimensão ",
                    "(" + dimension.id + ") - " + dimension.name,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canRemove);
        });
    } catch (error) {
        helpers.notifyException("dimensionsBusiness -> canDelete -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onDelete = function (ctx, bbc, loggedUser, dimension, callback) {
    try {
        bbc.usergroupdimensions.get({ dimensionId: dimension.id }, function (userGroupDimensions, error) {
            if (error) {
                helpers.notifyException("DimensionsBusiness -> onDelete -> Erro buscando grupos de usuários associados a dimensão ->");
                helpers.notifyException(error);
            } else {
                userGroupDimensions.forEach((userGroupDimension) => {
                    bbc.usergroupdimensions.del(userGroupDimension.id, function (userGroupDimension, error) {
                        if (error) {
                            helpers.notifyException("DimensionsBusiness -> onDelete -> Erro Apagando vínculo com grupo de usuários");
                            helpers.notifyException(error);
                        }
                    });

                    callback(true, "Vínculo de dimensão com grupos de usuários apagado.");
                });
            }
        });
    } catch (error) {
        helpers.notifyException("DimensionsBusiness -> onPost -> Erro inesperado ->");
        helpers.notifyException(error);
    }
};

var onPost = function (ctx, bbc, loggedUser, dimension, callback) {
    try {
    } catch (error) {
        helpers.notifyException("dimensionsBusiness -> onPost -> Erro inesperado ->");
        helpers.notifyException(error);
    }
};

var onPut = function (ctx, bbc, loggedUser, dimension, callback) {
    try {
        securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, dimension, "dimensions", function (dimensionToPut) {
            callback(dimensionToPut);
        });
    } catch (error) {
        helpers.notifyException("dimensionsBusiness -> onPut -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

module.exports = {
    canGet: canGet,
    canPost: canPost,
    canPut: canPut,
    canDelete: canDelete,
    onPost: onPost,
    onDelete: onDelete,
    onPut: onPut
};
