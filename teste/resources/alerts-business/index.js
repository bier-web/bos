var auditBusiness = requireModule("audit-business");
var securityBusiness = requireModule("security-business");
var helpers = requireModule("helpers");

var canGet = function (ctx, bbc, loggedUser, alert, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, alert, "alerts", helpers.helperServer.both.actions.read, function (canRead) {
            callback(canRead);
        });
    } catch (error) {
        helpers.notifyException("alertsBusiness -> canGet -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canPost = function (ctx, bbc, loggedUser, alert, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, alert, "alerts", helpers.helperServer.both.actions.add, function (canAdd) {
            callback(canAdd);
        });
    } catch (error) {
        helpers.notifyException("alertsBusiness -> canPost -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onPost = function (ctx, bbc, loggedUser, alert) {
    try {
        securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, alert, "alerts", function (alertUptaded) {
            auditBusiness.logAction(bbc, helpers.helperServer.both.actions.add, loggedUser, "Alerta", "(" + alert.id + ") - " + alert.title, ctx.req.headers["x-real-ip"]);
            alertUptaded.systemIsPot = true;
            alertUptaded.isActive = typeof alertUptaded.isActive == "undefined" ? false : alertUptaded.isActive;
            alertUptaded.usersIds = typeof alertUptaded.usersIds == "undefined" ? [] : alertUptaded.usersIds;
            alertUptaded.usersReadIds = typeof alertUptaded.usersReadIds == "undefined" ? [] : alertUptaded.usersReadIds;
        });
    } catch (error) {
        helpers.notifyException("alertsBusiness -> onPost -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onPut = function (ctx, bbc, loggedUser, alert, callback) {
    try {
    } catch (error) {
        helpers.notifyException("alertsBusiness -> onPut -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canPut = function (ctx, bbc, loggedUser, alert, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, alert, "alerts", helpers.helperServer.both.actions.edit, function (canEdit) {
            if (canEdit) {
                auditBusiness.logAction(bbc, helpers.helperServer.both.actions.edit, loggedUser, "Alerta ", "(" + alert.id + ") - " + alert.title, ctx.req.headers["x-real-ip"]);
                callback(true);
            } else {
                callback(false);
            }
        });
    } catch (error) {
        helpers.notifyException("alertsBusiness -> canPut -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canDelete = function (ctx, bbc, loggedUser, alert, callback) {
    try {
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, alert, "alerts", helpers.helperServer.both.actions.remove, function (canDelete) {
            if (canDelete) {
                auditBusiness.logAction(bbc, helpers.helperServer.both.actions.remove, loggedUser, "Alerta", "(" + alert.id + ") - " + alert.title, ctx.req.headers["x-real-ip"]);
            }

            callback(canDelete);
        });
    } catch (error) {
        helpers.notifyException("alertsBusiness -> canDelete -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onDelete = function (ctx, bbc, loggedUser, alert) {
    try {
    } catch (error) {
        helpers.notifyException("alertsBusiness -> onDelete -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var registerToUsers = function (ctx, bbc, loggedUser, alert, callback) {
    try {
        var _arrayUsers = [];
        if (alert.userId) {
            _arrayUsers.push(alert.userId);
            callback(_arrayUsers);
        } else if (alert.userGroupId) {
            bbc.usergroupusers.get({ userGroupId: alert.userGroupId }, function (userGroupUsers, error) {
                if (error) {
                    helpers.notifyException("alertsBusiness -> canDelete -> Erro buscando os usuários do grupo  ->");
                    helpers.notifyException(error);
                    callback(_arrayUsers);
                } else {
                    _arrayUsers = userGroupUsers.map(function (userGroupUser) {
                        return userGroupUser.userId;
                    });

                    callback(_arrayUsers);
                }
            });
        } else if (alert.actorId) {
            bbc.actors.get(alert.actorId, function (actor, error) {
                if (error) {
                    helpers.notifyException("alertsBusiness -> registerToUsers -> Erro buscando actor ->");
                    helpers.notifyException(error);
                    callback(_arrayUsers);
                } else {
                    if (actor.isToAll) {
                        bbc.users.get({ isActive: true }, function (users, error) {
                            if (error) {
                                helpers.notifyException("alertsBusiness -> registerToUsers -> Erro buscando usuários (público alvo) ->");
                                helpers.notifyException(error);
                                callback(_arrayUsers);
                            } else {
                                _arrayUsers = users.map(function (user) {
                                    return user.id;
                                });

                                callback(_arrayUsers);
                            }
                        });
                    } else {
                        bbc.actors.get(function (actors, error) {
                            if (error) {
                                helpers.notifyException("alertsBusiness -> registerToUsers -> erro buscando todos os actors ->");
                                helpers.notifyException(error);
                                callback(_arrayUsers);
                            } else {
                                var filterOptions = [];
                                if (actor.isParent) {
                                    actors.forEach((currentActor) => {
                                        if (currentActor.id === actor.id) {
                                            filterOptions.push("$and: [{ " + currentActor.fieldId + ":{$ne:''}}, { " + currentActor.fieldId + ":{$ne:null}}]");
                                        } else if (!currentActor.isToAll) {
                                            filterOptions.push("$or: [{ " + currentActor.fieldId + ":''}, { " + currentActor.fieldId + ":null}]");
                                        }
                                    });
                                } else {
                                    filterOptions.push("$and: [{ " + actor.fieldId + ':{$ne:""}}, { ' + actor.fieldId + ":{$ne:null}}]");
                                }

                                eval("var _filterOptions = {" + filterOptions.toString() + "}");
                                bbc.users.get(_filterOptions, function (users, error) {
                                    if (error) {
                                        helpers.notifyException("alertsBusiness -> registerToUsers -> Erro buscando usuários (público alvo) ->");
                                        helpers.notifyException(error);
                                        callback(_arrayUsers);
                                    } else {
                                        _arrayUsers = users.map(function (user) {
                                            return user.id;
                                        });

                                        callback(_arrayUsers);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    } catch (error) {
        helpers.notifyException("alertsBusiness -> canDelete -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

module.exports = {
    canGet: canGet,
    canPost: canPost,
    onPost: onPost,
    onPut: onPut,
    canPut: canPut,
    canDelete: canDelete,
    onDelete: onDelete,
    registerToUsers: registerToUsers
};
