try {
    let helpers = requireModule("helpers");
    let supportRequestsBusiness = requireModule("support-requests-business");
    let supportRequest = this;

    cancelUnless(me || internal, "Usuário não autorizado!", 401);
    supportRequestsBusiness.canDelete(ctx, bbc, me, supportRequest, function (canDelete, message) {
        if (canDelete) {
            supportRequestsBusiness.onDelete(ctx, bbc, me, supportRequest);
        } else {
            cancel(message);
        }
    });
} catch (error) {
    helpers.notifyException("supportrequests -> onDelete -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
