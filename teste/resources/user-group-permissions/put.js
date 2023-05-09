try {
    var helpers = requireModule("helpers");
    var userGroupPermissionsBusiness = requireModule("user-group-permissions-business");
    var _userGroupPermission = this;

    helpers.log("userGroupPermissions -> onPut -> begin");
    helpers.log("userGroupPermissions -> onPut -> Validando permissões");
    cancelUnless(me || internal, "Você não está logado", 401);

    helpers.log("userGroupPermissions -> onPut -> Chamando userGroupPermissionsBusiness -> canPost");
    userGroupPermissionsBusiness.canPut(ctx, bbc, me, _userGroupPermission, function (canPut) {
        cancelIf(!canPut, "Usuário não autorizado");
    });

    helpers.log("userGroupPermissions -> onPut -> End");
} catch (error) {
    helpers.notifyException("userGroupPermissions -> onPut -> Erro desconhecido ->");
    helpers.notifyException(error);
}
