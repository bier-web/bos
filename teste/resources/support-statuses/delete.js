let helpers = requireModule("helpers");

try {
    let supportStatusesBusiness = requireModule("support-statuses-business");
    let supportStatus = this;

    cancelUnless(me || internal, "Usuário não autorizado!", 401);
    supportStatusesBusiness.canDelete(ctx, bbc, me, supportStatus, function (canDelete, message) {
        if (canDelete) {
            supportStatusesBusiness.onDelete(ctx, bbc, me, supportStatus);
        } else {
            cancel(message);
        }
    });
} catch (error) {
    helpers.notifyException("supportstatuses -> onDelete -> erro desconhecido ->");
    helpers.notifyException(error);
    cancel();
}
