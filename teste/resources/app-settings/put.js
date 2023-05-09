try {
    var helpers = requireModule("helpers");
    var appSettingsBusiness = requireModule("app-settings-business");
    var _appSetting = this;

    cancelUnless(me, "Você não está logado", 401);
    if (!internal) {
        appSettingsBusiness.canPut(ctx, bbc, me, _appSetting, function (canPut) {
            if (canPut) {
                appSettingsBusiness.onPut(ctx, bbc, me, _appSetting, function (appSettingToPut) {
                    _appSetting = appSettingToPut;
                });
            }
            cancelIf(!canPut, "Usuário não autorizado");
        });
    }
} catch (error) {
    helpers.notifyException("appSettings -> onPut -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
