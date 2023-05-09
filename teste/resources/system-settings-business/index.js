var auditBusiness = requireModule("audit-business");
var securityBusiness = requireModule("security-business");
var helpers = requireModule("helpers");

var canGet = function (ctx, bbc, loggedUser, systemSetting, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso SystemSettingsBusiness :: Evento :: canGet :: Ação :: Begin");
        callback(!systemSetting.isInternal);
        helpers.helperServer.showLog("BierOnStack: Recurso SystemSettingsBusiness :: Evento :: canGet :: Ação :: End");
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso SystemSettingsBussines :: Evento :: canGet :: Exceção :: {0}", error.message)
        );
    }
};

var canPost = function (ctx, bbc, loggedUser, systemSetting, callback) {
    try {
        helpers.helperServer.showLog("BierOnStack: Recurso SystemSettingsBusiness :: Evento :: canPost :: Ação :: Begin");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, systemSetting, "systemsettings", helpers.helperServer.both.actions.add, function (canAdd) {
            if (canAdd) {
                helpers.helperServer.showLog("BierOnStack: Recurso SystemSettingsBusiness :: Evento :: canPost :: Ação :: End permissão ok para inserir configuração de sistema");
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.add,
                    loggedUser,
                    "Configuração ",
                    "(" + systemSetting.id + ") - " + systemSetting.name,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canAdd);
        });
    } catch (error) {
        helpers.helperServer.showException(
            helpers.helperServer.both.formatString("BierOnStack: Recurso SystemSettingsBusiness :: Evento :: canPost :: Exceção :: {0}", error.message)
        );
    }
};

var canPut = function (ctx, bbc, loggedUser, systemSetting, callback) {
    try {
        helpers.log("systemSettingsBusiness -> canPut -> begin");

        helpers.log("systemSettingsBusiness -> canPut -> Chamando securityBusiness -> hasPermissionToAction");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, systemSetting, "systemsettings", helpers.helperServer.both.actions.edit, function (canEdit) {
            if (canEdit) {
                helpers.log("systemSettingsBusiness -> canPut -> Registrando log de auditoria");
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.edit,
                    loggedUser,
                    "Configuração ",
                    "(" + systemSetting.id + ") - " + systemSetting.name,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canEdit);
        });

        helpers.log("systemSettingsBusiness -> canPut -> end");
    } catch (error) {
        helpers.notifyException("systemSettingsBusiness -> canPut -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onPost = function (ctx, bbc, loggedUser, systemSetting, callback) {
    try {
        helpers.log("systemSettingsBusiness -> onPost -> chamando securityBusiness -> prepareObjectToPost");
        securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, systemSetting, "systemsettings", function (systemSettingToPost) {
            callback(systemSettingToPost);
        });
    } catch (error) {
        helpers.notifyException("systemSettingsBusiness -> onPost -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onPut = function (ctx, bbc, loggedUser, systemSetting, callback) {
    try {
        helpers.log("systemSettingsBusiness -> onPost -> chamando securityBusiness -> prepareObjectToPost");
        securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, systemSetting, "systemsettings", function (systemSettingToPut) {
            callback(systemSettingToPut);
        });
    } catch (error) {
        helpers.notifyException("systemSettingsBusiness -> onPost -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canDelete = function (ctx, bbc, loggedUser, systemSetting, callback) {
    try {
        helpers.log("systemSettingsBusiness -> canDelete -> begin");

        helpers.log("systemSettingsBusiness -> canDelete -> Chamando securityBusiness -> hasPermissionToAction");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, systemSetting, "systemsettings", helpers.helperServer.both.actions.remove, function (canDelete) {
            if (canDelete) {
                helpers.log("systemSettingsBusiness -> canDelete -> Registrando log de auditoria");
                auditBusiness.logAction(
                    bbc,
                    helpers.helperServer.both.actions.remove,
                    loggedUser,
                    "Configuração ",
                    "(" + systemSetting.id + ") - " + systemSetting.name,
                    ctx.req.headers["x-real-ip"]
                );
            }

            callback(canDelete);
        });
    } catch (error) {
        helpers.notifyException("systemSettingsBusiness -> canDelete -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

module.exports = {
    canGet: canGet,
    canPost: canPost,
    onPost: onPost,
    canPut: canPut,
    onPut: onPut,
    canDelete: canDelete
};
