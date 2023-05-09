var helpers = requireModule("helpers");

try {
    var usersBusiness = requireModule("users-business");
    var _user = this;

    helpers.helperServer.showLog("BierOnStack Debug: users -> delete ");
    cancelUnless(me || internal, "Você não está logado", 401);

    if (!internal) {
        usersBusiness.canDelete(ctx, bbc, me, _user, function (canDelete) {
            if (canDelete) {
                usersBusiness.onDelete(ctx, bbc, _user, function () {});
            } else {
                cancelIf(!canDelete);
            }
        });
    }
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack Debug: users delete ->  Exception {0}", error.message));
}
