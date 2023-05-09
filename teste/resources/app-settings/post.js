try {
    var helpers = requireModule("helpers");
    var appSettingsBusiness = requireModule("app-settings-business");
    var _appSetting = this;

    cancelUnless(me || internal, "Você não está logado", 401);
    if (!internal) {
        appSettingsBusiness.canPost(ctx, bbc, me, _appSetting, function (canPost) {
            if (canPost) {
                appSettingsBusiness.onPost(ctx, bbc, me, _appSetting, function (appSettingToPost) {
                    _appSetting = appSettingToPost;
                });
            } else {
                cancelIf(!canGet, "Usuário não autorizado");
            }
        });
    }
} catch (error) {
    helpers.notifyException("appSettings -> onPost -> Erro desconhecido ->");
    helpers.notifyException(error);
}
