try {
    var helpers = requireModule("helpers");
    var collectionBusiness = requireModule("user-group-users-business");
    var _objectItem = this;

    helpers.log("userGroupUsers -> onDelete -> begin");
    helpers.log("userGroupUsers -> onDelete -> está logado ou é chamada interna?");
    cancelUnless(me || internal, "Usuário não autorizado!", 401);

    helpers.log("userGroupUsers -> onDelete -> Chamando collectionBusiness -> canDelete");
    collectionBusiness.canDelete(ctx, bbc, me, _objectItem, function (canDelete, message) {
        if (canDelete) {
            helpers.log("userGroupUsers -> onDelete -> Chamando collectionBusiness -> canDelete ok, chamando onDelete");
            collectionBusiness.onDelete(ctx, bbc, me, _objectItem);
        } else {
            helpers.log("userGroupUsers -> onDelete -> Chamando collectionBusiness -> canDelete negado");
            cancel(message);
        }
    });

    helpers.log("userGroupUsers -> onDelete -> end");
} catch (error) {
    helpers.notifyException("userGroupUsers -> onDelete -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
