try {
    var helpers = requireModule("helpers");
    var collectionBusiness = requireModule("user-group-menus-business");
    var _objectItem = this;

    helpers.log("userGroupMenus -> onPost -> begin");
    helpers.log("userGroupMenus -> onPost -> está logado ou é chamada interna?");
    cancelUnless(me || internal, "Usuário não autorizado!", 401);

    helpers.log("userGroupMenus -> onPost -> Chamando collectionBusiness -> canPost");
    collectionBusiness.canPost(ctx, bbc, me, _objectItem, function (canPost, message) {
        if (canPost) {
            helpers.log("userGroupMenus -> onPost -> canPost ok, chamando onPost");
            collectionBusiness.onPost(ctx, bbc, me, _objectItem);
        } else {
            helpers.log("userGroupMenus -> onPost -> canPost negado");
            cancel(message);
        }
    });

    helpers.log("userGroupMenus -> onPost -> end");
} catch (error) {
    helpers.notifyException("userGroupMenus -> onPost -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
