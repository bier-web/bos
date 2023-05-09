let auditBusiness = requireModule("audit-business");
let securityBusiness = requireModule("security-business");
let helpers = requireModule("helpers");

module.exports = {
    canGet: function (ctx, bbc, loggedUser, __objectItem__, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canGet :: Ação :: Begin");
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, __objectItem__, "__collection__", helpers.helperServer.both.actions.read, function (canRead) {
                helpers.helperServer.showLog(
                    helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canGet :: Ação :: End ", canRead.toString())
                );
                callback(canRead);
            });
        } catch (error) {
            helpers.helperServer.showException(
                helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canGet :: Exceção :: {0}", error.message)
            );
        }
    },
    canPost: function (ctx, bbc, loggedUser, __objectItem__, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canPost :: Ação :: Begin");
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, __objectItem__, "__collection__", helpers.helperServer.both.actions.add, function (canAdd) {
                if (canAdd) {
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
                helpers.helperServer.showLog(
                    helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canPost :: Ação :: End ", canAdd.toString())
                );
            });
        } catch (error) {
            helpers.helperServer.showException(
                helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canPost :: Exceção :: {0}", error.message)
            );
        }
    },
    onPost: function (ctx, bbc, loggedUser, __objectItem__, callback) {
        helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onPost :: Ação :: Begin");
        try {
            auditBusiness.logAction(
                bbc,
                helpers.helperServer.both.actions.add,
                loggedUser,
                "__collection__",
                "(" + __objectItem__["id"] + ") - " + __objectItem__["name"],
                ctx.req.headers["x-real-ip"],
                __objectItem__
            );
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onPost :: Ação :: End");
        } catch (error) {
            helpers.helperServer.showException(
                helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onPost :: Exceção :: {0}", error.message)
            );
        }
    },
    canPut: function (ctx, bbc, loggedUser, __objectItem__, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canPut :: Ação :: Begin");
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, __objectItem__, "__collection__", helpers.helperServer.both.actions.edit, function (canEdit) {
                if (canEdit) {
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
                helpers.helperServer.showLog(
                    helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canPut :: Ação :: End ", canEdit.toString())
                );
            });
        } catch (error) {
            helpers.helperServer.showException(
                helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canPut :: Exceção :: {0}", error.message)
            );
        }
    },
    onPut: function (ctx, bbc, loggedUser, __objectItem__Old, __objectItem__New, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onPut :: Ação :: Begin");
            __objectItem__New.systemIsPost = false;
            auditBusiness.logAction(
                bbc,
                helpers.helperServer.both.actions.edit,
                loggedUser,
                "__collection__",
                "(" + __objectItem__New["id"] + ") - " + __objectItem__New["name"],
                ctx.req.headers["x-real-ip"],
                __objectItem__Old,
                __objectItem__New
            );
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onPut :: Ação :: End");
            callback(__objectItem__New);
        } catch (error) {
            helpers.helperServer.showException(
                helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onPut :: Exceção :: {0}", error.message)
            );
        }
    },
    canDelete: function (ctx, bbc, loggedUser, __objectItem__, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canDelete :: Ação :: Begin");
            securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, __objectItem__, "__collection__", helpers.helperServer.both.actions.remove, function (canRemove) {
                if (canRemove) {
                    callback(true);
                } else {
                    callback(false, "Usuário não tem permissão");
                }
                helpers.helperServer.showLog(
                    helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canDelete :: Ação :: End ", canRemove.toString())
                );
            });
        } catch (error) {
            helpers.helperServer.showException(
                helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: canDelete :: Exceção :: {0}", error.message)
            );
        }
    },
    onDelete: function (ctx, bbc, loggedUser, __objectItem__, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onDelete :: Ação :: Begin");
            auditBusiness.logAction(
                bbc,
                helpers.helperServer.both.actions.remove,
                loggedUser,
                "__collection__",
                "(" + __objectItem__["id"] + ") - " + __objectItem__["name"],
                ctx.req.headers["x-real-ip"]
            );
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onDelete :: Ação :: End");
        } catch (error) {
            helpers.helperServer.showException(
                helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: onDelete :: Exceção :: {0}", error.message)
            );
        }
    },
    prepareObjectToPost: function (ctx, bbc, loggedUser, __objectItem__, callback) {
        try {
            helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: prepareObjectToPost :: Ação :: Begin");
            securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, __objectItem__, "__collection__", function (objectToPost) {
                __objectItem__.systemIsPost = typeof __objectItem__.systemIsPost == "undefined" ? true : __objectItem__.systemIsPost;
                __objectItem__.createdAt = new Date();
                helpers.helperServer.showLog("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: prepareObjectToPost :: Ação :: End");
                callback(objectToPost);
            });
        } catch (error) {
            helpers.helperServer.showException(
                helpers.helperServer.both.formatString("BierOnStack: Recurso __collectioncamelcase__ :: Evento :: prepareObjectToPost :: Exceção :: {0}", error.message)
            );
        }
    }
};
