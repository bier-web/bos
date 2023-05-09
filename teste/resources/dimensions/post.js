try {
    var helpers = requireModule("helpers");
    var dimensionsBusiness = requireModule("dimensions-business");
    var _dimension = this;

    helpers.log("dimensions -> onPost -> begin");
    helpers.log("dimensions -> onPost -> Validando permissões");
    cancelUnless(me || internal, "Você não está logado", 401);

    helpers.log("Users -> onPost -> Chamando dimensionsBusiness -> canPost");
    dimensionsBusiness.canPost(ctx, bbc, me, _dimension, function (canPost) {
        if (canPost) {
            helpers.log("Users -> onPost -> Chamando dimensionsBusiness -> onPost");
            dimensionsBusiness.onPost(ctx, bbc, me, _dimension);
        } else {
            cancelIf(!canPost, "Usuário não autorizado");
        }
    });

    helpers.log("dimensions -> onPost -> end");
} catch (error) {
    helpers.notifyException("dimensions -> onPost -> Erro desconhecido ->");
    helpers.notifyException(error);
}
