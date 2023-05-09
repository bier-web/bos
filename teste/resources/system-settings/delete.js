try {
    var helpers = requireModule("helpers");
    var systemSettingsBusiness = requireModule("system-settings-business");
    var _systemSetting = this;

    helpers.log("systemSettings -> onDelete -> begin");
    helpers.log("systemSettings -> onDelete -> Validando permissões");
    cancelUnless(me || internal, "Você não está logado", 401);

    helpers.log("Users -> onDelete -> Chamando systemSettingsBusiness -> canDelete");
    systemSettingsBusiness.canDelete(ctx, bbc, me, _systemSetting, function (canDelete) {
        cancelIf(!canDelete, "Usuário não autorizado");
    });

    helpers.log("systemSettings -> onDelete -> end");
} catch (error) {
    helpers.notifyException("systemSettings -> onDelete -> Erro desconhecido ->");
    helpers.notifyException(error);
}
