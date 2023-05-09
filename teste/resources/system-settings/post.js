try {
    var helpers = requireModule("helpers");
    var systemSettingsBusiness = requireModule("system-settings-business");
    var _systemSetting = this;

    helpers.log("systemSettings -> onPost -> begin");
    helpers.log("systemSettings -> onPost -> Validando permissões");
    cancelUnless(me || internal, "Você não está logado", 401);

    helpers.log("systemSettings -> onPost -> É chamada interna?");
    if (!internal) {
        helpers.log("systemSettings -> onPost -> Chamando systemSettingsBusiness -> canGet");
        systemSettingsBusiness.canPost(ctx, bbc, me, _systemSetting, function (canPost) {
            if (canPost) {
                systemSettingsBusiness.onPost(ctx, bbc, me, _systemSetting, function (systemSettingToPost) {
                    _systemSetting = systemSettingToPost;
                });
            } else {
                cancelIf(!canGet, "Usuário não autorizado");
            }
        });
    }

    helpers.log("systemSettings -> onPost -> end");
} catch (error) {
    helpers.notifyException("systemSettings -> onPost -> Erro desconhecido ->");
    helpers.notifyException(error);
}
