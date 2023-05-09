var auditBusiness = requireModule("audit-business");
var securityBusiness = requireModule("security-business");
var helpers = requireModule("helpers");

var canGet = function (ctx, bbc, loggedUser, appSetting, callback) {
    try {
        helpers.log("appSettingsBusiness -> canGet -> begin");
        helpers.log("appSettingsBusiness -> canGet -> Chamando securityBusiness -> hasPermissionToAction");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, appSetting, "appsettings", helpers.helperServer.both.actions.read, function (canRead) {
            callback(canRead);
        });

        helpers.log("appSettingsBusiness -> canGet -> end");
    } catch (error) {
        helpers.notifyException("appSettingsBusiness -> canGet -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canPost = function (ctx, bbc, loggedUser, appSetting, callback) {
    try {
        helpers.log("appSettingBusiness -> canPost -> begin");
        helpers.log("appSettingBusiness -> canPost -> Chamando securityBusiness -> hasPermissionToAction");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, appSetting, "appsettings", helpers.helperServer.both.actions.add, function (canAdd) {
            if (canAdd) {
                helpers.log("appSettingBusiness -> canPost -> Registrando log de auditoria");
                auditBusiness.logAction(bbc, helpers.helperServer.both.actions.add, loggedUser, "Configuração Aplicação", "(" + appSetting.id, ctx.req.headers["x-real-ip"]);
            }

            callback(canAdd);
        });
    } catch (error) {
        helpers.notifyException("appSettingBusiness -> canPost -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canPut = function (ctx, bbc, loggedUser, appSetting, callback) {
    try {
        helpers.log("appSettingsBusiness -> canPut -> begin");

        helpers.log("appSettingsBusiness -> canPut -> Chamando securityBusiness -> hasPermissionToAction");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, appSetting, "appsettings", helpers.helperServer.both.actions.edit, function (canEdit) {
            if (canEdit) {
                helpers.log("appSettingsBusiness -> canPut -> Registrando log de auditoria");
                auditBusiness.logAction(bbc, helpers.helperServer.both.actions.edit, loggedUser, "Configuração Aplicação", "(" + appSetting.id, ctx.req.headers["x-real-ip"]);
            }

            callback(canEdit);
        });

        helpers.log("appSettingsBusiness -> canPut -> end");
    } catch (error) {
        helpers.notifyException("appSettingsBusiness -> canPut -> Erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onPost = function (ctx, bbc, loggedUser, appSetting, callback) {
    try {
        helpers.log("appSettingsBusiness -> onPost -> chamando securityBusiness -> prepareObjectToPost");
        securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, appSetting, "appsettings", function (appSettingToPost) {
            appSettingToPost.coordinatorEmployeePositionIds = [];
            appSettingToPost.supervisorEmployeePositionIds = [];
            callback(appSettingToPost);
        });
    } catch (error) {
        helpers.notifyException("appSettingsBusiness -> onPost -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var onPut = function (ctx, bbc, loggedUser, appSetting, callback) {
    try {
        helpers.log("appSettingsBusiness -> onPost -> chamando securityBusiness -> prepareObjectToPost");
        securityBusiness.prepareObjectToPost(ctx, bbc, loggedUser, appSetting, "appsettings", function (appSettingToPut) {
            callback(appSettingToPut);
        });
    } catch (error) {
        helpers.notifyException("appSettingsBusiness -> onPost -> erro desconhecido ->");
        helpers.notifyException(error);
    }
};

var canDelete = function (ctx, bbc, loggedUser, appSetting, callback) {
    try {
        helpers.log("appSettingBusiness -> canDelete -> begin");
        helpers.log("appSettingBusiness -> canDelete -> Chamando securityBusiness -> hasPermissionToAction");
        securityBusiness.hasPermissionToAction(ctx, bbc, loggedUser, appSetting, "appsettings", helpers.helperServer.both.actions.remove, function (canDelete) {
            if (canDelete) {
                helpers.log("appSettingBusiness -> canDelete -> Registrando log de auditoria");
                auditBusiness.logAction(bbc, helpers.helperServer.both.actions.remove, loggedUser, "Configuração Aplicação", appSetting.id, ctx.req.headers["x-real-ip"]);
            }

            callback(canDelete);
        });
    } catch (error) {
        helpers.notifyException("appSettingBusiness -> canDelete -> erro desconhecido ->");
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
