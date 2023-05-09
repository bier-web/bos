try {
    var helpers = requireModule("helpers");
    var collectionBusiness = requireModule("user-group-dimensions-business");
    var _objectItem = this;

    helpers.log("userGroupDimensions -> onDelete -> begin");
    helpers.log("userGroupDimensions -> onDelete -> está logado ou é chamada interna?");
    cancelUnless(me || internal, "Usuário não autorizado!", 401);

    helpers.log("userGroupDimensions -> onDelete -> Chamando collectionBusiness -> canDelete");
    collectionBusiness.canDelete(ctx, bbc, me, _objectItem, function (canDelete, message) {
        if (canDelete) {
            helpers.log("userGroupDimensions -> onDelete -> Chamando collectionBusiness -> canDelete ok, chamando onDelete");
            collectionBusiness.onDelete(ctx, bbc, me, _objectItem);
        } else {
            helpers.log("userGroupDimensions -> onDelete -> Chamando collectionBusiness -> canDelete negado");
            cancel(message);
        }
    });

    helpers.log("userGroupDimensions -> onDelete -> end");
} catch (error) {
    helpers.notifyException("userGroupDimensions -> onDelete -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
