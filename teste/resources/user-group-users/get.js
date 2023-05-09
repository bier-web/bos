var helpers = requireModule("helpers");
var userGroupUsersBusiness = requireModule("user-group-users-business");
var _userGroupUser = this;

try {
    helpers.helperServer.showLog("BierOnStack: Recurso UserGroupUsers :: Evento :: get :: Ação :: Begin");
    cancelUnless(me || internal, "Você não está logado", 401);
    if (!internal) {
        userGroupUsersBusiness.canGet(ctx, bbc, me, _userGroupUser, function (canGet) {
            helpers.helperServer.showLog("BierOnStack: Recurso UserGroupUsers :: Evento :: get :: Ação :: End usuário não autorizado");
            cancelIf(!canGet, "Usuário não autorizado");
        });
    }

    if (typeof query.include !== "undefined" && query.include.indexOf("user") > -1) {
        bbc.users.get({ id: _userGroupUser.userId }, function (user) {
            if (error) {
                helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupUsers :: Evento :: get :: Exceção :: {0}", error.message));
            } else {
                _userGroupUser.userId = user.actionId;
                _userGroupUser.userUserName = user.username;
                _userGroupUser.userFullName = user.fullName;
                helpers.helperServer.showLog("BierOnStack: Recurso UserGroupUsers :: Evento :: get :: Ação :: Adicionado informações de usuário");
            }
        });
    }

    if (typeof query.include !== "undefined" && query.include.indexOf("user-group") > -1) {
        bbc.usergroups.get({ id: _userGroupUser.userGroupId }, function (userGroup, error) {
            if (error) {
                helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupUsers :: Evento :: get :: Exceção :: {0}", error.message));
            } else {
                _userGroupUser.userGroupId = userGroup.id;
                _userGroupUser.userGroupName = userGroup.name;
                helpers.helperServer.showLog("BierOnStack: Recurso UserGroupUsers :: Evento :: get :: Ação :: Adicionado informações de grupo de usuário");
            }
        });
    }
    helpers.helperServer.showLog("BierOnStack: Recurso UserGroupUsers :: Evento :: get :: Ação :: End");
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupUsers :: Evento :: get :: Exceção :: {0}", error.message));
}
