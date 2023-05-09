/* BOS - BierOnStack */
var helpers = requireModule("helpers");

try {
    helpers.helperServer.showLog("BierOnStack: Recurso Users :: Evento :: get :: Ação :: Begin");
    let usersBusiness = requireModule("users-business");
    let _user = this;

    cancelUnless(me || internal, "Você não está logado", 401);
    if (!internal) {
        usersBusiness.canGet(ctx, bbc, me, _user, function (canGet) {
            if (canGet) {
                // helpers.helperServer.showLog("BierOnStack: Recurso Users :: Evento :: get :: Ação :: Begin");
            } else {
                cancel("Usuário não autorizado");
            }
        });
    }

    if (typeof query.include !== "undefined" && query.include.indexOf("usergroupusers") > -1) {
        bbc.usergroupusers.get({ userId: _user.id, userGroupId: query.userGroupId, $ignoreLimitRecursion: true }, function (userGroupUsers, error) {
            if (error) {
                helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso Users :: Evento :: get :: Exceção :: {0}", error));
            } else {
                _user.userGroupUserIsAllowed = userGroupUsers.length > 0;
                _user.userGroupUserId = userGroupUsers.length > 0 ? userGroupUsers[0].id : undefined;
            }
        });
    }

    if (me && !me.isRoot) {
        hide("isRoot");
        cancelIf(_user.isRoot, "Usuário não autorizado");
    }
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso Users :: Evento :: get :: Exceção :: {0}", error.message));
}
