try {
    var helpers = requireModule("helpers");
    var userGroupUsersBusiness = requireModule("user-group-users-business");
    var _userGroupUser = this;

    helpers.log("userGroupUsers -> onPut -> begin");
    helpers.log("userGroupUsers -> onPut -> Validando permissões");
    cancelUnless(me || internal, "Você não está logado", 401);

    helpers.log("userGroupUsers -> onPut -> Chamando userGroupUsersBusiness -> canPost");
    if (!internal) {
        userGroupUsersBusiness.canPut(ctx, bbc, me, _userGroupUser, function (canPut) {
            cancelIf(!canPut, "Usuário não autorizado");
        });
    }

    helpers.log("userGroupUsers -> onPut -> End");
} catch (error) {
    helpers.notifyException("userGroupUsers -> onPut -> Erro desconhecido ->");
    helpers.notifyException(error);
}
