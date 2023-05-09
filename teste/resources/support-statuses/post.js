let helpers = requireModule("helpers");

try {
    let supportStatusesBusiness = requireModule("support-statuses-business");
    let supportStatus = this;

    cancelUnless(me || internal, "Usuário não autorizado!", 401);
    supportStatusesBusiness.prepareObjectToPost(ctx, bbc, me, supportStatus, function (objectItemToPost) {
        supportStatusesBusiness.canPost(ctx, bbc, me, objectItemToPost, function (canPost, message) {
            if (canPost) {
                supportStatusesBusiness.onPost(ctx, bbc, me, objectItemToPost);
            } else {
                cancel(message);
            }
        });
    });
} catch (error) {
    helpers.notifyException("supportstatuses -> onPost -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
