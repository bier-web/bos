var helpers = requireModule("helpers");
var collectionBusiness = requireModule("user-group-dimensions-business");
var _objectItem = this;

try {
    helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensions :: Evento :: post :: Ação :: Begin");
    cancelUnless(me || internal, "Usuário não autorizado!", 401);

    collectionBusiness.canPost(ctx, bbc, me, _objectItem, function (canPost, message) {
        if (canPost) {
            helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensions :: Evento :: post :: Ação :: End usuário autorizado");
            collectionBusiness.onPost(ctx, bbc, me, _objectItem);
        } else {
            helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensions :: Evento :: post :: Ação :: End usuárop não autorizado");
            cancel(message);
        }
    });

    helpers.helperServer.showLog("BierOnStack: Recurso UserGroupDimensions :: Evento :: post :: Ação :: End");
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso UserGroupDimensions :: Evento :: post :: Exceção :: {0}", error.message));
}
