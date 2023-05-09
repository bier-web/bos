let helpers = requireModule("helpers");
let dimensionsBusiness = requireModule("dimensions-business");
let _dimension = this;

try {
    helpers.helperServer.showLog("BierOnStack: Recurso Dimensions :: Evento :: get :: Ação :: Begin");
    cancelUnless(me || internal, "Você não está logado", 401);

    if (!internal) {
        dimensionsBusiness.canGet(ctx, bbc, me, _dimension, function (canGet) {
            helpers.helperServer.showLog("BierOnStack: Recurso Dimensions :: Evento :: get :: Ação :: End usuário não autorizado");
            cancelIf(!canGet, "Usuário não autorizado");
        });
    }

    if (typeof query.include !== "undefined" && query.include.indexOf("usergroupdimensions") > -1) {
        bbc.usergroupdimensions.get({ dimensionId: _dimension.id, userGroupId: query.userGroupId, $ignoreLimitRecursion: true }, function (userGroupDimensions, error) {
            if (error) {
                helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso Dimensions :: Evento :: get :: Exceção :: {0}", error));
            } else {
                helpers.helperServer.showLog("BierOnStack: Recurso Dimensions :: Evento :: get :: Ação :: Adicionado dados de grupos de usuários");
                _dimension.userGroupDimensionIsFiltered = userGroupDimensions.length > 0;
                _dimension.userGroupDimensionId = userGroupDimensions.length > 0 ? userGroupDimensions[0].id : undefined;
            }
        });
    }

    if (!internal && typeof me !== "undefined" && !me.isRoot) {
        hide("collectionName");
        hide("collectionField");
    }
    helpers.helperServer.showLog("BierOnStack: Recurso Dimensions :: Evento :: get :: Ação :: End");
} catch (error) {
    helpers.helperServer.showException(helpers.helperServer.both.formatString("BierOnStack: Recurso Dimensions :: Evento :: get :: Exceção :: {0}", error.message));
}
