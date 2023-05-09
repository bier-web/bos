let helpers = requireModule("helpers");
let permissionsBusiness = requireModule("permissions-business");
let _permission = this;

try {
    helpers.helperServer.showLog("BierOnStack: Recurso Permissions :: Evento :: Get :: Ação :: Begin");
    cancelUnless(me || internal, "Você não está logado", 401);
    if (!internal) {
        if (typeof query.userPermissionCollection !== "undefined") {
            permissionsBusiness.canGetByUserPermission(ctx, bbc, me, _permission, query.userPermissionCollection, function (canGet) {
                helpers.helperServer.showLog("BierOnStack: Recurso Permissions :: Evento :: get :: Ação :: End canGetByUserPermission usuário não autorizado");
                cancelIf(!canGet, "Usuário não autorizado", 401);
            });
        } else {
            permissionsBusiness.canGet(ctx, bbc, me, _permission, function (canGet) {
                helpers.helperServer.showLog("BierOnStack: Recurso Permissions :: Evento :: get :: Ação :: End canGet usuário não autorizado");
                cancelIf(!canGet, "Usuário não autorizado", 401);
            });
        }
    }

    if (typeof query.include !== "undefined" && query.include.indexOf("usergrouppermissions") > -1) {
        bbc.usergrouppermissions.get({ permissionId: _permission.id, userGroupId: query.userGroupId, $ignoreLimitRecursion: true }, function (userGroupPermissions, error) {
            if (error) {
                helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso Permissions :: Evento :: get :: Exceção :: {0}", error.message));
            } else {
                helpers.helperServer.showLog("BierOnStack: Recurso Permissions :: Evento :: get :: Ação :: Adicionado informações de grupos de usuário");
                _permission.userGroupPermissionIsAllowed = userGroupPermissions.length > 0;
                _permission.userGroupPermissionId = userGroupPermissions.length > 0 ? userGroupPermissions[0].id : undefined;
            }
        });
    }

    if (!internal && typeof me !== "undefined" && !me.isRoot) {
        hide("collection");
    }
    helpers.helperServer.showLog("BierOnStack: Recurso Permissions :: Evento :: Get :: Ação :: End");
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso Permissions :: Evento :: get :: Exceção :: {0}", error));
}
