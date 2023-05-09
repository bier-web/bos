let auditBusiness = requireModule("audit-business");
let helpers = requireModule("helpers");

let applyDimensionsToQuery = function (ctx, bbc, loggedUser, collectionSettings, queryOptions, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: applyDimensionsToQuery :: Ação :: Begin");
        ctx.session.data.userGroupDimensions.forEach((userGroupDimension) => {
            if (userGroupDimension.dimensionCollection === collectionSettings.name) {
                helpers.helperServer.showLog(
                    helpers.helperServer.both.formatString(
                        "BierOnStack: Recurso SecurityBusiness :: Evento :: applyDimensionsToQuery :: Ação :: Aplicando dimensão na coleção {0}",
                        collectionSettings.name
                    )
                );
                queryOptions[userGroupDimension.dimensionCollectionField] = loggedUser[userGroupDimension.dimensionUserField];
            }
        });
        callback(queryOptions);
        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: applyDimensionsToQuery :: Ação :: End");
    } catch (error) {}
};

let canGetData = function (ctx, bbc, loggedUser, collection, callback) {
    try {
        bbc.systemsettings.get({ name: "systemViews" }, function (systemSettings) {
            let systemViews = systemSettings.length > 0 ? Array.from(eval(systemSettings[0].value)) : [];
            helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: canGetData :: Ação :: Begin");
            let _hasPermission = false;
            if (typeof loggedUser !== "undefined" && typeof loggedUser.isRoot != "undefined" && loggedUser.isRoot) {
                helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: canGetData :: Ação :: End canGetData liberado, é usuário root");
                callback(true);
            } else if (systemViews.indexOf(collection) >= 0) {
                helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: canGetData :: Ação :: End canGetData liberado, é viewinterna");
                callback(true);
            } else {
                helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: canGetData :: Ação :: Buscando permissões de usuário");
                if (ctx.session.data.userGroupPermissions.length == 0) {
                    helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: canGetData :: Ação :: End permissão negada");
                    callback(false);
                } else {
                    ctx.session.data.userGroupPermissions.forEach((userGroupPermission) => {
                        _hasPermission =
                            _hasPermission ||
                            (userGroupPermission.permissionCollection === collection && userGroupPermission.permissionActionId === helpers.helperServer.both.actions.read.index);
                    });
                    helpers.helperServer.showLog(
                        helpers.helperServer.both.formatString("BierOnStack: Recurso SecurityBusiness :: Evento :: canGetData :: Ação :: End {0}", _hasPermission)
                    );
                    callback(_hasPermission);
                }
            }
        });
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToAction :: Exceção :: {0}", error.message)
        );
    }
};

var hasPermissionToAction = function (ctx, bbc, loggedUser, object, collection, action, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToAction :: Ação :: Begin");
        let _hasPermission = false;
        if (
            (typeof loggedUser !== "undefined" && typeof loggedUser.isRoot != "undefined" && loggedUser.isRoot) ||
            (typeof object.systemIsPost != "undefined" && object.systemIsPost)
        ) {
            helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToAction :: Ação :: End permissão liberada por ação de sistema");
            callback(true && (typeof object.systemIsLocked == "undefined" || (typeof object.systemIsLocked != "undefined" && object.systemIsLocked == false)));
        } else {
            helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToAction :: Ação :: Buscando permissões do usuário");
            if (ctx.session.data.userGroupPermissions.length == 0) {
                callback(false);
            } else {
                for (var userGroupPermission in ctx.session.data.userGroupPermissions) {
                    _hasPermission =
                        ctx.session.data.userGroupPermissions[userGroupPermission].permissionCollection === collection &&
                        ctx.session.data.userGroupPermissions[userGroupPermission].permissionActionId === action.index;
                    if (_hasPermission) {
                        _canActionByDimension(ctx, bbc, loggedUser, object, collection, function (canAction) {
                            callback(canAction && (typeof object.systemIsLocked == "undefined" || (typeof object.systemIsLocked != "undefined" && object.systemIsLocked == false)));
                            return;
                        });
                        break;
                    }
                    if (
                        !_hasPermission &&
                        ctx.session.data.userGroupPermissions[userGroupPermission].id == ctx.session.data.userGroupPermissions[ctx.session.data.userGroupPermissions.length - 1].id
                    ) {
                        helpers.helperServer.showLog(
                            helpers.helperServer.both.formatString(
                                "BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToAction :: Ação :: Não encontrada a permissão {0} {1} {2}",
                                collection,
                                JSON.stringify(object),
                                JSON.stringify(action)
                            )
                        );
                        callback(
                            _hasPermission && (typeof object.systemIsLocked == "undefined" || (typeof object.systemIsLocked != "undefined" && object.systemIsLocked == false))
                        );
                    }
                }
            }
        }
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToAction :: Exceção :: {0}", error.message)
        );
    }
};

var hasPermissionToActionInCollection = function (ctx, bbc, loggedUser, object, collection, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToActionInCollection :: Ação :: Begin");
        var _hasPermission = false;

        if (typeof loggedUser.isRoot !== "undefined" && loggedUser.isRoot) {
            helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToActionInCollection :: Ação :: End usuário é root, acesso irrestrito");
            callback(true);
        } else {
            helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToActionInCollection :: Ação :: Validando as permissões do usuário");
            for (var userGroupPermission in ctx.session.data.userGroupPermissions) {
                _hasPermission =
                    ctx.session.data.userGroupPermissions[userGroupPermission].permissionCollection === object.collection &&
                    ctx.session.data.userGroupPermissions[userGroupPermission].permissionActionId === object.actionId &&
                    object.collection == collection;

                if (
                    ctx.session.data.userGroupPermissions[userGroupPermission].permissionCollection === object.collection &&
                    ctx.session.data.userGroupPermissions[userGroupPermission].permissionActionId === object.actionId
                ) {
                    callback(_hasPermission);
                    if (_hasPermission) {
                        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToActionInCollection :: Ação :: Permissão liberada");
                    }

                    return;
                    break;
                }
            }

            callback(_hasPermission);
        }
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso SecurityBusiness :: Evento :: hasPermissionToActionInCollection :: Exceção :: {0}", error.message)
        );
    }
};

var prepareObjectToPost = function (ctx, bbc, loggedUser, object, collection, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: prepareObjectToPost :: Ação :: Begin");
        if (typeof loggedUser !== "undefined" && typeof loggedUser.isRoot !== "undefined" && loggedUser.isRoot) {
            callback(object);
        } else {
            helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: prepareObjectToPost :: Ação :: Ajustando dimensão para objeto");
            if (ctx.session.data.userGroupDimensions) {
                ctx.session.data.userGroupDimensions.forEach((userGroupDimension) => {
                    if (userGroupDimension.dimensionCollection === collection) {
                        object[userGroupDimension.dimensionCollectionField] = loggedUser[userGroupDimension.dimensionUserField];
                        helpers.helperServer.showLog(
                            helpers.helperServer.both.formatString(
                                "BierOnStack: Recurso SecurityBusiness :: Evento :: prepareObjectToPost :: Ação :: End {0}",
                                JSON.stringify(object)
                            )
                        );
                    }
                });
            }
            callback(object);
        }
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso SecurityBusiness :: Evento :: prepareObjectToPost :: Exceção :: {0}", error.message)
        );
    }
};

var _canActionByDimension = function (ctx, bbc, loggedUser, object, collection, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: _canActionByDimension :: Ação :: Begin");
        var _canAction = true;

        if (typeof loggedUser !== "undefined" && typeof loggedUser.isRoot !== "undefined" && loggedUser.isRoot) {
            helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: _canActionByDimension :: Ação :: End liberado por definição do sistema");
            callback(_canAction);
        } else {
            if (ctx.session.data.userGroupDimensions.length > 0) {
                helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: _canActionByDimension :: Ação :: Analisando dimensões do usuário");
                for (var indexUserGroupDimension in ctx.session.data.userGroupDimensions) {
                    if (ctx.session.data.userGroupDimensions[indexUserGroupDimension].dimensionCollection === collection) {
                        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: _canActionByDimension :: Ação :: End tem restrição por dimensão");
                        _canAction =
                            typeof loggedUser[ctx.session.data.userGroupDimensions[indexUserGroupDimension].dimensionUserField] !== "undefined" &&
                            typeof object[ctx.session.data.userGroupDimensions[indexUserGroupDimension].dimensionCollectionField] !== "undefined" &&
                            loggedUser[ctx.session.data.userGroupDimensions[indexUserGroupDimension].dimensionUserField] ===
                                object[ctx.session.data.userGroupDimensions[indexUserGroupDimension].dimensionCollectionField];

                        callback(_canAction);
                        return;
                        break;
                    }

                    if (ctx.session.data.userGroupDimensions.length - 1 == indexUserGroupDimension) {
                        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: _canActionByDimension :: Ação :: End não tem restrição por dimensão");
                        callback(_canAction);
                    }
                }
            } else {
                callback(_canAction);
            }
        }
        helpers.helperServer.showLog("BierOnStack: Recurso SecurityBusiness :: Evento :: _canActionByDimension :: Ação :: End");
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso SecurityBusiness :: Evento :: _canActionByDimension :: Exceção :: {0}", error.message)
        );
    }
};

module.exports = {
    hasPermissionToAction: hasPermissionToAction,
    prepareObjectToPost: prepareObjectToPost,
    hasPermissionToActionInCollection: hasPermissionToActionInCollection,
    applyDimensionsToQuery: applyDimensionsToQuery,
    canGetData: canGetData
};
