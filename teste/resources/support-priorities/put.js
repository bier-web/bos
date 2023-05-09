let helpers = requireModule("helpers");

try {
    let supportPrioritiesBusiness = requireModule("support-priorities-business");
    let supportPriority = this;

    cancelUnless(me || internal, "Usuário não autorizado!", 401);
    supportPrioritiesBusiness.canPut(ctx, bbc, me, supportPriority, function (canPut, message) {
        if (canPut) {
            supportPrioritiesBusiness.onPut(ctx, bbc, me, supportPriority, function (objectoToPost) {
                supportPriority = objectoToPost;
            });
        } else {
            cancel(message);
        }
    });
} catch (error) {
    helpers.notifyException("support-priorities -> onPut -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
