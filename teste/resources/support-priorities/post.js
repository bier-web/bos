let helpers = requireModule("helpers");

try {
    let supportPrioritiesBusiness = requireModule("support-priorities-business");
    let supportPriority = this;

    cancelUnless(me || internal, "Usuário não autorizado!", 401);
    supportPrioritiesBusiness.prepareObjectToPost(ctx, bbc, me, supportPriority, function (objectItemToPost) {
        supportPrioritiesBusiness.canPost(ctx, bbc, me, objectItemToPost, function (canPost, message) {
            if (canPost) {
                supportPrioritiesBusiness.onPost(ctx, bbc, me, objectItemToPost);
            } else {
                cancel(message);
            }
        });
    });
} catch (error) {
    helpers.notifyException("support-priorities -> onPost -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
