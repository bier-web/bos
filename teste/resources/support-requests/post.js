try {
    let helpers = requireModule("helpers");
    let supportRequestsBusiness = requireModule("support-requests-business");
    let supportRequest = this;

    cancelUnless(me || internal, "Usuário não autorizado!", 401);
    supportRequestsBusiness.prepareObjectToPost(ctx, bbc, me, supportRequest, function (objectItemToPost) {
        supportRequestsBusiness.canPost(ctx, bbc, me, objectItemToPost, function (canPost, message) {
            if (canPost) {
                supportRequestsBusiness.onPost(ctx, bbc, me, objectItemToPost);
            } else {
                cancel(message);
            }
        });
    });
} catch (error) {
    helpers.notifyException("supportrequests -> onPost -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
