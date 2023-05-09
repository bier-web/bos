try {
    var helpers = requireModule("helpers");
    var dimensionsBusiness = requireModule("dimensions-business");
    var _dimension = this;

    helpers.log("dimensions -> onPut -> begin");
    helpers.log("dimensions -> onPut -> Validando permissões");
    cancelUnless(me || internal, "Você não está logado", 401);

    helpers.log("dimensions -> onPut -> Chamando dimensionsBusiness -> canPut");
    dimensionsBusiness.canPut(ctx, bbc, me, _dimension, function (canPut) {
        if (canPut) {
            dimensionsBusiness.onPut(ctx, bbc, me, _dimension, function (dimensionToPut) {
                _dimension = dimensionToPut;
            });
        }

        cancelIf(!canPut, "Usuário não autorizado");
    });

    helpers.log("dimensions -> onPut -> end");
} catch (error) {
    helpers.notifyException("dimensions -> onPut -> Erro desconhecido ->");
    helpers.notifyException(error);
}
