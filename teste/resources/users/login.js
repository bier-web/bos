/* BOS - BierOnStack */
var helpers = requireModule("helpers");
var usersBusiness = requireModule("users-business");

try {
    $addCallback();
    helpers.helperServer.showLog("BierOnStack: Recurso Users :: Evento :: login :: Ação :: Begin");
    usersBusiness.canLogin(ctx, bbc, me, function (canLogin) {
        if (canLogin && me) {
            helpers.helperServer.showLog("BierOnStack: Recurso Users :: Evento :: login :: Ação :: End usuário autorizado");
            usersBusiness.onLogin(ctx, bbc, me, function (user) {
                session.data.userGroupMenus = user.userGroupMenus;
                session.data.userGroupPermissions = user.userGroupPermissions;
                session.data.userGroupDimensions = user.userGroupDimensions;
                $finishCallback();
            });
        } else {
            helpers.helperServer.showLog("BierOnStack: Recurso Users :: Evento :: login :: Ação :: End usuário NÃO autorizado");
            $finishCallback();
            cancel("Usuário não autorizado!");
        }
    });
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso Users :: Evento :: login :: Exceção :: {0}", error.message));
}
