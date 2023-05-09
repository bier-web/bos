try {
    var helpers = requireModule("helpers");
    var collectionBusiness = requireModule("user-group-users-business");
    var _objectItem = this;

    helpers.log("userGroupUsers -> onPost -> begin");
    helpers.log("userGroupUsers -> onPost -> está logado ou é chamada interna?");
    cancelUnless(me || internal, "Usuário não autorizado!", 401);

    helpers.log("userGroupUsers -> onPost -> Chamando collectionBusiness -> canPost");
    collectionBusiness.canPost(ctx, bbc, me, _objectItem, function (canPost, message) {
        if (canPost) {
            helpers.log("userGroupUsers -> onPost -> canPost ok, chamando onPost");
            collectionBusiness.onPost(ctx, bbc, me, _objectItem);
        } else {
            helpers.log("userGroupUsers -> onPost -> canPost negado");
            cancel(message);
        }
    });

    helpers.log("userGroupUsers -> onPost -> end");
} catch (error) {
    helpers.notifyException("userGroupUsers -> onPost -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
