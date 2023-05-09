try {
    var helpers = requireModule("helpers");
    var collectionBusiness = requireModule("user-group-permissions-business");
    var _objectItem = this;

    helpers.log("userGroupPermissions -> onPost -> begin");
    helpers.log("userGroupPermissions -> onPost -> está logado ou é chamada interna?");
    cancelUnless(me || internal, "Usuário não autorizado!", 401);

    helpers.log("userGroupPermissions -> onPost -> Chamando collectionBusiness -> canPost");
    collectionBusiness.canPost(ctx, bbc, me, _objectItem, function (canPost, message) {
        if (canPost) {
            helpers.log("userGroupPermissions -> onPost -> canPost ok, chamando onPost");
            collectionBusiness.onPost(ctx, bbc, me, _objectItem);
        } else {
            helpers.log("userGroupPermissions -> onPost -> canPost negado");
            cancel(message);
        }
    });

    helpers.log("userGroupPermissions -> onPost -> end");
} catch (error) {
    helpers.notifyException("userGroupPermissions -> onPost -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
